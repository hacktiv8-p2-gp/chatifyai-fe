import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router";

export const RegisterForm = ({
  handleSubmit,
  onSubmit,
  isSubmitting,
  register,
  errors,
}) => {
  return (
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
          <Form.Text className="text-danger">{errors.email.message}</Form.Text>
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
  );
};
