import React, { useContext } from "react";
import { Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faPaperPlane,
  faUser,
  faCheck,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../Contexts/ThemeContext";

export const ChatArea = ({ selectedFriend, messages, messageInput }) => {
  const { theme } = useContext(ThemeContext);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
  return (
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
                      message.sender === "me" ? "#007bff" : theme.borderColor,
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
                      icon={message.status === "read" ? faCheckDouble : faCheck}
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
  );
};
