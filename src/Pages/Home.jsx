import React, { useState, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { ThemeContext } from "../Contexts/ThemeContext";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import { ChatArea } from "../Components/ChatArea";

function Home() {
  const { theme } = useContext(ThemeContext);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey, how are you?",
      sender: "me",
      timestamp: "10:00 AM",
      status: "read",
    },
    {
      id: 2,
      text: "I'm good, thanks! How about you?",
      sender: "friend",
      timestamp: "10:01 AM",
    },
    {
      id: 3,
      text: "Great! Want to grab coffee later?",
      sender: "me",
      timestamp: "10:02 AM",
      status: "sent",
    },
    {
      id: 4,
      text: "Sure, that sounds good!",
      sender: "friend",
      timestamp: "10:03 AM",
    },
  ]);

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
        <ChatArea
          selectedFriend={selectedFriend}
          messages={messages}
          messageInput={messageInput}
        />
      </Row>
    </Container>
  );
}

export default Home;
