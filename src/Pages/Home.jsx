import React, { useState, useContext } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faPaperPlane,
  faUser,
  faCheck,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../Contexts/ThemeContext";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";

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

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: messageInput,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "sent",
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
        <Col md={8} lg={9} className="p-0">
          {selectedFriend ? (
            <Card
              className="h-100 border-0"
              style={{
                height: "100vh",
                backgroundColor: theme.cardBackground,
              }}
            >
              <Card.Header
                style={{
                  backgroundColor: theme.borderColor,
                  color: theme.color,
                }}
              >
                <div className="d-flex align-items-center">
                  <span
                    style={{
                      backgroundColor: theme.borderColor,
                      color: theme.color,
                      padding: "8px",
                      borderRadius: "50%",
                      marginRight: "10px",
                    }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                  <h5 className="mb-0">{selectedFriend.name}</h5>
                </div>
              </Card.Header>
              <Card.Body
                style={{
                  height: "calc(100vh - 120px)",
                  overflowY: "auto",
                  backgroundColor: theme.cardBackground,
                  padding: "20px",
                }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`d-flex flex-column ${
                      message.sender === "me"
                        ? "align-items-end"
                        : "align-items-start"
                    }`}
                  >
                    <div
                      style={{
                        maxWidth: "70%",
                        padding: "10px 15px",
                        borderRadius: "15px",
                        marginBottom: "5px",
                        wordBreak: "break-word",
                        backgroundColor:
                          message.sender === "me"
                            ? "#007bff"
                            : theme.borderColor,
                        color: message.sender === "me" ? "white" : theme.color,
                        marginLeft: message.sender === "me" ? "auto" : "0",
                        borderBottomRightRadius:
                          message.sender === "me" ? "5px" : "15px",
                        borderBottomLeftRadius:
                          message.sender === "me" ? "15px" : "5px",
                      }}
                    >
                      {message.text}
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{
                        fontSize: "0.75rem",
                        color: "#adb5bd",
                        marginTop: "2px",
                        marginBottom: "10px",
                      }}
                    >
                      <small>{message.timestamp}</small>
                      {message.sender === "me" && (
                        <FontAwesomeIcon
                          icon={
                            message.status === "read" ? faCheckDouble : faCheck
                          }
                          style={{
                            fontSize: "0.8rem",
                            marginLeft: "5px",
                            color: "#adb5bd",
                          }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </Card.Body>
              <Card.Footer
                style={{
                  backgroundColor: theme.borderColor,
                  color: theme.color,
                }}
              >
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Type a message..."
                    style={{
                      border: `1px solid ${theme.borderColor}`,
                      borderRadius: "4px",
                      padding: "8px 12px",
                      backgroundColor: theme.inputBackground,
                      color: theme.inputColor,
                    }}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <Button variant="outline-light" onClick={handleSendMessage}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          ) : (
            <div
              className="h-100 d-flex align-items-center justify-content-center"
              style={{
                color: theme.color,
              }}
            >
              <FontAwesomeIcon icon={faComments} className="me-2" />
              Select a friend to start chatting
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
