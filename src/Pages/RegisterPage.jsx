import React, { useEffect } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../data/AuthData";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

      navigate("/");
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

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                disabled={isSubmitting}
                required
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
                name="password"
                placeholder="Password"
                required
                disabled={isSubmitting}
                {...register("password")}
              />

              {errors.password && (
                <Form.Text className="text-danger">
                  {errors.password.message}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                disabled={isSubmitting}
                {...register("confirmPassword")}
              />

              {errors.confirmPassword && (
                <Form.Text className="text-danger">
                  {errors.confirmPassword.message}
                </Form.Text>
              )}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-3"
              disabled={isSubmitting}
            >
              Register
            </Button>

            <div className="text-center">
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
