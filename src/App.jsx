import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/content/Login';
import Register from './components/content/Register';
import ChatHome from './components/content/ChatHome';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import React, { useEffect } from "react";
import { CircularProgress } from '@mui/material';
import ChatPhone from './components/content/chat/ChatPhone';
import Welcome from './components/content/chat/Welcome'


function App() {
  const [user, loading] = useAuthState(auth);
  const [initialLoading, setInitialLoading] = useState(true);

useEffect(() => {
  // Marcar que la carga inicial ha terminado
  setInitialLoading(false);
}, []);

  useEffect(() => {
    if (loading || initialLoading) {
      return;  // Salir si la carga aún no ha terminado
    }
  
    // Ahora puedes realizar acciones adicionales después de la carga
    console.log("Usuario autenticado:", user);
  
    // Marcar que la carga inicial ha terminado
    setInitialLoading(false);
  }, [user, loading, initialLoading]);


  useEffect(() => {
    // console.log("Usuario autenticado:", user);
  }, [user]);

  const ProtectedRoute = ({ children }) => {
    if (loading || initialLoading) {
      return <CircularProgress className='loading-chat' />;
    }

    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const LoginRoute = () => {
    if (user) {
      return <Navigate to="/chat" />;
    } else {
      return <Login />;
    }
  };

  const RegisterRoute = () => {
    if (user) {
      return <Navigate to="/welcome" />;
    } else {
      return <Register />;
    }
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path='welcome' element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
          <Route path="chat" element={<ProtectedRoute><ChatHome /></ProtectedRoute>} />
          <Route path="register" element={<RegisterRoute />} />
          <Route path="login" element={<LoginRoute />} />
          

          <Route path="/chat/:userId" element={<ProtectedRoute><ChatPhone /></ProtectedRoute>} />
          <Route path="*" element={<ProtectedRoute><ChatHome /></ProtectedRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
