import mongoose, { Mongoose } from "mongoose";
import User from "../models/User.js";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments:[
      {
        userId:{
          type:mongoose.Types.ObjectId,
          ref:'User'
        },
        comment:{
          type:String
        },
        picturePath:{
          type:String
        },
        firstName:{
          type:String
        },
        lastName:{
          type:String
        },
        createdAt:{
          type:Date,
          immutable:true,
          default:()=>Date.now()
      },
      }
    ]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
