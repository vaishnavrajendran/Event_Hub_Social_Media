import express from "express";
import { getFeedPosts, getUserPosts, likePost, addComment, deleteComment, deletePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* POST */
router.post("/:postId/:_id", addComment);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:comm_id/:postId/delete-comment", verifyToken, deleteComment)
router.patch("/delete-post/:postIds", verifyToken, deletePost);


export default router;
