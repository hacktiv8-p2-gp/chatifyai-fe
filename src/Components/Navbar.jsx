import React, { useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { faSun, faMoon, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useNavigate } from "react-router";
import useAuthStore from "../data/AuthData";

export const Navbar = () => {
  const navigate = useNavigate();

  const { clearUser } = useAuthStore();
  const { toggleTheme, theme, isDarkMode } = useContext(ThemeContext);

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  return (
    <Row
      style={{
        backgroundColor: theme.cardBackground,
        padding: "10px 20px",
        borderBottom: `1px solid ${theme.borderColor}`,
      }}
      className="align-items-center"
    >
      <Col>
        <h4 style={{ margin: 0, color: theme.color }}>Chatify</h4>
      </Col>
      <Col className="text-end">
        <Button
          onClick={toggleTheme}
          style={{
            backgroundColor: theme.cardBackground,
            border: `1px solid ${theme.borderColor}`,
            color: theme.color,
            borderRadius: "50%",
            padding: "10px",
            width: "40px",
            height: "40px",
          }}
        >
          <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
        </Button>

        <Button
          onClick={handleLogout}
          style={{
            backgroundColor: theme.cardBackground,
            border: `1px solid ${theme.borderColor}`,
            color: theme.color,
            borderRadius: "50%",
            padding: "10px",
            width: "40px",
            height: "40px",
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </Button>
      </Col>
    </Row>
  );
};
