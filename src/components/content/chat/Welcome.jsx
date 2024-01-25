import * as React from 'react';
import gif from '../../img/online-video-chat.gif'



export default function MenuAppBar() {




  return (
  <body>
      <div className='container-welcome'>
      <div className='welcome-info'>
        <h2>Te doy la bienvenida a la aplicación de chat</h2>
        <div className='container-gif'>
        <img className='gif' src={gif}></img>
        </div>
        <p>En esta aplicación vas a poder chatear
          con otras personas en tiempo real
        </p>
      </div>
      <div className='container-button'>
      <a href='/chat'><button>Iniciar chat</button></a>
      </div>
    </div>
  </body>
    
      


 
      
       
    
  );
}
