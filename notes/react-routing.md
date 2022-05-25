---
title: React routing
layout: default
---

## "Routing" in React

One of the key components in creating a SPA (Single Page Application) is Routing.  When Routing is implemented using a framework like React, we will find that we can browse different URL's within our app without actually reloading the page.  In this case, the components of one URL are swapped out for the components of another, giving the illusion that we're navigating through multiple pages, when we're really just adding / removing components based on the browser URL / history.  Our user interface is in-sync with the URL.

The most widely-used routing library used to achieve this in React is: [**React Router**](https://reactrouter.com/):

> Components are the heart of React's powerful, declarative programming model. React Router is a collection of navigational components that compose declaratively with your application. Whether you want to have bookmarkable URLs for your web app or a composable way to navigate in React Native, React Router works wherever React is rendering.

<br>

### Getting Started using React Router

To start using the React Router library in our web app, we must first fetch react-router-dom using npm (once we have halted our debugging server using Control+C):

```
npm install react-router-dom
```

Now, let's say that we have 3 top-level components that represent 3 separate views, ie: **Home**, **Projects** and **Project**:

```jsx
function Home(){
  return <h1>Home Page</h1>
}

function Projects(){
  return <h1>All Projects Page</h1>
}

function Project(){
  return <h1>Specific Project Page</h1>
}
```

**Quick Note:** Each of these components (views) currently only renders an `<h1>` element, however in a real application they would be defined in separate files and contain many child components.

If we wish to conditionally render each of the above components (views) based on the following routes:

* "/" renders &lt;Home /&gt;
* "/projects" renders &lt;Projects /&gt;
* "/project" renders &lt;Project /&gt;

We need to modify our App.js file as well as our index.js file.

<br>

### index.js changes

* "import" the `<BrowserRouter>` Component using `import { BrowserRouter } from 'react-router-dom'`
* Update the root.render() method to wrap the `<App />` component in a `<BrowserRouter>` component:

  ```jsx
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  ```

FYI, if you have to work with old obsolete legacy browser versions: The above code specifies the type of router that we will be using in our `<App />` component.  This could be either [&lt;BrowserRouter&gt;](https://reactrouter.com/docs/en/v6/api#browserrouter) or [&lt;HashRouter&gt;](https://reactrouter.com/docs/en/v6/api#hashrouter). The Hash Router technique is generally used to support legacy browsers and React "strongly recommend(s) you do not use HashRouter unless you absolutely have to."

<br>

### App.js changes

Import the `<Route>` and `<Routes>` components:  
```js
import { Route, Routes } from 'react-router-dom';
```

Import the `<Home>`, `<Projects>`, `<Project>` components:
```js
import Home from './Home';
import Projects from './Projects';
import Project from './Project';
```

Update the return value of the "App" function to use the following JSX:

```jsx
<Routes>
  <Route path='/' element={<Home />} />
  <Route path='/Projects' element={<Projects />} />
  <Route path='/Project' element={<Project />} />
</Routes>
```
  
Here, we can define our routes explicitly using the **"Routes"** component with our three nested **"Route"** components.  Each of the routes have a "path" property which we use to define the target route and an "element" property that we use to define the component (see: [&lt;Routes&gt; &amp; &lt;Route&gt; ](https://reactrouter.com/docs/en/v6/api#routes-and-route)). 

**NOTE:** Components will only be added or removed as children of the &lt;Routes&gt;&lt;/Routes&gt; component, so if we wish to have parts of the UI that are consistent across all routes, we can place JSX *above* or *below* it, for example:

```jsx
<header>Header</header>

<Routes>
  <Route path='/' element={<Home />} />
  <Route path='/Projects' element={<Projects />} />
  <Route path='/Project' element={<Project />} />
</Routes>

<footer>Footer</footer>
```

<br>

### Adding URL Parameters to our Routes

If we wish to pass a specific URL parameter to a given route, we can use the same syntax as we're accustomed to in Node.js, ie: "/routeName/:parameter". To read the ":parameter" in the `<Project />` component (so we can make use of routes like "/project/4", etc), we need to make the following changes to our files: 

* Update the "Project" `<Route>` component:

  ```jsx
  <Route path='/Project/:id' element={<Project />} />
  ```
* Update the `Project.js` file:
  
  To read the value of the "id" route parameter, we need to make a few changes to our "Project" component, ie:

  * Add the ["useParams" Hook](https://reactrouter.com/docs/en/v6/api#useparams): 
    
    ```jsx
    import { useParams } from 'react-router-dom';
    ```
  * Inside your Component function, add the below code to reference the "id" route parameter using the hook: 

    ```jsx
    let { id } = useParams();
    ```
  * Update your "return" statement to render the id: 

    ```jsx
    <h1>Project { id }</h1>
    ```
  
Once we have made the above changes (pulled the parameter using useParams hook, etc.), we can now render routes that look like "/Project/9" or "/Project/abc" and see the results reflected in the browser.

<br>

### Adding Query Parameters to our Routes

If we wish to obtain the query parameters for a specific route, the process is very similar, however the ability to actually parse the value(s) is absent from React Router so we require one extra step (below).  To get started:

  * Add the ["useLocation" Hook](https://reactrouter.com/docs/en/v6/api#uselocation):
   
    ```jsx
    import { useLocation } from 'react-router-dom';
    ```

  * Inside your Component function, add the below code to reference the route "location" using the hook: 

    ```jsx
    let location = useLocation();
    ```
  * Update your "return" statement to render the raw query: 

    ```jsx
    <h1>Project query { location.search }</h1>
    ```

This will give us the full query string (using "location.search"). However, if we wish to parse the string and access individual parameters, we will need to make use of the native [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams), ie:

```jsx
const urlParams = new URLSearchParams(location.search);
```

The 'urlParams' object can now be used to fetch individual query params, ie:

```jsx
let page = urlParams.get("page"); // get the value of the "page" query parameter (NOTE: returns null if "page" was not found in the query string)
```

<br>

### Adding A "Not Found" Route

Using React Router, we can easily define a "Not Found" route - this is analogous to the "404" error that we returned in our server.js files in WEB322 when a route was not matched.

To add a "Not Found" route, we simply need to add another route as a child to our `<Routes>` component defined in App.js.  This route will simply match the path "*", ie:

```jsx
<Route path="*" element={<Notfound />} />
```

<br>

### Linking to a Route

To use the react router effectively, we cannot simply use normal links to route to our pages from within the application. For example, using code like: 

```html
<a href="/myRoute">My Route</a>
```
would lead to a whole page reload (we only want to load the full app at the beginning, not after every route change).  Instead, what we need to do is use the `<Link>` component (from "react-router-dom"), to prevent this from happening.  

The same code can updated to use the `<Link>` component as follows:

```html
<Link to='/myRoute'>My Route</Link>
```

<br>

### "Redirecting" to a Route

Sometimes, we wish to "redirect" the user to a different route and override the current route in the "history" stack (or alternatively "push" it onto the current history stack) - this is similar to what we would use **res.redirect()** for in our Node.js servers.

React provides an intuitive way to achieve this, by providing a special [&lt;Navigate /&gt;](https://reactrouter.com/docs/en/v6/api#navigate) component.  When rendered, it will redirect the client to the specified route using the following syntax:

```jsx
<Navigate to="/newRoute" />
```

Additionally, we have the ability to *programmatically* change routes from within our code (for example, when an event occurs).  This can be accomplished using the [useNavigate hook](https://reactrouter.com/docs/en/v6/api#usenavigate) from 'react-router-dom':

```jsx
import { useNavigate } from "react-router-dom";

function HomeButton() {
  const navigate = useNavigate()

  function handleClick() {
    navigate("/home");
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
```

<br>