import React, { useContext, useState } from "react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { auth, db, storage } from "../../../firebase/config";
import { ChatContext } from "../ChatConext";
import { useAuthState } from "react-firebase-hooks/auth";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const [user] = useAuthState(auth);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        if (!data || !data.chatId) {
            console.error("Data or data.chatId is null or undefined", data);
            return;
        }

        try {
            const chatDocRef = doc(db, "chats", data.chatId);
            const userChatsDocRef = doc(db, "userChats", user.uid);
            const recipientUserChatsDocRef = doc(db, "userChats", data.user.uid);

            // Verificar si los documentos existen antes de intentar actualizarlos
            const [chatDocExists, userChatsDocExists, recipientUserChatsDocExists] = await Promise.all([
                getDoc(chatDocRef).then(doc => doc.exists()),
                getDoc(userChatsDocRef).then(doc => doc.exists()),
                getDoc(recipientUserChatsDocRef).then(doc => doc.exists())
            ]);

            if (!chatDocExists || !userChatsDocExists || !recipientUserChatsDocExists) {
                console.error("One or more documents do not exist.");
                return;
            }

            // Actualizar documentos
            if (img) {
                const storageRef = ref(storage, uuid());
                const uploadTask = uploadBytesResumable(storageRef, img);

                uploadTask.on(
                    "state_changed",
                    null,
                    (error) => {
                        console.error("Error de carga de imagen:", error);
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            await updateDoc(chatDocRef, {
                                messages: arrayUnion({
                                    id: uuid(),
                                    text,
                                    senderId: user.uid,
                                    date: Timestamp.now(),
                                    img: downloadURL,
                                })
                            });
                        } catch (error) {
                            console.error("Error al obtener la URL de descarga:", error);
                        }
                    }
                );
            } else {
                await updateDoc(chatDocRef, {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: user.uid,
                        date: Timestamp.now(),
                    })
                });
            }

            await updateDoc(userChatsDocRef, {
                [data.chatId + ".lastMessage"]: {
                    text
                },
                [data.chatId + ".date"]: serverTimestamp()
            });

            await updateDoc(recipientUserChatsDocRef, {
                [data.chatId + ".lastMessage"]: {
                    text
                },
                [data.chatId + ".date"]: serverTimestamp()
            });

            // Limpiar inputs
            setText("");
            setImg(null);
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); 
            handleSend();
        }
    };

    return (
        <div className="input-chat">
            <input type="text" placeholder="Escribe algo..." onChange={e => setText(e.target.value)} value={text} onKeyPress={handleKeyPress} />
            <div className="send-chat">
                <img src="" alt="" />
                <input type="file" style={{ display: "none" }} id="file" onChange={e => setImg(e.target.files[0])} />
                <label htmlFor="file" style={{ display: 'flex', gap: '5px', cursor: 'pointer' }}>
                    <AttachFileIcon style={{ height: "24px" }} />
                    <AddPhotoAlternateIcon onClick={() => document.getElementById('file').click()} style={{ transform: "scale(1.2)", height: "24px" }} />
                </label>
                <button style={{ cursor: "pointer", borderRadius: "7px", margin: "0px 10px 0px 10px", width: "80px" }} onClick={handleSend}>Enviar</button>
            </div>
        </div>
    );
};

export default Input;
