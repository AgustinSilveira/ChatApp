import React, { useContext, useState } from "react";
import Messages from "./Messages";
import Input from "./Input";
import Navbar from "./Navbar";  // Asegúrate de importar tu componente Navbar
import { ChatContext } from "../ChatConext";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';

import { Link } from "react-router-dom";

const Chat = () => {
    const { data } = useContext(ChatContext);
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const handleNavbarToggle = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    return (
        <div className="chat-chat">
            <div className="chatInfo-chat">
                <div className="arrowLeft">
                <Link to="/chat">
                     <ArrowBackIosNewOutlinedIcon className="menuIcon" />
                </Link>
                </div>
            
                
                <span className="name-chat">{data.user?.displayName}</span>
                
                
            </div>

            <Messages />
            <Input />

            {/* Renderiza el Navbar solo si isNavbarOpen es true */}
            {isNavbarOpen && <Navbar />}
        </div>
    );
}

export default Chat;
