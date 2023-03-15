import express from 'express';
import { newConversation, getConversation, getTwoConversation, frndreqAccepted } from '../controllers/conversations.js'

const router = express.Router();

//new conversation
router.post("/", newConversation)

router.post("/:userId/:friendId/new", frndreqAccepted)

//get conv of a user
router.get("/:userId", getConversation)

//get conv of two users
router.get("/find/:firstUserId/:secondUserId", getTwoConversation)


export default router;