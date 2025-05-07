import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./Home.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./Pages/LoginPage.jsx";
import Home from "./Home.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<Home />} path="/" />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
