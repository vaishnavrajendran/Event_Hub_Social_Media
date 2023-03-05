import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import AdminNavbar from "scenes/AdminNavbar";
// import UserWidget from "scenes/widgets/UserWidget";
import PostsWrap from "components/Report/PostsWrap";
// import AdvertWidget from "scenes/widgets/AdvertWidget";
// import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user || {});

  return (
    <Box>
      <AdminNavbar/>
      <Box
        width="100%"
        padding="1rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostsWrap userId={_id}/>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;