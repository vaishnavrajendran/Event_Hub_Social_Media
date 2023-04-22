import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { storage } from "firebaseConfig";

import { authentication } from "firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Loading from "components/Loading/Loading";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const registerSchema = yup.object().shape({
  firstName: yup.string().min(5).required("required"),
  lastName: yup.string().min(5).required("required"),
  email: yup.string().min(5).email("invalid email").required("required"),
  password: yup
    .string()
    .matches(passwordRules, {
      message: "Password should contain lowercase,uppercase and a number",
    })
    .required("required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm_password: "",
  location: "",
  occupation: "",
  picture: "",
  mobile: "",
  otp: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [OTPSuccesfull, setSuccess] = useState(true);
  const [excep, setExcep] = useState(false);
  const [isBlocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  let mob;
  let OTP;

  {
    /* OTP CODE */
  }
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  const OTPSetting = (val) => {
    OTP = val;
  };

  const verifyOTP = () => {
    let otp = OTP;
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully
          setSuccess(false);
          // const user = result.user;
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          console.log("User couldn't sign in", error.message);
        });
    }
  };

  const requestOtp = () => {
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(authentication, mob, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  {
    /* OTP CODE */
  }
  const [userUrl, setUserUrl] = useState("");

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      if (value === "picture") {
        formData.append("picturePath", userUrl.toString());
      } else {
        formData.append(value, values[value]);
      }
    }

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios
      .post("http://localhost:3001/auth/register", formData, config)
      .catch((error) => {
        console.log(error.message);
      });

    // const savedUserResponse = await fetch(
    //   "http://localhost:3001/auth/register",
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // ).catch((err)=> {
    //   console.log(err.message)
    // })
    // const savedUser = await savedUserResponse.json();
    // onSubmitProps.resetForm();

    if (data) {
      setPageType("login");
      onSubmitProps.resetForm();
    }
  };

  const picCarrier = (pic) => {
    storage
      .ref("/images/" + pic.name)
      .put(pic)
      .on("state_changed", alert("success"), alert, () => {
        storage
          .ref("images")
          .child(pic.name)
          .getDownloadURL()
          .then(function (url) {
            setUserUrl(url.toString());
            console.log("111", url);
          });
      });
  };

  const login = async (values, onSubmitProps) => {
    setLoading(true);
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      setLoading(false);
      console.log("log", loggedIn);
      if (loggedIn.msg === "Invalid credentials." || "User does not exist. ") {
        setExcep(true);
      }
      if (loggedIn.msg === "Your account is temporarily blocked") {
        setBlocked(true);
      }
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
          allUsers: loggedIn.allUsers,
        })
      );

      if (loggedIn.user.isAdmin === true) {
        navigate("/dashboard");
      } else if (loggedIn.user.adminBlocked === true) {
        navigate("/");
      } else navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  const mobileSetting = (val) => {
    mob = val;
    console.log("state", mob);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 3"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>

                <Button
                  sx={{
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                  onClick={() => {
                    picCarrier(values.picture);
                  }}
                >
                  Upload
                </Button>

                {/* Mobile */}
                <TextField
                  type="text"
                  label="Mobile"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mobile}
                  name="mobile"
                  error={Boolean(touched.mobile) && Boolean(errors.mobile)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <Button
                  sx={{
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                  type="button"
                  onClick={() => {
                    mobileSetting(values.mobile);
                    requestOtp();
                  }}
                >
                  Send OTP
                </Button>
                <TextField
                  label="OTP"
                  onBlur={handleBlur}
                  value={values.OTP}
                  onChange={handleChange}
                  name="OTP"
                  error={Boolean(touched.OTP) && Boolean(errors.OTP)}
                  helperText={touched.OTP && errors.OTP}
                  sx={{ gridColumn: "span 2" }}
                />
                <Button
                  sx={{
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                  type="button"
                  onClick={() => {
                    OTPSetting(values.OTP);
                    verifyOTP();
                  }}
                >
                  Verify
                </Button>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />

            {isRegister && (
              <>
                <TextField
                  label="Confirm Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirm_password}
                  name="confirm_password"
                  error={
                    Boolean(touched.confirm_password) &&
                    Boolean(errors.confirm_password)
                  }
                  helperText={
                    touched.confirm_password && errors.confirm_password
                  }
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}
          </Box>

          {/* BUTTONS */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ alignItems: "center", justifyContent: "center" }}>
              {loading && <Loading />}
            </div>
          </Box>
          <Box>
            <Button
              id="register"
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
              disabled={!isLogin ? OTPSuccesfull : false}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            {isLogin && excep && (
              <Typography
                sx={{ color: "red", textAlign: "center", fontSize: "1.5rem" }}
              >
                Invalid Credentials!!
              </Typography>
            )}
            {isLogin && isBlocked && (
              <Typography
                sx={{ color: "red", textAlign: "center", fontSize: "1.5rem" }}
              >
                Your account is temporarily blocked
              </Typography>
            )}
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
          <div id="recaptcha-container"></div>
        </form>
      )}
    </Formik>
  );
};

export default Form;
