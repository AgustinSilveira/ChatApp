import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css';
import './mapa.css';
import CustomIconImage from '../../../../public/ubicacion-img.png'

// Definir tu icono personalizado
const customIcon = new L.Icon({
  iconUrl: CustomIconImage,
  iconSize: [27, 27],
  iconAnchor: [14, 0],
});

const Mapa = () => {
  const [userLocation, setUserLocation] = useState(null); // Estado para la ubicación del usuario
  const [locations, setLocations] = useState([]); // Estado para almacenar ubicaciones compartidas
  const [fechaPublicacion, setFechaPublicacion] = useState(null); // Estado para la fecha de publicación

  useEffect(() => {
    obtenerUbicacionUsuario(); // Llama a la función para obtener la ubicación del usuario al cargar el componente
  }, []);

  const obtenerUbicacionUsuario = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]); // Almacena la ubicación del usuario

          // Calcula la fecha de publicación (diferencia entre la fecha actual y la fecha de publicación)
          const fechaActual = new Date();
          const fechaPublicacion = new Date(); // Reemplaza con la fecha de publicación real
          const diffMs = fechaActual - fechaPublicacion;
          const diffMinutes = Math.floor(diffMs / (60 * 1000)); // 60,000 ms en un minuto
          const diffHours = Math.floor(diffMinutes / 60); // 60 minutos en una hora
          const diffDays = Math.floor(diffHours / 24); // 24 horas en un día

          if (diffDays > 0) {
            setFechaPublicacion(`hace ${diffDays} día(s)`);
          } else if (diffHours > 0) {
            setFechaPublicacion(`hace ${diffHours} hora(s)`);
          } else if (diffMinutes > 0) {
            setFechaPublicacion(`hace ${diffMinutes} minuto(s)`);
          } else {
            setFechaPublicacion('hace unos segundos');
          }
        },
        (error) => {
          console.error('Error al obtener la ubicación: ' + error.message);
        }
      );
    } else {
      alert('La geolocalización no está disponible en este navegador.');
    }
  };

  const agregarUbicacion = () => {
    if (userLocation) {
      setLocations([...locations, userLocation]); // Agrega la ubicación actual al array de ubicaciones compartidas
    }
  };

  return (
    <div>
      <MapContainer
        className="mapa"
        center={[-34.8244, -55.9877]}
        zoom={12}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location, index) => (
          <Marker key={index} position={location} icon={customIcon}>
            <Popup>
              <div className='content-ubicacion'>
                <img id='content-img' src="../../../../public/imgUbicacion.jpeg" alt="imagen sacada por el usuario" />
                <h4>Descripción del animal:</h4>
                <p>perra encontrada es re insoportable</p>
                <p className='time-shared'>Fecha de publicacion: <br /> {fechaPublicacion}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div id='container-button'>
        <div id='button-ubicacion' onClick={agregarUbicacion}>
          <img id='ubicacion-img' src="../../../public/icon-ubicacion.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Mapa;
