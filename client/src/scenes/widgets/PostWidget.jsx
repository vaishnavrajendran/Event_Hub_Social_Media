import {
  ChatBubbleOutlineOutlined,
  DeleteOutline,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import CommentWidget from "./CommentWidget";
import TimeAgo from "./TImeAgo";
import IconButton from "@mui/material/IconButton";

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
  const { _id, firstName } = useSelector((state) => state.user);

  const stateComments = useSelector((state) => state.posts);

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
    console.log("coomm",comm_id);
    const response = await fetch(
      `http://localhost:3001/posts/${comm_id}/${postId}/delete-comment`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    ).catch((err) => console.log(err.message));
    const updatedPost = await response.json();
    if (updatedPost) {
      dispatch(setPost({ post: updatedPost }));
    }
  };

  const userInfo = useSelector((state) => state.user);
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        postId={postId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        postUserId={postUserId}
        description={description}
        picturePath={picturePath}
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
      {isComments && (
        <CommentWidget picturePath={userInfo.picturePath} postId={postId} />
      )}
      {isComments && (
        <Box>
          {stateComments
            .filter((arr) => arr._id === postId)
            .map((comm, i) => (
              <WidgetWrapper>
                <FlexBetween gap="1rem">
                  <Box key={i}>
                    {/* {comm.comments.map((com) => (
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
                                  ))} */}
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                    >
                      {comm.comments.map((com) => (
                        <>
                          <ListItem
                            alignItems="flex-start"
                            secondaryAction={
                              <IconButton edge="end" aria-label="delete">
                                {_id === com.userId && <DeleteOutline onClick = {() => {
                                  deleteComment(com._id)
                                }} />}
                              </IconButton>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar alt="Remy Sharp" src={com.picturePath} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${com.firstName} ${com.lastName}`}
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    {`to ${firstName}  -  ${com.comment}`}
                                  </Typography>
                                  <TimeAgo
                                    sx={{ color: main }}
                                    timestamp={com.createdAt}
                                  ></TimeAgo>
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </>
                      ))}
                    </List>
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
