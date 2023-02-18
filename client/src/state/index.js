import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
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
      state.posts = action.payload.remainingPosts
    },
    setUser: (state, action) => {
      state.user = action.payload.data
    }
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setUser, setComments, deletePosts } =
  authSlice.actions;
export default authSlice.reducer;
