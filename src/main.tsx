import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AppWrapper from "./root/AppWrapper.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppWrapper>
            <App />
        </AppWrapper>
    </StrictMode>,
);
