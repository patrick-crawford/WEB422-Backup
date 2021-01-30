import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Switch, Redirect } from 'react-router-dom';
import Products from './Products';
import Product from './Product';
import About from './About';
import NotFound from './NotFound';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


function App() {
  return (
    <div>

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

      <br /><br /><br />

      <Container>
        <Row>
          <Col>
            <Switch>
              <Route exact path='/' render={() => (
                <Redirect push to={"/Products"} />
              )} />
              <Route exact path='/Products' render={() => (
                <Products />
              )} />
              <Route path='/Product/:id' render={(props) => (
                <Product id={props.match.params.id} />
              )} />
              <Route exact path='/About' render={() => (
                <About />
              )} />
              <Route render={() => (
                <NotFound />
              )} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
