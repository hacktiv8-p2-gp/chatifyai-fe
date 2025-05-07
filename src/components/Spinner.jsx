import { Spinner, Container } from "react-bootstrap";

const LoadingSpinner = () => {
  return (
    <Container
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner
        animation="border"
        style={{
          width: "4rem",
          height: "4rem",
          borderWidth: "0.25em",
          animation: "spin 1s linear infinite",
          color: "#0d6efd",
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default LoadingSpinner;
