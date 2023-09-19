import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { Store, persistor } from './Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const GoogleClientId = import.meta.env.VITE_GAUTHKEY;
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={ GoogleClientId }>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <App/>
        </QueryClientProvider>
      </React.StrictMode>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
)
