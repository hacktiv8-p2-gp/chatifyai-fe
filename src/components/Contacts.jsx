import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { getAll } from "../server/FriendServer";
import LoadingSpinner from "./Spinner";

export default function Contacts({ setSelectedRoom }) {
  const axios = useAxios();
  const { theme } = useContext(ThemeContext);

  const { data: friends, isLoading } = useQuery({
    queryFn: () => getAll(axios),
    queryKey: ["contacts"],
    enabled: !!axios,
  });

  return (
    <Card.Body className="p-0">
      <ListGroup variant="flush">
        {isLoading ? (
          <LoadingSpinner />
        ) : friends && friends.length > 0 ? (
          friends.map((friend) => (
            <ListGroup.Item
              key={friend.roomId}
              action
              onClick={() => setSelectedRoom(friend)}
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
                  <span>{friend.friend?.email}</span>
                </div>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <div className="text-center p-3">No contacts found</div> // Tampilkan pesan jika friends kosong
        )}
      </ListGroup>
    </Card.Body>
  );
}
