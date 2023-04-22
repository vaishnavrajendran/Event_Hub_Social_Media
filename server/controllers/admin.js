import { trusted } from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const blockPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const posts = await Post.findById(postId);
    if (posts.adminBlocked === false) {
      posts.adminBlocked = true;
      const post = await posts.save();
      res.status(200).json(post);
    } else {
      posts.adminBlocked = false;
      const post = await posts.save();
      res.status(200).json(post);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user.adminBlocked === true) {
      user.adminBlocked = false;
      const userData = await user.save();
      res.status(200).json(userData);
    } else {
      user.adminBlocked = true;
      const userData = await user.save();
      res.status(200).json(userData);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const removeReport = async (req, res) => {
  try {
    const { postID } = req.params;
    const post = await Post.findByIdAndUpdate({_id:postID},
      {$unset:{ isReported:""}},{new:true});
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message)
  }
}
