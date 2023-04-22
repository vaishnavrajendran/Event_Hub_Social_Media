import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Conversation.css'

const Conversation = ({ conversation, currentUserId }) => {
    const [user, setUser] = useState(null);
    const {allUsers} = useSelector(state => state)

    useEffect(() => {
        const friendId = conversation.members.find(m => m !== currentUserId);
        const getUser = () => {
            const data = allUsers.filter(id => id._id === friendId)
            const obj = data[0];
            setUser(obj);
        }
        getUser();
    },[currentUserId, conversation])
  return (
    <div className = "conversation">
      <img className='conversationImg'
      src={user?.picturePath}
      alt="convImg"
      />
      <span className="conversationName">{`${user?.firstName} ${user?.lastName}`}</span>
    </div>
  )
}

export default Conversation
