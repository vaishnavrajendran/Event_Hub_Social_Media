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
  picture: yup.string().required("required"),
  company: yup.string().min(3).required("required"),
  service: yup.string().min(3).required("required"),
});

const initialValuesRegister = {
  company: "",
  service:"",
  picture: "",
};


const EditUser = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { _id } = useSelector(state => state.user)
  const token = useSelector(state => state.token);

  const [userUrl,setUserUrl] = useState('');
  const register = async (values, onSubmitProps) => {
    const formData = new FormData()
    for(let value in values){
      if(value === 'picture'){
        formData.append("hostVerification",userUrl.toString())
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
      `http://localhost:3001/users/${_id}/behost`,
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
                label="Company Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.company}
                name="company"
                error={
                  Boolean(touched.company) && Boolean(errors.company)
                }
                helperText={touched.company && errors.company}
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
                picCarrier(values.picture)}
              }
              >Upload
              </Button>
              <TextField
                label="Name of Service"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.service}
                name="service"
                error={Boolean(touched.service) && Boolean(errors.service)}
                helperText={touched.service && errors.service}
                sx={{ gridColumn: "span 4" }}
              />
            
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
