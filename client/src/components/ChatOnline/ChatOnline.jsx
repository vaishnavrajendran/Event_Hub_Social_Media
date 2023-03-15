import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./ChatOnline.css";
import axios from 'axios';

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);


  const config = {
    headers: {
      Authorization: `Bearer ${token}` 
    },
  };

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`http://localhost:3001/users/${_id}/friends`,config);
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    const matchedArray = friends.filter(obj1 => {
        const matchedObj = onlineUsers.find(obj2 => obj2._id === obj1._id);
        return matchedObj !== undefined;
    })
    setOnlineFriends(matchedArray);
  },[friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
        const res = await axios.get(`http://localhost:3001/conversations/find/${currentId}/${user._id}`);
        setCurrentChat(res?.data);
    } catch (error) {
        console.log(error.message);
    }
  }

  return (
    <div className="chatOnline">
        {onlineFriends?.map((o) => (
            <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src={o?.picturePath}
            alt=""
            />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{o?.firstName}</span>
      </div>
        ))}
    </div>
  );
};

export default ChatOnline;
