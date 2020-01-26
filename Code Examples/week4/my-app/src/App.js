import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import Product from './Product';
import NotFound from './NotFound';

import { LinkContainer } from "react-router-bootstrap";

import {Navbar, Nav, NavItem} from 'react-bootstrap';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { routeStr: "" };
  }

  render() {

    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
          <LinkContainer to="/">
            <Navbar.Brand>
            WEB422 - Routing
            </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>

            <LinkContainer to="/Products">
              <NavItem eventKey={1}>Products</NavItem>
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

}

export default App;
