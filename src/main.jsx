import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/Routes.jsx'
import { ApolloProvider } from '@apollo/client'
import { Client } from './apollo/client.js'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={Client}>
      <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
        <Router/>
      </BrowserRouter>
    </ApolloProvider>

  </StrictMode>,
)
