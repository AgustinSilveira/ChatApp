import React, { useContext, useEffect, useState } from "react";
import Message from './Message';
import { ChatContext } from "../ChatConext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        if (data.chatId) {
            const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
                if (doc.exists()) {
                    setMessages(doc.data().messages || []);
                }
            });
    
            return () => {
                unSub();
            };
        } else {
            setMessages([]); // Limpiar mensajes si no hay chat activo
        }
    }, [data.chatId]);

    return (
        <div className="messages-chat respChat">
            {messages.map((m) => (
                <Message message={m} key={m.id} />
            ))}
        </div>
    );
};

export default Messages;
