// main.jsx

// TODO: Importa React y createRoot desde 'react-dom/client'
// TODO: Importa QueryClient y QueryClientProvider desde '@tanstack/react-query'
// TODO: Importa el componente App
// TODO: Importa los estilos globales (styles.css)

// TODO: Crea una instancia de QueryClient

// TODO: Renderiza la aplicación en el elemento con id 'root'
// - Debe envolver <App /> dentro de <QueryClientProvider client={qc}>

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ModalProvider } from "./context/modal.context.tsx";
import { AxiosInterceptor } from "./interceptor/api.interceptor.ts";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilitiesConfiguration } from "./utils/index.ts";

AxiosInterceptor();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SnackbarProvider>
      <SnackbarUtilitiesConfiguration />
      <ModalProvider>
        <App />
      </ModalProvider>
    </SnackbarProvider>
  </StrictMode>
);
