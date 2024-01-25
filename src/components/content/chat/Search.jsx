import React, { useContext, useState } from "react";
import { db, auth } from "../../../firebase/config"
import {
  collection, query, where, serverTimestamp,
  doc, getDoc, setDoc, updateDoc, getDocs
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const [users, setUsers] = useState([]);

  const [USER] = useAuthState(auth);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
      setErr(false);
    } catch (error) {
      console.error("Error al buscar usuario:", error);
      setErr(true);
    }
  };





  const handleKey = e => {
    e.code === "Enter" && handleSearch()
  }

  const handleSelect = async () => {
    if (user) {
      const combinedId =
        USER.uid > user.uid ? USER.uid + user.uid : user.uid + USER.uid;

      if (combinedId !== 'null') { // Verifica que el ID del chat no sea 'null'
        try {
          const res = await getDoc(doc(db, "chats", combinedId));
          if (!res.exists()) {
            await setDoc(doc(db, "chats", combinedId), { messages: [] });

            // Crear chat de usuario
            await updateDoc(doc(db, "userChats", USER.uid), {
              [combinedId + ".userInfo"]: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
            await updateDoc(doc(db, "userChats", user.uid), {
              [combinedId + ".userInfo"]: {
                uid: USER.uid,
                displayName: USER.displayName,
                photoURL: USER.photoURL,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
          }
        } catch (err) {
          console.error("Error al actualizar el documento:", err);
        }
      }
    }
    setUser(null);
    setUsername("");
  };
  return (
    <div className="search-chat">
      <div className="searchForm-chat">

        <PersonSearchOutlinedIcon className="iconSearch" />
        <input type="text" placeholder="Buscar usuario"
          onKeyDown={handleKey}
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <span className="iconLupa" onClick={handleSearch}>
          <SearchOutlinedIcon className="iconSearch userSearch" />
        </span>


      </div>
      {err && <span>Usuario no encontrado</span>}
      {user && <div className="userChat-chat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search