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
      min: 5,
    },
    confirm_password: {
      type: String,
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
    blocked:{
      type:Array
    },
    isHost:{
      type:Number,
      default:0
    },
    company:{
      type:String
    },
    service:{
      type:String
    },
    hostVerification:{
      type:String
    },
    status:{
      type:String
    },
    adminBlocked:{
      type:Boolean
    },
    isReported:{
      type:Array
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
