import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./design.css";
import "./visual-impact.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Élément #root introuvable.");
}

hydrateRoot(root,
  <StrictMode>
    <App />
  </StrictMode>,
);
