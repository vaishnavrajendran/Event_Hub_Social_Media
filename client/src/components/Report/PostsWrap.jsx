import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReportedPosts } from "state";
import PostWrap from "components/Report/PostWrap";

const PostsWrap = ({userId, isProfile = false}) => {



  const dispatch = useDispatch();
  const posts = useSelector((state) => state.reportedPosts);
  const token = useSelector((state) => state.token);
  const { _id } = useSelector(state => state.user)

  const getReportedPosts = async () => {
    const response = await fetch(`http://localhost:3001/posts/get-reported`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setReportedPosts({ post: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setReportedPosts({ post: data }));
  };


  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getReportedPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps  

  return (
    <>
      {posts.filter(post => post.isReported.length !== 0).map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
          adminBlocked
        }) => (
          <PostWrap
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            adminBlocked
          />
        )
      )}
    </>
  );
};

export default PostsWrap;