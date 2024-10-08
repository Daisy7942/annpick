import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/globals.css";
import App from "./App";
import reportWebVitals from "./configs/reportWebVitals";
import { AnimeProvider } from "./contexts/AnimeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AnimeProvider>
    <App />
  </AnimeProvider>
);

reportWebVitals();
