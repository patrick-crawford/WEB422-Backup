---
title: React Components - Creating a UI
layout: default
---

## Putting it All Together

For this next section, we will be walking through the **[Week 4 Example](https://github.com/sictweb/WEB422/tree/master/Code%20Examples/week4)**.
The following instructions are here to help get us started, as well as to provide guidance for installing dependencies, styles, 3rd party components, routes, etc.

### New App - my-app

To begin, create a new app as usual:

```terminal
npx create-react-app my-app
```

<br>

### Dependencies

Once this is complete, we must change to the newly created "my-app" directory and install the following packages from npm (npm install ...).

* `react-router-dom` - (Enable client-side routing in the browser)

* `react-bootstrap bootstrap` (Include the Bootstrap 4 Components for React &amp; bootstrap)

* `react-router-bootstrap` (Integration between React Bootstrap &amp; React Router v4, primarily the "LinkContainer" Component )

<br>

### CSS

#### App.css

The example does not make use of any of the **App.css** code included with the new app, so we can go ahead and **remove all of the content** included and replace it with the following single entry:

```css
span.navbar-brand:hover{
  cursor: pointer;
}
```

#### index.css

Similarly, we can **wipe out** all CSS in the **index.css** file.  

#### Bootstrap CSS

Lastly, since we're working with  Bootstrap Components for react, we must explicitly import the included CSS in our **App** component:

```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

<br>

### NavBar

The Week 4 example uses the following navbar consisting of the custom components installed using npm (above).  This navbar is placed above the (soon to be added) &lt;Switch&gt;&lt;/Switch&gt; element in *App.js*

```jsx
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
```

<br>

### Container, Routes & Components

All routes in the example code are defined using a &lt;Switch&gt;&lt;/Switch&gt; element in *App.js*.  Immediately surrounding this component (below the Navbar), we need to add the bootstrap "Container", "Row" and "Col" components, ie:

```jsx
<Container>
  <Row>
    <Col>
      <Switch>
        ...
      </Switch>
    </Col>
  </Row>
</Container>
```

#### Routes & Components

The example uses 4 components: 

* **&lt;Products /&gt;**: Renders a collection of elements in a table, where each row is a link to a specific element 

* **&lt;Product /&gt;**: Renders the details of a specific element

* **&lt;About /&gt;**: Simple component that renders [Lorem Ipsum](https://www.lipsum.com/) Text

* **&lt;NotFound /&gt;**: Renders a "Not Found" message as well as a link that redirects the user back to the "/" route

They can be accessed using the routes:

* "/" - Redirects to **"/Products"**

* "/Products" - Renders **&lt;Products /&gt;**

* "/Product/:id "- Renders **&lt;Product /&gt;**

* "/About" - Renders **&lt;About /&gt;**

* "(Not Found)" - Renders **&lt;NotFound /&gt;**

<br>

### Data Source

Finally, the data source used in the example is provided by [reqres.in](https://reqres.in/).  Specifically, it's the routes:

* GET [https://reqres.in/api/unknown](https://reqres.in/api/unknown) - for a list of products ("data")
* GET [https://reqres.in/api/unknown/n](https://reqres.in/api/unknown/n) - for a single product ("data") where "n" is the "id" value. 

<!-- TODO: Here is a good spot to mention SWR https://swr.vercel.app/ - a "hooks library for data fetching" - it can be a part of a very short "Fetch" review -->





