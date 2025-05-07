import React, { useState, useContext } from "react";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faPaperPlane,
  faUser,
  faCheck,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../data/AuthData";
import { useNavigate } from "react-router";
import { ThemeContext } from "../Contexts/ThemeContext";
import Contacts from "../components/Contacts";
import AddFriend from "../components/AddFriend";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { getAll } from "../server/ConversationServer";
import LoadingSpinner from "../components/Spinner";

function Home() {
  const navigate = useNavigate();
  const axios = useAxios();
  const { currentUser } = useAuthStore();

  const { theme } = useContext(ThemeContext);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  const { data: messages, isLoading } = useQuery({
    queryFn: () => getAll(axios, selectedRoom?.roomId),
    enabled: !!selectedRoom?.roomId,
  });

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
      <Header />

      <Row className="h-100">
        {/* Sidebar */}
        <Col
          md={4}
          lg={3}
          className="p-0"
          style={{
            height: "100vh",
            borderRight: `1px solid ${theme.borderColor}`,
            backgroundColor: theme.cardBackground,
          }}
        >
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
              <AddFriend />
            </Card.Header>
            <Contacts setSelectedRoom={setSelectedRoom} />
          </Card>
        </Col>

        {/* Chat Area */}
        <Col md={8} lg={9} className="p-0">
          {selectedRoom ? (
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
                  <h5 className="mb-0">{selectedRoom.friend?.email}</h5>
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
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  messages.map(
                    ({ roomId, senderUid, message, createdAt }, id) => (
                      <div
                        key={id}
                        className={`d-flex flex-column ${
                          senderUid === currentUser.uid
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
                              senderUid === currentUser.uid
                                ? "#007bff"
                                : theme.borderColor,
                            color:
                              senderUid === currentUser.uid
                                ? "white"
                                : theme.color,
                            marginLeft:
                              senderUid === currentUser.uid ? "auto" : "0",
                            borderBottomRightRadius:
                              senderUid === currentUser.uid ? "5px" : "15px",
                            borderBottomLeftRadius:
                              senderUid === currentUser.uid ? "15px" : "5px",
                          }}
                        >
                          {message}
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
                          <small>{createdAt}</small>
                        </div>
                      </div>
                    )
                  )
                )}
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
