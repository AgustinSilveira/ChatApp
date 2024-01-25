import React, { useState, useEffect } from "react";
import Sidebar from "./chat/Sidebar";
import Chat from "./chat/Chat";
import MenuResponsive from "./chat/Welcome";

const ChatHome = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 600);
  };

  useEffect(() => {
    // Agregar un listener para el evento resize
    window.addEventListener("resize", handleResize);

    // Limpieza del listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div className="chatHome">
      <div className="container-chatHome">
        {isMobile ? (
            <>
          <Sidebar />
          </>
          
        ) : (
          <>
            <Sidebar />
            <Chat />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatHome;
