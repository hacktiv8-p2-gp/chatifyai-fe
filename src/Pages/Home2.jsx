import React, { useState, useContext } from "react";
import { Container, Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faComments,
  faPaperPlane,
  faCircle,
  faUser,
  faCheck,
  faCheckDouble,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../Contexts/ThemeContext";

function Home() {
  const { toggleTheme, theme, isDarkMode } = useContext(ThemeContext);
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

  const friends = [
    { id: 1, name: "John Doe", status: "online" },
    { id: 2, name: "Jane Smith", status: "offline" },
  ];

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
        backgroundColor: "#1a1a1a",
      }}
    >
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
        </Col>
      </Row>

      <Row className="h-100">
        <Col
          md={4}
          lg={3}
          className="p-0"
          style={{
            height: "100vh",
            borderRight: "1px solid #2d2d2d",
            backgroundColor: "#212121",
          }}
        >
          <Card
            className="h-100 border-0"
            style={{
              height: "100vh",
              backgroundColor: "#212121",
            }}
          >
            <Card.Header
              style={{
                backgroundColor: "#2d2d2d",
                color: "#ffffff",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 text-light">Friends</h5>
                <Button variant="outline-light" size="sm">
                  <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                  Add Friend
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                {friends.map((friend) => (
                  <ListGroup.Item
                    key={friend.id}
                    action
                    active={selectedFriend?.id === friend.id}
                    onClick={() => setSelectedFriend(friend)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#212121",
                      color: "#ffffff",
                      borderBottom: "1px solid #2d2d2d",
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <span
                        style={{
                          backgroundColor: "#404040",
                          color: "#ffffff",
                          padding: "8px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      >
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <span>{friend.name}</span>
                        <FontAwesomeIcon
                          icon={faCircle}
                          style={{
                            fontSize: "0.6rem",
                            color:
                              friend.status === "online"
                                ? "#28a745"
                                : "#6c757d",
                          }}
                        />
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8} lg={9} className="p-0">
          {selectedFriend ? (
            <Card
              className="h-100 border-0"
              style={{
                height: "100vh",
                backgroundColor: "#212121",
              }}
            >
              <Card.Header
                style={{
                  backgroundColor: "#2d2d2d",
                  color: "#ffffff",
                }}
              >
                <div className="d-flex align-items-center">
                  <span
                    style={{
                      backgroundColor: "#404040",
                      color: "#ffffff",
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
                  backgroundColor: "#212121",
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
                          message.sender === "me" ? "#007bff" : "#404040",
                        color: message.sender === "me" ? "white" : "#ffffff",
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
                  backgroundColor: "#2d2d2d",
                  color: "#ffffff",
                }}
              >
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Type a message..."
                    style={{
                      border: "1px solid #2d2d2d",
                      borderRadius: "4px",
                      padding: "8px 12px",
                      backgroundColor: "#333333",
                      color: "#ffffff",
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
                color: "#adb5bd",
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
