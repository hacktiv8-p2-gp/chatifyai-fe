import React, { useContext, useState } from "react";
import { Col, ListGroup, Card } from "react-bootstrap";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../Contexts/ThemeContext";
import { AddFriend } from "../Components/AddFriend";

export const Sidebar = ({ selectedFriend, setSelectedFriend }) => {
  const { theme } = useContext(ThemeContext);

  const friends = [
    { id: 1, name: "John Doe", status: "online" },
    { id: 2, name: "Jane Smith", status: "offline" },
  ];

  return (
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
  );
};
