import React, { useState } from 'react';
import { Container, Form, Button, Navbar, Toast, ToastContainer } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const validCredentials = [{
    email: 'Vikas.kumar@guardiansgroup.in',
    password: 'aaro7guardians7#',
  },
  {
    email: 'saharafms@gmail.com',
    password: 'aaro7sahara7#',
  },
  {
    email: 'cvrbenarjee@gmail.com',
    password: 'aaro7ajanta7#',
  },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidUser = validCredentials.some(
      (user) => user.email === email && user.password === password
    );

    if (isValidUser) {
      navigate('/onboarding');
    } else {
      setShowToast(true); // Show error toast
    }
  };

  return (
    <div style={{  minHeight: '100vh' }}>
      <Container className="text-center my-4">
              <h1 className="fw-bold" style={{ color: '#167C80' }}>
                Aaro7 
              </h1>
      </Container>
      <Container className="my-5 p-4 rounded shadow-sm" style={{ backgroundColor: '#E6f1f2', maxWidth: '500px' }}>
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

          {/* <div className="text-center mb-2">
            <a href="#" className="text-muted" style={{ fontSize: '0.9rem' }}>
              Forgot password?
            </a>
          </div>

          <div className="text-center">
            <span className="text-muted" style={{ fontSize: '0.9rem' }}>
              Don’t have an account?
            </span>
          </div> */}
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
