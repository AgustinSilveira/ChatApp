import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import MenuResponsive from "./Welcome";

const Sidebar = () => {
    return(
        <div className="sidebar-chat">
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
}

export default Sidebar