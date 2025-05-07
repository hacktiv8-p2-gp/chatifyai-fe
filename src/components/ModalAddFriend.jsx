import { Modal, Button, Form, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { get, request } from "../server/FriendServer";
import useAxios from "../hooks/useAxios";
import LoadingSpinner from "./Spinner";
import { ThemeContext } from "../Contexts/ThemeContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
const schema = z.object({
  email: z.string().email("Invalid email format"),
});

export default function ModalAddFriend({ show, close }) {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const { theme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate: findMutate, isLoading: findLoading } = useMutation({
    mutationFn: (email) => get(axios, email),
    mutationKey: ["findFriend"],
    onSuccess: (data) => {
      setUser(data);
      setError("");
      reset();
    },
    onError: (error) => {
      setError("custom", {
        type: "manual",
        message: error.response?.data?.message || "Internal server error",
      });

      setUser(null);
    },
  });

  const { mutate: requestMutate, isLoading: requestLoading } = useMutation({
    mutationFn: (email) => request(axios, email),
    mutationKey: ["request"],
    onSuccess: (data) => {
      Swal.fire({
        title: "Success!",
        text: "Success add new friend",
        icon: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["contacts"] });

      close();
    },
    onError: (error) => {
      setError("custom", {
        type: "manual",
        message: error.response?.data?.message || "Internal server error",
      });

      setUser(null);
    },
  });

  const isLoading = findLoading || requestLoading;

  useEffect(() => {
    if (!show) {
      setUser(null);
    }
  }, [show]);

  function onSubmit({ email }) {
    findMutate(email);
  }

  return (
    <Modal show={show} onHide={close} centered>
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
        {errors.custom && (
          <Alert variant="danger" className="mb-3">
            {errors.custom.message}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex">
            <input
              type="email"
              className="form-control me-2"
              placeholder="Enter friend's email"
              {...register("email")}
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
              style={{
                backgroundColor: theme.borderColor,
                color: theme.color,
                border: `1px solid ${theme.borderColor}`,
              }}
              type="submit"
            >
              Search
            </Button>
          </div>

          {errors.email && (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
        </form>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: theme.cardBackground,
          color: theme.color,
          borderTop: `1px solid ${theme.borderColor}`,
          justifyContent: "center", // Untuk memastikan konten berada di tengah
        }}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : user ? (
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
              )}

              <h5 style={{ margin: 0, color: theme.color }}>
                {user.displayName || user.email}
              </h5>
            </div>
            <Button
              variant="success"
              size="sm"
              onClick={() => requestMutate(user.email)}
              style={{
                backgroundColor: "#28a745",
                border: "none",
              }}
            >
              Add Friend
            </Button>
          </div>
        ) : (
          <div
            style={{ color: theme.color }}
            className="d-flex align-items-center justify-content-center"
          >
            <FontAwesomeIcon icon={faUser} size="3x" className="mb-3" />
            <p>User not found</p>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
}
