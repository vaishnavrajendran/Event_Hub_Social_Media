  import {
    Divider,
    InputBase,
    useTheme,
    Button,
  } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import UserImage from "components/UserImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import axios from "axios";
  import { setPost, setPosts } from 'state';
  
  const CommentWidget = ({ picturePath, postId }) => {
    const dispatch = useDispatch();
    const [comments, setComment] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
    const { firstName, lastName } = useSelector( state => state.user)
  
    // const stateComments = useDispatch(state => state)
    const handlePost = async () => {
      const formData = new FormData();
      formData.append("comments", comments);
      formData.append("picturePath", picturePath)
      formData.append("firstName", firstName);
      formData.append("lastName", lastName)

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
      }
  
      const { data } = await axios.post(
        `http://localhost:3001/posts/${postId}/${_id}`,
        formData,
        config
      ).catch((error) => {
        console.log(error.message)
      })
      if(data){
        console.log('daata',data)
        dispatch(setPost({post:data}))
      }
    };
  
    return (
      <WidgetWrapper>
        <FlexBetween gap="1rem">
          <UserImage sx={{mt:"1rem"}} size="30px" image={picturePath} />
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setComment(e.target.value)}
            value={comments}
            name="comments"
            sx={{
                width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "1rem",
              padding: "1rem 2rem",
              height:"2rem"
            }}
          />
          <Button
            // disabled={!post}
            onClick={handlePost}
            sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
            }}
            >
            POST
          </Button>
        </FlexBetween>
        <Divider sx={{ margin: "1.25rem 0 0 0" }} />
      </WidgetWrapper>
    );
  };
  
  export default CommentWidget;