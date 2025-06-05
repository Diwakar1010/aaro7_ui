import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Header = () => {
  return (
    <Container  className="d-flex justify-content-center align-items-center my-2">
        <Navbar.Brand href="/">
          <img
            src="/Aaro7 New Logo.png"
            alt="Logo"
            style={{ width: '150px' }}
          />
        </Navbar.Brand>
        {/* <Container className="text-center my-4">
              <h1 className="fw-bold" style={{ color: '#167C80' }}>
                Aaro7 
              </h1>
      </Container> */}
      </Container>

  );
};

export default Header;
