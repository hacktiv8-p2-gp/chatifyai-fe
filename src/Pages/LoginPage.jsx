import React from "react";
import { Container, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "../data/AuthData";
import { LoginForm } from "../Components/LoginForm";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
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

      console.log(await user.getIdToken());
      setCurrentUser(user);
    } catch (e) {
      console.log(e);
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
      console.log(await user.getIdToken());
      setCurrentUser(user);
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
          <LoginForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            handleGoogleSignIn={handleGoogleSignIn}
            handleGithubSignIn={handleGithubSignIn}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}
