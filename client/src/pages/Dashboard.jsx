import React from "react";
import AdminNavbar from "scenes/AdminNavbar";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";
import App from "scenes/widgets/Charts/SalesChart";

const Dashboard = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user || {});
  return (
    <Box>
      <AdminNavbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-evenly"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} /> */}
          <Typography sx={{display:"flex",justifyContent:"center", fontSize:"2rem"}}>Sales Chart</Typography>
          <App/>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
