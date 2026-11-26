import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App, { describeRoute } from "./App";


const root = document.getElementById("root");

if (!root) {
  throw new Error("Élément #root introuvable.");
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
if (root.dataset.route === describeRoute(window.location.pathname).key) hydrateRoot(root, app);
else createRoot(root).render(app);
