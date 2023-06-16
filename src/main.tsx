import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './contexts/auth'
import Routas from './Routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <Routas />
    </AuthProvider>
  </React.StrictMode>,
)

