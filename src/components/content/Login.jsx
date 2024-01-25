import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config';
import { Link, useNavigate } from "react-router-dom";
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';


const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/chat");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    
    <div className="formContainer">
      
      <div className="formWrapper">
        <SmsOutlinedIcon className="logo-img"/>
        <span className="logo"><strong>Chat</strong>App</span>

        <form onSubmit={handleSubmit} className="form-data">
        
          <input type="email" placeholder="Correo electrónico" />      
          <input type="password" placeholder="Contraseña" />
          
          <p title="En creación">Olvidé mi contraseña</p>
          <button>Iniciar sesión</button>
          
        </form>
        <div className="form-data">
        <Link className="form-data" to={"/register"}><button className="button-link"><p>Regístrate</p></button></Link> 
        </div>
        {error && <span>{error}</span>}

        
      </div>
    </div>
  );
};

export default Login;
