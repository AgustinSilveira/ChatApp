import React, { useState, useEffect } from "react";
import user from "../img/user.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../../firebase/config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom"
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import CircularProgress from '@mui/material/CircularProgress';


const Register = () => {
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fileInput = document.getElementById("file");

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        // Mostrar la imagen previamente seleccionada antes de enviar el formulario
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    });

    return () => {
      fileInput.removeEventListener("change", () => { });
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
  
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      const storageRef = ref(storage, `user-profiles/${userCredential.user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on('state_changed', null, async (error) => {
        setLoading(false);
        setError(error.message);
      }, async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
          await updateProfile(userCredential.user, {
            displayName,
            photoURL: downloadURL,
          });
  
          console.log('User after profile update:', auth.currentUser);
  
          await setDoc(doc(db, "users", userCredential.user.uid), {
            uid: userCredential.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });
  
          console.log('User document in Firestore:', userCredential.user.uid);
  
          // Crear el documento userChats
          await setDoc(doc(db, "userChats", userCredential.user.uid), {});
  
          // Guardar en localStorage
          localStorage.setItem("loggedIn", "true");
  
          navigate("/welcome");
        } catch (error) {
          console.error("Error al registrar usuario:", error);
          setLoading(false);
          setError(error.message);
        }
      });
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
      
        <SmsOutlinedIcon id="logo-container-img" className="logo-img"/>
        <span className="logo logo-container">Chat app</span>
        
        

        <form onSubmit={handleSubmit} className="form-data">
          <input type="text" name="displayName" placeholder="Nombre de usuario" autoComplete="username" />
          <input type="email" name="email" placeholder="Correo electrónico" autoComplete="email" />
          <input type="password" name="password" placeholder="Contraseña" autoComplete="current-password" />
          <input name="file" style={{ display: "none" }} type="file" id="file" />
          <span className="user-span">Ingresa una foto de perfil</span>
          <label className="content-user-button" htmlFor="file">
            {imageUrl ? (
              <img className="user-button" src={imageUrl} alt="imagen de usuario" />
            ) : (
              <img className="user-button" src={user} alt="imagen de usuario" />
            )}
          </label>

          <button type="submit" disabled={loading}>
            {loading ? <CircularProgress size={20} color="inherit" /> : "Registrarse"}
          </button>

          {error && <span>{error}</span>}
        </form>
        <p className="register-question">Tienes una cuenta? <Link className="register-question2" to={"/login"}>inicia sesión</Link></p>
      </div>
    </div>
  );
};

export default Register;
