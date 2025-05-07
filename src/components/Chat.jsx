import { Card } from "react-bootstrap";
import { useContext } from "react";
import LoadingSpinner from "./Spinner";
import useAuthStore from "../data/AuthData";
import { ThemeContext } from "../Contexts/ThemeContext";
import moment from "moment/moment";

export default function Chat({ messages, isLoading }) {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useAuthStore();

  return (
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
      ) : Array.isArray(messages) ? (
        messages.map(({ senderUid, message, createdAt }, id) => (
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
                  senderUid === currentUser.uid ? "#007bff" : theme.borderColor,
                color: senderUid === currentUser.uid ? "white" : theme.color,
                marginLeft: senderUid === currentUser.uid ? "auto" : "0",
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
              <small>{moment(createdAt).format("HH:mm • DD/MM/YYYY")}</small>
            </div>
          </div>
        ))
      ) : (
        ""
      )}
    </Card.Body>
  );
}
