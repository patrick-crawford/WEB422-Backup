import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Navigate, Route, Routes } from 'react-router-dom';
import Products from './Products';
import Product from './Product';
import About from './About';
import Notfound from './NotFound';


function App() {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>WEB422 - React Routing</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/products">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <Container>
        <Row>
          <Col>
            <Routes>
              <Route path="/" element={<Navigate to="/products" />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
