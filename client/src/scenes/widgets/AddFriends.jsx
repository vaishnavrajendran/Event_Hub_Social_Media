// import { Button, Dialog, useMediaQuery, useTheme } from '@material-ui/core';
import { Notifications } from "@mui/icons-material";
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { Box, fontSize, textAlign } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setUser } from "state";

function AddFriends() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const { requests } = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const details = allUsers.filter((item) => requests.includes(item._id));
  const { _id } = useSelector(state => state.user);

  const styles = {
    dialogContainer: {
      //   display: "flex",
      //   alignItems: "center",
      //   justifyContent: "center",
      height: "100vh",
      position: "fixed",
      top: 0,
      right: 0,
      width: "30%",
      height: "100%",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      overflow: "auto",
    },
    // dialogContent: {
    //   width: "25vw",
    //   borderRadius: "10px",
    //   boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    //   padding: "20px",
    //   fontFamily: "Arial, sans-serif",
    //   fontSize: "1.2rem",
    //   fontWeight: "bold",
    //   color: "#333333",
    // },
    // dialogTitle: {
    //   margin: "0",
    //   paddingBottom: "10px",
    //   borderBottom: "1px solid #CCCCCC",
    // },
    // dialogText: {
    //   margin: "0",
    //   paddingTop: "20px",
    // },
  };

  const acceptRequest = (userId) => async (req, res) => {
    console.log('userIddd',userId)
    const response = await fetch(`http://localhost:3001/users/${_id}/${userId}/accept`,
    {
      method:"PATCH",
      headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          'Accept': 'application/json'
      }
    })
    const updatedUser = await response.json();
    if(updatedUser){
      console.log(updatedUser)
      dispatch(setUser({data:updatedUser}))
    }
  }

  return (
    <>
      <PersonAddIcon sx={{ fontSize: "25px" }} onClick={() => setOpen(true)} />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={styles.dialogContainer}>
          <Typography
            sx={{ padding: "2rem", textAlign: "center", fontSize: "1.5rem" }}
          >
            Friend Requests
          </Typography>
          {details.map((data, i) => (
            <>
              <FlexBetween gap="1rem">
                <FlexBetween
                  sx={{
                    paddingTop: "1.5rem",
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                  }}
                  gap="0.5rem"
                >
                  <UserImage image={data.picturePath} size="55px" />
                  <Box
                    onClick={() => {
                      Navigate(`/profile/${data._id}`);
                      console.log("data", data._id);
                    }}
                  >
                    <Typography
                      color={main}
                      variant="h5"
                      fontWeight="500"
                      sx={{
                        "&:hover": {
                          color: palette.primary.light,
                          cursor: "pointer",
                        },
                      }}
                    >
                      {`${data.firstName} ${data.lastName}`}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                      {data.occupation}
                    </Typography>
                  </Box>
                </FlexBetween>
                <Button 
                sx={{marginTop:"1.5rem"}}
                onClick={acceptRequest(data._id)}
                >Accept
                </Button>
                <Button sx={{marginTop:"1.5rem"}}>Reject</Button>
              </FlexBetween>
            </>
          ))}
        </div>
      </Dialog>
    </>
  );
}

export default AddFriends;
