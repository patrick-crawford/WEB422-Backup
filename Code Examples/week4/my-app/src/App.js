import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Products from './Products';
import Product from './Product';
import About from './About';
import NotFound from './NotFound';
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem } from 'react-bootstrap';

function App() {
  return (
    <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <LinkContainer to="/">
            <Navbar.Brand>
              WEB422 - React Routing
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/Products">
              <NavItem eventKey={1}>Products</NavItem>
            </LinkContainer>
            <LinkContainer to="/About">
              <NavItem eventKey={2}>About</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
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
              <Route exact path='/about' render={(props) => (
                <About />
              )} />
              <Route render={() => (
                <NotFound />
              )} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
