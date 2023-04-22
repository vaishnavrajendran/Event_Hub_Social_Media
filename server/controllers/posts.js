import Post from "../models/Post.js";
// import Report from "../models/Report.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    console.log("1");
    const { userId } = req.params;
    const post = await Post.find();
    const user = await User.findById(userId);
    const filteredDocs = post.filter(
      (posts) => !user.blocked.includes(posts.userId)
    );
    const reFilteredDocs = filteredDocs.filter(
      (posts) => {
        if(posts?.isViewed.length <= posts?.limit){
          console.log("if");
          return posts.adminBlocked !== true && !posts?.isViewed?.includes(userId) && posts.isPaymentCompleted == 0
        } else {
          console.log("else");
          return posts.adminBlocked !== true && !posts?.isViewed?.includes(userId)
        }
      } 
    );
    const sortedDocs = reFilteredDocs.sort(
      (a, b) => b.isPaymentCompleted - a.isPaymentCompleted
    );
    console.log("sorted",sortedDocs);
    res.status(200).json(sortedDocs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    log("123")
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { _id } = req.params;
    const { postId } = req.params;
    const id = postId;
    const saveComment = await Post.updateOne(
      { _id: postId },
      {
        $push: {
          comments: {
            userId: _id,
            comment: req.body.comments,
            picturePath: req.body.picturePath,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          },
        },
      }
    );
    if (saveComment) {
      const post = await Post.findById(id);
      res.status(200).json(post);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { comm_id } = req.params;
    const { postId } = req.params;
    const findPost = await Post.findById(postId);
    if (findPost) {
      const findCommentIndex = await findPost.comments.findIndex(
        (id) => id._id == comm_id
      );
      console.log(findCommentIndex, "indexx")
      if (findCommentIndex) {
        findPost.comments.splice(findCommentIndex, 1);
        await findPost.save();
        console.log('find',findPost)
        res.status(200).json(findPost);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postIds } = req.params;
    await Post.findByIdAndDelete(postIds);
    res.status(200).json(postIds);
  } catch (err) {
    console.log(err.message);
  }
};

export const reportPosts = async (req, res) => {
  try {
    const { _id, postId } = req.params;
    const report = await Post.findByIdAndUpdate(
      { _id: postId },
      { $push: { isReported: _id } },
      { new: true }
    );
    const savedReport = await report.save();
    res.status(200).json(savedReport);
  } catch (error) {
    console.log(error.message);
  }
};

export const getReportedPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      isReported: { $exists: true, $ne: [] },
    }).exec();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
  }
};

export const paymentSuccess = async (req, res) => {
  try {
    const { postId } = req.params;
    const { amount } = req.params;
    let limit;
    if (amount == 140) {
      limit = 50000;
    } else if (amount == 260) {
      limit = 100000;
      } else if (amount == 380) {
      limit = 200000;
      } else if (amount == 500) {
      limit = 300000;
      }
    const post = await Post.findByIdAndUpdate(
      { _id: postId },
      { $set: { isPaymentCompleted: 1, amount:amount, limit:limit } },
      { new: true }
    );
    res.status(201).json(post);
  } catch (error) {
    console.log(error.message);
  }
};

export const userViewed = async (req, res) => {
  const { id } = req.params;
  const findPosts = await Post.updateMany({isPaymentCompleted:1},
    {$addToSet:{isViewed:id}})
  // console.log("find",findPosts);
}

export const editPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      { _id: req.params.postId },
      { $set: { description:req.body.description, picturePath:req.body.picturePath } },
      { new: true }
    );
    res.status(200).json({post});
  } catch (error) {
    console.log(error.message);
  }
}
