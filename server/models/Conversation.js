import mongoose from 'mongoose';

const conversationSchema = mongoose.Schema(
    {
        members:{
            type:Array
        },
    },
    { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema)
export default Conversation;