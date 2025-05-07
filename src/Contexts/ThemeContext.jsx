import React, { createContext, useState, useContext } from "react";

// Create ThemeContext
export const ThemeContext = createContext();

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = isDarkMode
    ? {
        background: "#1a1a1a",
        color: "#ffffff",
        cardBackground: "#212121",
        borderColor: "#2d2d2d",
        inputBackground: "#333333",
        inputColor: "#ffffff",
        variant: "outline-dark",
      }
    : {
        background: "#f8f9fa",
        color: "#212529",
        cardBackground: "#ffffff",
        borderColor: "#dee2e6",
        inputBackground: "#ffffff",
        inputColor: "#212529",
        variant: "outline-light",
      };

  return (
    <ThemeContext value={{ isDarkMode, setIsDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext>
  );
};
