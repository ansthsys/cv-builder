import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
