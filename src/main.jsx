import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./Contexts/ThemeContext.jsx";

import RegisterPage from "./Pages/RegisterPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./Pages/LoginPage.jsx";
import Home from "./Pages/Home.jsx";
import ProtectedPage from "./Pages/ProtectedPage.jsx";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<RegisterPage />} path="/register" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<ProtectedPage />}>
              <Route element={<Home />} path="/" />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
