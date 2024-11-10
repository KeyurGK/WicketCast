import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext.jsx";
import Weather from "./modals/Weather.jsx";
import { Analytics } from "@vercel/analytics/react"
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Analytics>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={googleClientId}>
        <AuthProvider>
          <App />
          {/* <Weather/> */}
        </AuthProvider>
      </GoogleOAuthProvider>
      </BrowserRouter>
      </Analytics>
  </StrictMode>
);
