import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../Contexts/ThemeContext";

export const AddFriend = () => {
  const { theme } = useContext(ThemeContext);

  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [friendEmail, setFriendEmail] = useState("");
  const [searchResult, setSearchResult] = useState(null);

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

  const handleOpenAddFriendModal = () => setShowAddFriendModal(true);
  const handleCloseAddFriendModal = () => {
    setShowAddFriendModal(false);
    setFriendEmail(""); // Reset email input
  };

  return (
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
                  <FontAwesomeIcon icon={faUser} size="3x" className="mb-3" />
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
  );
};
