import React, { useState, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { ThemeContext } from "../Contexts/ThemeContext";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { ChatArea } from "../Components/ChatArea";

function Home() {
  const { theme } = useContext(ThemeContext);
  const [selectedFriend, setSelectedFriend] = useState(null);

  return (
    <Container
      fluid
      style={{
        height: "100vh",
        backgroundColor: theme.background,
        color: theme.color,
      }}
    >
      {/* Header with Theme Toggle */}
      <Navbar />

      <Row className="h-100">
        {/* Sidebar */}
        <Sidebar
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
        />
        {/* Chat Area */}
        <ChatArea selectedFriend={selectedFriend} />
      </Row>
    </Container>
  );
}

export default Home;
