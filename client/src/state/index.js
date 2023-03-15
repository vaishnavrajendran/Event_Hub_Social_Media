import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  reportedPosts: [],
  reportedUsers: []
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
      setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.allUsers = action.payload.allUsers;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload.allUsers;
    },
    updateAllUsers: (state, action) => {
      const updatedUsers = state.allUsers.map(user => {
        if(user._id === action.payload.user._id) return action.payload.user;
        return user;
      })
      state.allUsers = updatedUsers;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
        // state.user.friends = action.payload.friends;
        // state.user.requests = action.payload.requests;
        // state.user.requested = action.payload.requested;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    deletePosts: (state, action) => {
      state.posts = action.payload.remainingPosts;
    },
    setUser: (state, action) => {
      state.user = action.payload.data;
    },
    setReportedPosts: (state, action) => {
      state.reportedPosts = action.payload.post
    },
    updateReportedPosts: (state, action) => {
      const updatedPosts = state.reportedPosts.map(post => {
        if(post._id === action.payload.post._id) return action.payload.post;
        return post
      })
      state.reportedPosts = updatedPosts;
    }
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setUser, setComments, deletePosts, setAllUsers, setReportedPosts, updateReportedPosts, updateAllUsers } =
  authSlice.actions;
export default authSlice.reducer;
