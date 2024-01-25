import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../chat/Sidebar";
import Chat from "../chat/Chat";
import { ChatContext } from "../ChatConext";


const ChatPhone = () => {
  const { data } = useContext(ChatContext);
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
          {data.user ? (
            <Chat />
          ) : (
            <span id="tittle_error">Error inesperado</span>
          )}
        </>
      ) : (
        <span id="tittle_error">Error inesperado</span>
      )}
    </div>
  </div>
  );
};

export default ChatPhone;
