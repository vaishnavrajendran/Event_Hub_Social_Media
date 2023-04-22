import mongoose from "mongoose";

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
    ],
    blocked:{
      type: Array
    },
    isReported:{
      type: Array
    },
    adminBlocked:{
      type:Boolean
    },
    isPaymentCompleted:{
      type:Number,
      default:0
    },
    amount:{
      type:Number,
      default:0
    },
    isViewed:{
      type:Array
    },
    limit: {
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

// postSchema.pre('findByIdAndUpdate', function (next) {
//   console.log("123")
//   const post = this.getUpdate();
//   if (post.amount === 140) {
//   console.log("1")
//     post.$set.limit = 50000;
// } else if (post.amount === 260) {
//   console.log("2")
//   post.$set.limit = 100000;
//   } else if (post.amount === 380) {
//   console.log("3")
//   post.$set.limit = 200000;
//   } else if (post.amount === 500) {
//   console.log("4")
//   post.$set.limit = 300000;
//   }
//   next();
// });


const Post = mongoose.model("Post", postSchema);

export default Post;
