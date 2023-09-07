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
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setPost, setUser } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { storage } from "firebaseConfig";
import { authentication } from "firebaseConfig";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const registerSchema = yup.object().shape({
  picture: yup.string().required("required"),
  description: yup.string().min(3).required("required"),
});


const EditUser = () => {
let { desc,picture,postID } = useLocation().state;

let initialValuesRegister = {
  description: desc,
  picture: picture,
};

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [userUrl, setUserUrl] = useState("");
  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      if (value === "picture") {
        formData.append("picturePath", userUrl.toString() == "" ? picture : userUrl.toString());
      } else {
        formData.append(value, values[value]);
      }
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios
      .patch(`http://localhost:3001/posts/${postID}/edit-post`, formData, config)
      .catch((error) => {
        console.log(error.message);
      });

    if (data) {
      dispatch(setPost({ post: data }));
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
          });
      });
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    register(values, onSubmitProps);
    navigate("/home");
  };

  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Event Hub
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Worry Free Event Planning.
        </Typography>
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
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  label="Post Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={Boolean(touched.description) && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
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
                          <p>Add any id proof(Aadhaar/Driving License)</p>
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
                    picCarrier(values.picture);
                  }}
                >
                  Upload
                </Button>
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
                  Save Changes
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default EditUser;
