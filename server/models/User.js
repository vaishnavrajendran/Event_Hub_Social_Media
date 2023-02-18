import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
      min: 5,
    },
    confirm_password: {
      type: String,
      // required: true,
      min:5
    },
    mobile: {
      type: Number,
      min:10
    },
    picturePath: {
      type: String,
    },
    friends: {
      type: Array,
      default: [],
    },
    requests:{
      type:Array,
      default: []
    },
    requested:{
      type:Array,
      default: []
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
