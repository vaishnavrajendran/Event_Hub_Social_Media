import {
  Button,
  Dialog,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setUser } from "state";
import axios from "axios";

function AddFriends() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const { palette } = useTheme();
  // const dark = palette.neutral.dark;
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
      height: "100vh",
      position: "fixed",
      top: 0,
      right: 0,
      width: "30%",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      overflow: "auto",
    },
  };

  const acceptRequest = (userId) => async (req, res) => {

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
      dispatch(setUser({data:updatedUser}));
      await axios.post(`http://localhost:3001/conversations/${_id}/${userId}/new`)
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
