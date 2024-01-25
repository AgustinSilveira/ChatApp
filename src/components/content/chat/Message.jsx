import React, { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../ChatConext";
import { auth } from "../../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Timestamp } from "firebase/firestore";

const Message = ({ message }) => {
    const [user] = useAuthState(auth);
    const { data } = useContext(ChatContext);
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const getMessageTime = () => {
        const timestamp = message.date;
        const date = timestamp ? new Date(timestamp.seconds * 1000) : new Date();
        return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    };

    return (
        <div ref={ref} className={`message-chat ${message.senderId === user.uid && "owner"}`}>
            <div className="messageInfo-chat">
                <img src={message.senderId === user.uid ? user.photoURL : data.user.photoURL} alt="" />
                <span>{getMessageTime()}</span>
            </div>
            <div className="messageContent-chat">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    );
};

export default Message;
