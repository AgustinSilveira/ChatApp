import React, { useState, useEffect } from "react";
import Sidebar from "./chat/Sidebar";
import Chat from "./chat/Chat";
import MenuResponsive from "./chat/Welcome";

const ChatHome = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [containerHeight, setContainerHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 600);
    setContainerHeight(window.innerHeight);
  };

  useEffect(() => {
    // Agregar un listener para el evento resize
    window.addEventListener("resize", handleResize);

    // Limpieza del listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  const containerStyle = {
    height: isMobile ? "100vh" : `${containerHeight}px`,
    overflow: "hidden", // Opcional, según tus necesidades
  };

  return (
    <div className="chatHome" style={containerStyle}>
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
