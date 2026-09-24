import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./AppRoutes.jsx";
import { AuhtProvider } from "./auth/context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuhtProvider>
    <AppRoutes />
  </AuhtProvider>,
);
