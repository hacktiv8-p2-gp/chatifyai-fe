import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./Contexts/ThemeContext.jsx";

import RegisterPage from "./Pages/RegisterPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./Pages/LoginPage.jsx";
import Home from "./Pages/Home.jsx";
import Home2 from "./Pages/Home2.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RegisterPage />} path="/register" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<Home />} path="/" />
          <Route element={<Home2 />} path="/2" />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
