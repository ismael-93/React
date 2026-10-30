import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import "./Composants/Monstyle.css";
import Parent from "./ContextFin/Parent.jsx";
import { StrictMode } from "react";
import App from "./App.jsx";


createRoot(document.getElementById("root")).render(
    <StrictMode>
    <BrowserRouter>
    <App /> 
    <Parent/> 
    </BrowserRouter>
    </StrictMode>
);
