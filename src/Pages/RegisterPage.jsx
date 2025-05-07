import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../data/AuthData";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterForm } from "../Components/RegisterForm";

const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser, setCurrentUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit({ email, password }) {
    try {
      const { user } = await registerUser(email, password);

      setCurrentUser(user);
    } catch (e) {
      if (e.message === "Firebase: Error (auth/email-already-in-use).") {
        return setError("email", {
          type: "manual",
          message: "Email already exists",
        });
      }

      setError("email", {
        type: "manual",
        message: "Internal server error.",
      });
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center mt-5"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Register</Card.Title>

          <RegisterForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            register={register}
            errors={errors}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}
