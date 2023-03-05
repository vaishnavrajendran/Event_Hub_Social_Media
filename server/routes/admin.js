import express from "express";
import { blockPost, blockUser } from "../controllers/admin.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */

/* POST */


/* UPDATE */
router.patch("/:postId/blockPost", verifyToken, blockPost)
router.patch("/:id/blockUser", verifyToken, blockUser)


export default router;