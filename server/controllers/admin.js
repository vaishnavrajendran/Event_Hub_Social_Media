import { trusted } from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";
// import User from "../models/User.js";

export const blockPost = async (req, res) => {
    const { postId } = req.params;
    const posts = await Post.findById(postId);
    if(posts.adminBlocked === false){
        posts.adminBlocked = true;
        const post = await posts.save()
        res.status(200).json(post);
    } else {
        posts.adminBlocked = false; 
        const post = await posts.save()
        res.status(200).json(post);
    }
}

export const blockUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if(user.adminBlocked === true) {
        user.adminBlocked = false;
        const userData = await user.save();
        console.log("user",userData)
        res.status(200).json(userData)
    } else {
        user.adminBlocked = true;
        const userData = await user.save();
        console.log("user",userData)
        res.status(200).json(userData)
    }
}