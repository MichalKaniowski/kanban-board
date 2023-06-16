import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import UserContextProvider from "./store/UserContext.tsx";
import { KanbanContextProvider } from "./store/KanbanContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <KanbanContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </KanbanContextProvider>
  </React.StrictMode>
);
