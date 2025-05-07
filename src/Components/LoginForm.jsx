import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

export const LoginForm = ({
  register,
  handleSubmit,
  onSubmit,
  handleGoogleSignIn,
  handleGithubSignIn,
  errors,
  isSubmitting,
}) => {
  return (
    <>
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
    </>
  );
};
