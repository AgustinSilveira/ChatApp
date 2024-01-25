import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './firebase/config'
import { ChatContextProvider } from './components/content/ChatConext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
 
  <ChatContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ChatContextProvider>
 
)
