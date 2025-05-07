import React, { useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
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
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../Contexts/ThemeContext";
import useAuthStore from "../data/AuthData";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  const { clearUser } = useAuthStore();
  const { toggleTheme, theme, isDarkMode } = useContext(ThemeContext);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");
  const [searchResult, setSearchResult] = useState(null);

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

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  const handleOpenAddFriendModal = () => setShowAddFriendModal(true);
  const handleCloseAddFriendModal = () => {
    setShowAddFriendModal(false);
    setFriendEmail(""); // Reset email input
  };

  const handleSearchFriend = () => {
    // Simulasi pencarian (ganti dengan API call jika diperlukan)
    const dummyUsers = [
      {
        email: "john@example.com",
        name: "John Doe",
        photo: "https://via.placeholder.com/50",
      },
      {
        email: "jane@example.com",
        name: "Jane Smith",
        photo: "https://via.placeholder.com/50",
      },
    ];

    const user = dummyUsers.find((u) => u.email === friendEmail.trim());
    if (user) {
      setSearchResult(user); // Hasil ditemukan
    } else {
      setSearchResult("not-found"); // Tidak ditemukan
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
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Friends</h5>
                <Button
                  variant="outline-light"
                  size="sm"
                  style={{
                    color: theme.color,
                    borderColor: theme.borderColor,
                  }}
                  onClick={handleOpenAddFriendModal}
                >
                  <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                  Add Friend
                </Button>

                <Modal
                  show={showAddFriendModal}
                  onHide={handleCloseAddFriendModal}
                  centered
                >
                  <Modal.Header
                    closeButton
                    style={{
                      backgroundColor: theme.cardBackground,
                      color: theme.color,
                      borderBottom: `1px solid ${theme.borderColor}`,
                    }}
                  >
                    <Modal.Title>Add Friend</Modal.Title>
                  </Modal.Header>
                  <Modal.Body
                    style={{
                      backgroundColor: theme.background,
                      color: theme.color,
                    }}
                  >
                    <div className="d-flex">
                      <input
                        type="email"
                        className="form-control me-2"
                        placeholder="Enter friend's email"
                        value={friendEmail}
                        onChange={(e) => setFriendEmail(e.target.value)}
                        style={{
                          border: `1px solid ${theme.borderColor}`,
                          borderRadius: "4px",
                          padding: "8px 12px",
                          backgroundColor: theme.inputBackground,
                          color: theme.inputColor,
                        }}
                      />
                      <Button
                        variant="primary"
                        onClick={handleSearchFriend}
                        style={{
                          backgroundColor: theme.borderColor,
                          color: theme.color,
                          border: `1px solid ${theme.borderColor}`,
                        }}
                      >
                        Search
                      </Button>
                    </div>
                  </Modal.Body>
                  <Modal.Footer
                    style={{
                      backgroundColor: theme.cardBackground,
                      color: theme.color,
                      borderTop: `1px solid ${theme.borderColor}`,
                      justifyContent: "center", // Untuk memastikan konten berada di tengah
                    }}
                  >
                    {searchResult && (
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          backgroundColor: theme.cardBackground,
                          padding: "10px",
                          borderRadius: "8px",
                          border: `1px solid ${theme.borderColor}`,
                          width: "100%", // Agar konten berada di tengah modal
                          textAlign: "center",
                        }}
                      >
                        {searchResult === "not-found" ? (
                          <div style={{ color: theme.color }}>
                            <FontAwesomeIcon
                              icon={faUser}
                              size="3x"
                              className="mb-3"
                            />
                            <p>User not found</p>
                          </div>
                        ) : (
                          <div className="d-flex align-items-center justify-content-between w-100">
                            <div className="d-flex align-items-center">
                              <img
                                src={searchResult.photo}
                                alt={searchResult.name}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  borderRadius: "50%",
                                  marginRight: "10px",
                                }}
                              />
                              <h5 style={{ margin: 0, color: theme.color }}>
                                {searchResult.name}
                              </h5>
                            </div>
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() =>
                                console.log("Add friend:", searchResult.email)
                              }
                              style={{
                                backgroundColor: "#28a745",
                                border: "none",
                              }}
                            >
                              Add Friend
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </Modal.Footer>
                </Modal>
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
                      backgroundColor: theme.cardBackground,
                      color: theme.color,
                      borderBottom: `1px solid ${theme.borderColor}`,
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
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <span>{friend.name}</span>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

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
