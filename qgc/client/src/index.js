import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { SocketContext, socket } from "./context/socket";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <DarkModeContextProvider>
    <AuthContextProvider>
      <SocketContext.Provider value={socket}>
        <App />
      </SocketContext.Provider>
    </AuthContextProvider>
  </DarkModeContextProvider>
  // </React.StrictMode>
);
