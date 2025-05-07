import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import ModalAddFriend from "./ModalAddFriend";
import { ThemeContext } from "../Contexts/ThemeContext";
export default function AddFriend() {
  const { theme } = useContext(ThemeContext);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="d-flex justify-content-between align-items-center">
      <h5 className="mb-0">Friends</h5>
      <Button
        variant={theme.variant}
        size="sm"
        style={{
          color: theme.color,
          borderColor: theme.borderColor,
        }}
        onClick={() => setOpenModal(true)}
      >
        <FontAwesomeIcon icon={faUserPlus} className="me-2" />
        Add Friend
      </Button>

      <ModalAddFriend show={openModal} close={() => setOpenModal(false)} />
    </div>
  );
}
