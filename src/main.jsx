import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { Store, persistor } from './Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { GoogleOAuthProvider } from '@react-oauth/google';
const GoogleClientId = import.meta.env.VITE_GAUTHKEY;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={ GoogleClientId }>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
)
