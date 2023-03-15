import express from 'express';
import { addMessage, getConversation } from '../controllers/messages.js'

const router = express.Router();

//add msg
router.post("/", addMessage);

//get conversation
router.get("/:conversationId", getConversation)

export default router;