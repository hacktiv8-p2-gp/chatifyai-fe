import React from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "../data/AuthData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loginGoogle, loginGithub, setCurrentUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit({ email, password }) {
    try {
      const { user } = await login(email, password);

      setCurrentUser(user);

      navigate("/");
    } catch (e) {
      if (e.message === "Firebase: Error (auth/invalid-credential).") {
        return setError("email", {
          type: "manual",
          message: "Invalid email or password",
        });
      }
      setError("email", {
        type: "manual",
        message: "Internal server error.",
      });
    }
  }

  async function handleGoogleSignIn() {
    try {
      const { user } = await loginGoogle();

      setCurrentUser(user);

      navigate("/");
    } catch (e) {
      setError("custom", {
        type: "manual",
        message: "Internal server error.",
      });
    }
  }

  async function handleGithubSignIn() {
    try {
      const { user } = await loginGithub();

      setCurrentUser(user);

      navigate("/");
    } catch (e) {
      if (
        e.message ===
        "Firebase: Error (auth/account-exists-with-different-credential)."
      ) {
        return setError("custom", {
          type: "manual",
          message: "Account exists with different credentials.",
        });
      }

      setError("custom", {
        type: "manual",
        message: "Internal server error.",
      });
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>

          {errors.custom && (
            <Alert variant="danger" className="mb-3">
              {errors.custom.message}
            </Alert>
          )}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                disabled={isSubmitting}
                {...register("email")}
              />
              {errors.email && (
                <Form.Text className="text-danger">
                  {errors.email.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                disabled={isSubmitting}
                {...register("password")}
              />
              {errors.password && (
                <Form.Text className="text-danger">
                  {errors.password.message}
                </Form.Text>
              )}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-3"
              disabled={isSubmitting}
            >
              Login
            </Button>

            <div className="text-center mb-3">or</div>

            <Button
              variant="danger"
              className="w-100 mb-2"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
            >
              <FontAwesomeIcon icon={faGoogle} className="me-2" />
              Sign in with Google
            </Button>
            <Button
              variant="dark"
              className="w-100 mb-3"
              disabled={isSubmitting}
              onClick={handleGithubSignIn}
            >
              <FontAwesomeIcon icon={faGithub} className="me-2" />
              Sign in with GitHub
            </Button>

            <div className="text-center">
              Don't have an account? <Link to="/register">Register here</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
