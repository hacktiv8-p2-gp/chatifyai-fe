import { faUser, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { ThemeContext } from "../Contexts/ThemeContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { getAll } from "../server/FriendServer";
import LoadingSpinner from "./Spinner";
import { deleteFriend } from "../server/FriendServer"; // Import fungsi deleteFriend
import Swal from "sweetalert2";

export default function Contacts({ setSelectedRoom }) {
  const axios = useAxios();
  const { theme } = useContext(ThemeContext);
  const queryClient = useQueryClient();

  const { data: friends, isLoading } = useQuery({
    queryFn: () => getAll(axios),
    queryKey: ["contacts"],
    enabled: !!axios,
  });

  const mutation = useMutation({
    mutationFn: (friendId) => deleteFriend(axios, friendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });

      setSelectedRoom(null);
    },
  });
  const handleDelete = (friendId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(friendId);
      }
    });
  };

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
              <div className="d-flex align-items-center justify-content-between">
                <div
                  className="d-flex align-items-center"
                  onClick={() => setSelectedRoom(friend)}
                >
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
                  <span>{friend.friend?.email}</span>
                </div>
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ cursor: "pointer", color: theme.color }}
                  onClick={() => handleDelete(friend.roomId)}
                />
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
