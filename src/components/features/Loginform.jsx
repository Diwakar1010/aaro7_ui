import React, { useState } from 'react';
import { Container, Form, Button, Navbar, Toast, ToastContainer } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const validCredentials = {
    email: 'admin@example.com',
    password: 'password123',
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === validCredentials.email && password === validCredentials.password) {
      navigate('/onboarding');
    } else {
      setShowToast(true); // Show error toast
    }
  };

  return (
    <div style={{ backgroundColor: '#E6f1f2', minHeight: '100vh' }}>
      <Navbar bg="light" className="border-bottom">
        <Container>
          <Navbar.Brand className="fw-bold">Aaro7</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="my-5 p-4 rounded shadow-sm" style={{ backgroundColor: '#ffffff', maxWidth: '500px' }}>
        <h4 className="fw-semibold text-start mb-4" style={{ color: '#167C80' }}>Sign In</h4>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 text-start" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4 text-start" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-grid mb-3">
            <Button
              type="submit"
              style={{ backgroundColor: '#0f6b61', borderColor: '#0f6b61' }}
            >
              Sign In
            </Button>
          </div>

          <div className="text-center mb-2">
            <a href="#" className="text-muted" style={{ fontSize: '0.9rem' }}>
              Forgot password?
            </a>
          </div>

          <div className="text-center">
            <span className="text-muted" style={{ fontSize: '0.9rem' }}>
              Don’t have an account?
            </span>
          </div>
        </Form>
      </Container>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast bg="danger" show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Authentication Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Invalid email or password.</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default LoginForm;
