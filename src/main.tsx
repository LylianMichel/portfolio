import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import "./os/os.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Élément #root introuvable.");
}

hydrateRoot(root,
  <StrictMode>
    <App />
  </StrictMode>,
);
