import Conversation from '../models/Conversation.js'

export const newConversation = async (req, res) => {
    const newChat = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })
    try {
        const savedConversation = await newChat.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
} 

export const frndreqAccepted = async (req, res) => {
    const newChat = new Conversation({
        members: [req.params.userId, req.params.friendId]
    })
    await newChat.save();
}

export const getConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId]}
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getTwoConversation = async (req, res) => {
    try {
        console.log(req.params);
        const conversation = await Conversation.findOne({
            members:{ $all: [req.params.firstUserId, req.params.secondUserId]}
        })
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
}
