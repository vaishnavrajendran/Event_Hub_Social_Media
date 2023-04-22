import React, { useEffect, useRef, useState } from "react";
import "./messenger.css";
import Navbar from "scenes/AdminNavbar";
import Conversation from "components/Conversation/Conversation";
import Message from "components/Message/Message";
import ChatOnline from "components/ChatOnline/ChatOnline";
import { useSelector } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { EmojiStyle } from 'emoji-picker-react';

// import FriendListWidget from "scenes/widgets/FriendListWidget";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const socket = useRef();
  const { _id } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    console.log("vilikk");
    socket.current.emit("addUser", _id);
    socket.current.on("getUsers", (users) => {
      const matchedArray = user.friends.filter((obj1) => {
        const matchedObj = users.find((obj2) => obj2.userId === obj1._id);
        return matchedObj !== undefined;
      });
      setOnlineUsers(matchedArray);
      // setOnlineUsers(user.friends.filter((f) => {users.some((u) => u.userId === f._id )
      // }));
    });
  }, [user]);

  const onEmojiClick = (emojiClickData, event) => {
    setNewMessage(prevInput => prevInput + emojiClickData.emoji);
  }

  useEffect(() => {
    const getConversations = async (req, res) => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/conversations/${_id}`
        );
        setConversations(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    getConversations();
  }, [_id]);

  useEffect(() => {
    const getMessages = async (req, res) => {
      try {
        const res = await axios.get(
          `http://localhost:3001/messages/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: _id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== _id);

    socket.current.emit("sendMessage", {
      senderId: _id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios
        .post("http://localhost:3001/messages", message)
        .catch((err) => console.log(err.message));
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations?.map((conv) => (
              <div
                onClick={() => {
                  setCurrentChat(conv);
                }}
              >
                <Conversation conversation={conv} currentUserId={_id} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => (
                    <div ref={scrollRef}>
                      <Message
                        message={message}
                        own={message?.sender === _id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <div className="emoji">
                    {open && <EmojiPicker onEmojiClick={onEmojiClick} emojiStyle={EmojiStyle.GOOGLE} />}
                  </div>
                  <EmojiEmotionsIcon
                    fontSize="large"
                    onClick={() => setOpen((prevState) => !prevState)}
                    onFocusOut={() => setOpen((prevState) => !prevState)}
                    onBlur={() => setOpen((prevState) => !prevState)}
                  />
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={_id}
              setCurrentChat={setCurrentChat}
            />
            {/* <FriendListWidget userId={_id}/> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
