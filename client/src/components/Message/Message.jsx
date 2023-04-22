import React from 'react';
import './Message.css';
import { format } from 'timeago.js'

const Message = ({message, own}) => {
    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img className='messageImg'
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                alt="message"
                />
                <p className='messageText'>{message.text}</p>
            </div>
             <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}

export default Message;