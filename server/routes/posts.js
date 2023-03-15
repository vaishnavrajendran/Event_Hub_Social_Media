import express from "express";
import { getFeedPosts, getUserPosts, likePost, addComment, deleteComment, deletePost, reportPosts, getReportedPosts, paymentSuccess } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import { stripePayment } from "../controllers/stripe.js"

const router = express.Router();

/* READ */
router.get("/get-reported", verifyToken, getReportedPosts)
router.get("/:userId/get", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* POST */
router.post("/:postId/:_id", verifyToken, addComment);
router.post("/create-payment-intent", stripePayment);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:comm_id/:postId/delete-comment", verifyToken, deleteComment)
router.patch("/delete-post/:postIds", verifyToken, deletePost);
router.patch("/:_id/:postId/report", verifyToken, reportPosts);
router.patch("/:postId/paymentSuccess", verifyToken, paymentSuccess)


export default router;
