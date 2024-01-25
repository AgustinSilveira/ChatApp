import React, { useState } from 'react';
import gif from '../../img/online-video-chat.gif';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setLoading(true);

    // Agregar un retraso de 4 segundos (4000 milisegundos)
    setTimeout(() => {
      // Simular el final del estado de carga
      setLoading(false);

      // Redirigir a la página de chat
      navigate('/chat');
    }, 4000);
  };

  return (
    <div>
      <div className='container-welcome'>
        <div className='welcome-info'>
          <h2>Te doy la bienvenida a la aplicación de chat</h2>
          <div className='container-gif'>
            <img className='gif' src={gif} alt="Chat GIF" />
          </div>
          <p>En esta aplicación vas a poder chatear con otras personas en tiempo real</p>
        </div>
        <div className='container-button'>
          <button onClick={handleButtonClick} disabled={loading}>
            {loading ? <CircularProgress size={20} color="inherit" /> : "Iniciar chat"}
          </button>
        </div>
      </div>
    </div>
  );
}
