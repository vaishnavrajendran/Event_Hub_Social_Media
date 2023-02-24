import express from "express";
import {
  getUser,
  getUserFriends,
  sendRemoveFriendRequest,
  removeFriend,
  acceptRequest,
  blockUser,
  updateUser,
  beHost,
  acceptHost,
  rejectHost
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId/add", verifyToken, sendRemoveFriendRequest);
router.patch("/:id/:friendId/remove", verifyToken, removeFriend)
router.patch("/:id/:friendId/accept", verifyToken, acceptRequest)
router.patch("/:friendId/:id/block", verifyToken, blockUser)
router.patch("/:userId/update", verifyToken, updateUser)
router.patch("/:userId/behost", verifyToken, beHost)
router.patch("/:userId/acceptHost", verifyToken, acceptHost)
router.patch("/:userId/rejectHost", verifyToken, rejectHost)

export default router;
