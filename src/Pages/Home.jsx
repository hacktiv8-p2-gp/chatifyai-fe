import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faPaperPlane,
  faUser,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import useAuthStore from "../data/AuthData";
import { useNavigate } from "react-router";
import { ThemeContext } from "../Contexts/ThemeContext";
import Contacts from "../components/Contacts";
import AddFriend from "../components/AddFriend";
import Header from "../components/Header";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { getAll } from "../server/ConversationServer";
import Chat from "../components/Chat";
import { io } from "socket.io-client";
import Swal from "sweetalert2";

const baseURL = import.meta.env.VITE_SERVER_BASE_URL;
const socket = io.connect(baseURL);

function Home() {
  const { currentUser } = useAuthStore();
  const queryClient = useQueryClient();
  const axios = useAxios();

  const { theme } = useContext(ThemeContext);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", selectedRoom?.roomId],
    queryFn: () => getAll(axios, selectedRoom?.roomId),
    enabled: !!selectedRoom?.roomId,
  });

  const handleSendMessage = () => {
    socket.emit("send-message", {
      roomId: selectedRoom?.roomId,
      message: messageInput,
    });

    setMessageInput("");
  };

  async function socketFunction() {
    if (!currentUser) return;

    // Set auth token for socket connection
    socket.auth = { token: await currentUser.getIdToken() };
    socket.connect();

    if (selectedRoom?.roomId) {
      socket.emit("join-room", selectedRoom.roomId);
    }

    // Listen for new messages
    socket.on("receive-message", (messageData) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    });

    socket.on("error", (e) => {
      Swal.fire({
        title: "Huh.. Error",
        text: e.name,
      });
    });
  }
  useEffect(() => {
    socketFunction();
  }, [socket, selectedRoom]);

  const handleAnalyzeChat = async () => {
    if (!messageInput.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Input",
        text: "Please type a message before analyzing.",
      });
      return;
    }

    try {
      console.log("This is client side");
      const response = await axios.post("/api/conversations/analyze-chat", {
        message: messageInput,
        roomId: selectedRoom.roomId,
      });

      const replaceInput = response.data.message;
      setMessageInput(replaceInput);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Analysis Failed",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <Container
      fluid
      style={{
        height: "100vh", // Tinggi penuh layar
        display: "flex", // Gunakan flexbox
        flexDirection: "column", // Tata letak vertikal
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
            height: "100%", // Tinggi penuh
            overflowY: "auto", // Scroll jika konten terlalu panjang

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

              <Chat messages={messages} isLoading={isLoading} />

              <Card.Footer
                style={{
                  backgroundColor: theme.borderColor,
                  color: theme.color,
                  position: "sticky", // Tetap terlihat di bagian bawah
                  bottom: 0, // Posisi di bawah
                  zIndex: 10,
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
                  />
                  <Button
                    variant="outline-info"
                    className="ms-2"
                    onClick={handleAnalyzeChat}
                    style={{
                      backgroundColor: theme.buttonBackground,
                      color: theme.buttonColor,
                      border: `1px solid ${theme.borderColor}`,
                    }}
                  >
                    <FontAwesomeIcon icon={faBrain} />
                  </Button>
                  <Button
                    variant="outline-light"
                    className="ms-3"
                    onClick={handleSendMessage}
                    style={{
                      backgroundColor: theme.buttonBackground,
                      color: theme.buttonColor,
                      border: `1px solid ${theme.borderColor}`,
                    }}
                  >
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
