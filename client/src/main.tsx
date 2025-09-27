// main.jsx

// TODO: Importa React y createRoot desde 'react-dom/client'
// TODO: Importa QueryClient y QueryClientProvider desde '@tanstack/react-query'
// TODO: Importa el componente App
// TODO: Importa los estilos globales (styles.css)

// TODO: Crea una instancia de QueryClient

// TODO: Renderiza la aplicación en el elemento con id 'root'
// - Debe envolver <App /> dentro de <QueryClientProvider client={qc}>


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
