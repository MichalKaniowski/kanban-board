import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { ScreenContextProvider } from "./store/ScreenContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ScreenContextProvider>
      <App />
    </ScreenContextProvider>
  </React.StrictMode>
);
