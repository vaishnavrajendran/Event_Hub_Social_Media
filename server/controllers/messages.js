import Message from "../models/Message.js";

export const addMessage = async (req, res) => {
    console.log(req.body);
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getConversation = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId:req.params.conversationId
        })
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
}