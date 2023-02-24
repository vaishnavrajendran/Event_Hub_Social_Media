import {
  ChatBubbleOutlineOutlined,
  DeleteOutline,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Button, Divider, IconButton, InputBase, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import CommentWidget from "./CommentWidget";
import TimeAgo from "./TImeAgo";
import axios from "axios";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const { _id } = useSelector(state => state.user)
  
  const stateComments = useSelector(state => state.posts)

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const deleteComment = async (comm_id) => {
    const response = await fetch(`http://localhost:3001/posts/${comm_id}/${postId}/delete-comment`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    }).catch((err) => console.log(err.message))
    const updatedPost = await response.json();
    if(updatedPost){
      dispatch(setPost({ post: updatedPost }));
    }
  }


  const userInfo = useSelector(state => state.user)
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        postId = {postId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        postUserId={postUserId}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picturePath}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && <CommentWidget picturePath={userInfo.picturePath} postId={postId} />}
      {isComments && (
        <Box >
          {stateComments.filter(arr => arr._id === postId)
            .map((comm, i) => (
              <WidgetWrapper>
                          <FlexBetween gap="1rem" >
                          <Box key={i}>
                              {comm.comments.map((com) => (
                              <>
                                <Typography sx={{ color: main, marginLeft:"4rem", mb:"-0.4rem"}}>{com.firstName}</Typography>
                                <FlexBetween paddingLeft="1.5rem" marginTop="-1rem">
                                <UserImage sx={{mt:"1rem", pb:"1rem"}} size="35px" image={com.picturePath} />
                                <TimeAgo sx={{ color: main}} timestamp={com.createdAt}></TimeAgo>
                                <Typography sx={{ color: main, m: "0.5rem 0", pl: "3.5rem" }}>{com.comment}</Typography>
                                {_id === com.userId && <DeleteOutline
                                sx={{marginLeft:"5.5rem"}}
                                onClick = {() => {
                                  deleteComment(com._id)
                                }}
                                />}
                                </FlexBetween>
                                <Divider sx={{ mt:"0.8rem"}}/>
                              </>
                                  ))}
                          </Box>
                          </FlexBetween>
                    </WidgetWrapper>
            ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
