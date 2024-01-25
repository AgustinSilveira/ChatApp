import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatContext } from "../ChatConext";
import { Link } from 'react-router-dom';
import { useWindowSize } from 'react-use';

const Chats = () => {
  const { width } = useWindowSize();
  const [chats, setChats] = useState([]);
  const [user] = useAuthState(auth);
  const { dispatch } = useContext(ChatContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerChats = async () => {
  try {
    const referenciaDoc = doc(db, 'userChats', user.uid);
    const unsub = onSnapshot(referenciaDoc, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data) {
          setChats(data);
          setLoading(false);
        } else {
          console.error("Los datos son undefined o null.");
          setError("Los datos son undefined o null.");
          setLoading(false);
        }
      } else {
        console.error("El documento no existe.");
        setError("El documento no existe.");
        setLoading(false);
      }
    }, (error) => {
      console.error("Error al obtener los chats:", error);
      setError(error);
      setLoading(false);
    });

    return unsub;
  } catch (error) {
    console.error("Error al obtener los chats:", error);
    setError(error);
    setLoading(false);
  }
};

  
    user.uid && obtenerChats();
  }, [user.uid]);



  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u })
  }

  if (loading) {
    return <p>Cargando chats...</p>;
}

if (error) {
    return <p style={{color: "red"}}>Su cuenta se creó con un <strong>error</strong>. Tienes que crearte otra nueva cuenta, esta aplicación de chat está
      en creación y tiene algunos errores. disculpe los incomenientes.
    </p>;
}

return (
    <div className="chats-chat">
        {Object.keys(chats).length === 0 ? (
            <p style={{ color: 'white', textAlign: 'center' }}>No tienes chats aún. ¡Empieza a chatear ahora!</p>
        ) : (
            Object.entries(chats)
                ?.sort((a, b) => b[1]?.date - a[1]?.date)
                .map((chat) => (
                    <Link
                        to={width < 600 ? `/chat/${chat[0]}` : null}
                        key={chat[0]}
                        onClick={() => width < 600 && handleSelect(chat[1]?.userInfo)}
                    >
                        <div className="userChat-chat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                            <img src={chat[1]?.userInfo?.photoURL || ''} alt="" />
                            <div className="userChatInfo">
                                <span>{chat[1]?.userInfo?.displayName}</span>
                                <p>{chat[1]?.lastMessage?.text}</p>
                            </div>
                        </div>
                    </Link>
                ))
        )}
    </div>
);
}

export default Chats;
