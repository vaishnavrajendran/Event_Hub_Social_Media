import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import axios from 'axios';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUser } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { storage } from "firebaseConfig";
import { authentication } from "firebaseConfig";



const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;


const registerSchema = yup.object().shape({
  firstName: yup.string().min(5).required("required"),
  lastName: yup.string().min(5).required("required"),
  email: yup.string().min(5).email("invalid email").required("required"),
//   password: yup.string().matches(passwordRules,{message:"Password should contain lowercase,uppercase and a number"}).required("required"),
//   confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
//   password: "",
//   confirm_password: "",
  location: "",
  occupation: "",
  picture: "",
  mobile: "",
  otp: ""
};


const EditUser = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { _id } = useSelector(state => state.user)
  const token = useSelector((state) => state.token);
let mob;

  const [userUrl,setUserUrl] = useState('');
  const register = async (values, onSubmitProps) => {
    const formData = new FormData()
    for(let value in values){
      if(value === 'picture'){
        formData.append("picturePath",userUrl.toString())
      } else { 
        formData.append(value, values[value])
      }
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }

    const { data } = await axios.patch(
      `http://localhost:3001/users/${_id}/update`,
      formData,
      config
    ).catch((error) => {
      console.log(error.message)
    })

    if (data) {
      dispatch(setUser({data:data}))
      onSubmitProps.resetForm();
    }
    
  }

  const picCarrier = (pic) => {
    storage.ref('/images/'+pic.name).put(pic)
        .on("state_changed",alert('success'),alert, () => {
        storage.ref('images').child(pic.name).getDownloadURL()
        .then(function(url) {
          setUserUrl(url.toString())
        })
      })
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    register(values, onSubmitProps)
  };

  return (
    <Formik
    onSubmit={handleFormSubmit}
    initialValues={initialValuesRegister}
    validationSchema={registerSchema}
  >
    {({
      values,
      errors,
      touched,
      handleBlur,
      handleChange,
      handleSubmit,
      setFieldValue,
    }) => (
      <form onSubmit={handleSubmit} >
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
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
                sx={{ gridColumn: "span 2" }}
              />
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
              type="button"
              onClick={() => {
                picCarrier(values.picture)}
              }
              >Upload
              </Button>
              
                         {/* Mobile */}

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
          {/* <TextField
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
            <TextField
            label="Confirm Password"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.confirm_password}
            name="confirm_password"
            error={Boolean(touched.confirm_password) && Boolean(errors.confirm_password)}
            helperText={touched.confirm_password && errors.confirm_password}
            sx={{ gridColumn: "span 4" }}
          /> */}
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
          >
            REGISTER
          </Button>
        </Box>
      </form>
    )}
  </Formik>
  );
};

export default EditUser;
