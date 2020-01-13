# "Bridge Vue" in React

This week we'll rewrite our previous [Bridge Vue](https://github.com/sictweb/web422/tree/master/Code%20Examples/week4/bridge-vue#bridge-vue) web app for visualizing
Ontario bridge data in React.  In do doing, we'll learn about differences between Vue and
React, work with more third-party libraries, and use the [create-react-app](https://facebook.github.io/create-react-app/) tool to setup our app.

> NOTE: if you haven't already built or read the code for [Bridge Vue](https://github.com/sictweb/web422/tree/master/Code%20Examples/week4/bridge-vue#bridge-vue)
> you should begin there.  This walkthrough is focused on discussing differences between
> the Vue implementation and how to write the same in React.  Not all aspects of the app
> are discussed in the same depth here.

Once again, the data we'll use is based on a freely available dataset on [bridges in the province](https://www.ontario.ca/data/bridge-conditions), from the Government of Ontario.  We'll
use this data under the [Open Government Licence - Ontario](https://www.ontario.ca/page/open-government-licence-ontario).  You can read more about the data and API
we'll be using at in the [Project Data](https://github.com/sictweb/web422/tree/master/Code%20Examples/week4/bridge-vue#project-data) section of the previous walkthrough.

Our goal will be to create an app like the following, but with React instead of Vue:

![Screencast of final app](screenshots/bridge-vue.gif)

## Project Creation with create-react-app

We'll use the [create-react-app](https://facebook.github.io/create-react-app/) tool to create our app.

> NOTE: this folder already contains a pre-created React app, using the steps discussed here.
> You can use it, or make your own.  If you're using the pre-built version in this
> repo, you should install all dependencies using `npm install` and skip this section.

We can create an "empty" React app [using the following commands](https://facebook.github.io/create-react-app/docs/getting-started):

```
npx create-react-app bridge-react
cd bridge-react
npm start
```

This will create the `bridge-react/` directory, download and install all necessary
dependencies, and build our code.  A web server will be started at http://localhost:3000/.
We can leave this running the entire time we work, and every time we save a change,
the server will automatically update what's in our browser.

> NOTE: React projects often reference the [`yarn` command](https://yarnpkg.com), which is a drop-in
> replacement of `npm`.  Using either is fine, and we'll generally use `npm` below.

## Project Layout

Our project is broken up into the following files and directories (see
a [full discussion of this layout in the docs](https://facebook.github.io/create-react-app/docs/folder-structure)):

```
/bridge-react
    /public
        favicon.ico      <-- our project's icon
        index.html       <-- main html file
    /src
        components/      <-- our custom React components go here
        App.js           <-- our application's main component
        App.css          <-- styles for our application's main component
        index.css        <-- general styles for the page as a whole
        index.js         <-- our project's entry point (main JavaScript file)
```

### `public/index.html`

Let's start with our main HTML page, which can be very simple: just enough
to host our React application and components.  Our React app will get *mounted*
into the `<main id="root"></div>` element:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Ontario Bridges</title>
  </head>
  <body>
    <main id="root"></main>
  </body>
</html>
```

One notable thing here is the use of `<%PUBLIC_URL/favicon.ico%>` for the favicon path.  This project uses [webpack](https://webpack.js.org/) to build and bundle our code.  The
use of `<%PUBLIC_URL...%>` tells webpack to substitute the value of `PUBLIC_URL`
when building.  You can [read more about why we use this here](https://facebook.github.io/create-react-app/docs/using-the-public-folder#adding-assets-outside-of-the-module-system).

Finally, notice how there is no JavaScript here at all.  When webpack builds our
code, it will inject it automatically for us.

### `src/index.js`

Next we look at our application's main entry point, `src/index.js`:

```js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import './index.css';

ReactDOM.render(<App />, document.querySelector('#root'));
```

Our project `import`s both `React` and `ReactDOM`.  We need both to work with
the core React library (`React`), and also to interact with the browser's DOM (`ReactDOM`).
We also import our main `App.js` component, which we'll use below to `render()` our app.

Next we ask `ReactDOM` to [`render()`](https://reactjs.org/docs/react-dom.html#render) our
main `< App />` React component into the `#root` element in the DOM.  The syntax
here is new, in that we're using XML syntax within JavaScript (i.e., `<App />` vs.
`"<App />"` as a string).  React uses [JavaScriptXML (JSX)](https://reactjs.org/docs/introducing-jsx.html) syntax for defining our elements and components.  We'll look at this more below.

React will take over the `#root` DOM element's contents, and instead render our app.
From this point forward, React will control the contents of this portion of our page, updating it as necessary in response to changes in our data.

Finally, we should also say something about `index.css`.  On line 5 we are importing
a CSS stylesheet.  This may seem odd, since we're in a JavaScript file,
and importing CSS doesn't fit with what we know about `import`.  However, we're
leveraging [webpack's asset loading for CSS](https://facebook.github.io/create-react-app/docs/adding-a-stylesheet).

Our `index.css` stylesheet contains a few general styles for aspects of our app
outside the control of our components, specifically:

```css
html,
body,
main {
  height: 100%;
  max-height: 100%;
  font-family: Helvetica, Arial, sans-serif;
  margin: 0;
}

main {
  display: flex;
  flex-direction: column;
}
```

### `src/App.js`

The bulk of our code begins in our `App.js` component.  Here we define the top-level
layout of our application, and its main logic.  We could put everything here; that is,
we could include all JS, CSS, and HTML for all aspects of our page in this one file.
However, we'll break it up (decompose it) into a set of components, each of which
will manage different parts of the page. 

Here's what it looks like at first:

```js
import React from 'react';

import './App.css';

function App() {
  return (
    <div id="app">
      <nav id="menu">
        Menu goes here...
      </nav>

      <div id="bridge-info">
        Bridge info goes here
      </div>
    </div>
  );
}

export default App;
```

Our `App.js` component defines the top-level UI by defining a [React Component](https://reactjs.org/docs/components-and-props.html) `function` that returns a single [React Element](https://reactjs.org/docs/rendering-elements.html) (`#app`), containing two children: a `#menu` and some `#bridge-info`.

We should also say something about the `import React from 'react';` line that
appears at the top of every file containing JSX syntax.
Whenever we are defining a React component, or using React elements in our code,
we always need to include `React` in the same scope.  In the code above,
the use of `React` is implicit, and we never actually use `React`, so why bother including it?

The browser doesn't understand JSX syntax, only pure JavaScript.  Before any JSX can
be run, it therefore needs to get transformed into JavaScript by our build system,
in this case using the [Babel JavaScript compiler](https://babeljs.io/).  Babel takes JSX code that looks like this:

```jsx
const elem = <h1 id="welcome">Hello world</h1>
```

And compiles it into JavaScript like this:

```js
const elem = React.createElement('h1', { id: 'welcome' }, 'Hello world');
```

A [React element](https://reactjs.org/docs/rendering-elements.html), which we're
defining above for our `<h1>`, is defined using
[`React.createElement()`](https://reactjs.org/docs/react-api.html#createelement).
As such, when we write JSX we're really (and eventually) writing a JavaScript
expression that returns the result of `React.createElement()`.  We could, in fact,
write all of our code using `React.createElement()`.  Doing so would be correct but
also repetitive, and somewhat tedious.  Writing in an HTML style feels much closer
to the mental model of what we're doing, so why not do that instead?

We can now answer our original question, namely, why bother including `React` if we don't
use it.  The answer is that JSX *always* requires `React.createElement()`, which means
that `React` must be available in the same scope as our JSX.  In all of our files
below that make use of JSX, we'll begin with `import React from 'react'`.

> NOTE: in Vue we actually did a very similar thing, writing our code as
> [Single File Vue](https://vuejs.org/v2/guide/single-file-components.html) components
> with a `.vue` extension.  The browser doesn't understand `.vue` files, and these
> have to get compiled into JavaScript code.  Both React and Vue are leveraging
> custom syntax and a build step involving Babel to try and improve the developer
> experience of developing in a component-based framework.

#### CSS Style

Above we also included some CSS for our `App` component by importing `App.css`.
In `App.css` we are defining our UI's layout and general styles.  We need our React app
to fill the window (i.e., 100% `width` and `height`, no `margin`).  We also
need to divide the window into one thirds: one-third for the menu, two-thirds
for the bridge info pane.

```css
#app {
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

#menu {
  flex: 1;
  overflow: auto;
  height: 100%;
}

#bridge-info {
  flex: 2;
  height: 100%;
}

@media screen and (max-width: 400px) {
  #app {
    flex-direction: column;
  }
}
```

[Just as we did in our Vue version](https://github.com/sictweb/web422/tree/master/Code%20Examples/week4/bridge-vue#css-style), we are once again using a [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) derived layout, with
two vertical columns that make use of the entire viewport.

When we worked with Vue, we had the option of putting our CSS in a `<style>`
block, and optionally adding the [`scoped` keyword](https://vue-loader.vuejs.org/guide/scoped-css.html), to make sure that none of a component's styles leaked into the DOM.  Doing so caused Vue to automatically namespace all of our CSS.  React and webpack provide a similar mechanism via [CSS Modules](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet). There are also a number of [other options for adding styles in React](https://reactjs.org/docs/faq-styling.html).

### `src/bridges.js`

In our previous Vue app, we wrote an ES Module to interact with our API, and download
bridge data, called `bridges.js`.  One of the reasons we broke this out into its own
module vs. doing everything in our Vue components was that it made the code more reusable.
Vue and React are both JavaScript frameworks, and as such, both can use any JS modules
we need, whether we write them, or include them from npm.

> TIP: whenever you work on front-end code, try to separate as much of the framework
> code from your general/logic code so that changing frameworks in the future is easier.

As a result, our React app can reuse `bridges.js` to handle our data loading, allowing
us to focus on what's different in the UI vs. data logic layer.  As a reminder, 
here's the code:

```js
// Convert characters like ' to HTML entities using
// https://github.com/mathiasbynens/he#heencodetext-options
import { encode } from 'he';

const bridgeUrl = 'https://api.myjson.com/bins/17fpo0';

export default function() {
  return fetch(bridgeUrl)
    .then(response => {
      // If we don't get a 200 OK response, throw an error to the .catch()
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // Parse the response body from JSON to JS (an Array) 
      return response.json();
    })
    .then(bridges => {
      // Encode and normalize (uppercase) all bridge names
      bridges.forEach(bridge => {
        // Bridge name in uppercase, not encoded
        bridge.name = bridge.name.toUpperCase();
        // Bridge name uppercase and encoded (suitable for HTML display)
        bridge.nameEncoded = encode(bridge.name)
      });

      return bridges;
    });
    // NOTE: we aren't going to deal with errors here, caller must .catch()
}
```

Once again, because we're importing `encode` from the [`he` package](https://www.npmjs.com/package/he), we first need to include it as a dependency:

```
npm install --save he
```

### Menu Components

Next let's build the components to manage our sidebar menu of bridge items:

1. `BridgeMenu` will be the entire menu
1. `MenuItem` will be a single item in our menu

Create the following new files:

- `src/components/BridgeMenu.js`
- `src/components/MenuItem.js`
- `src/components/MenuItem.css`

We'll begin with the `MenuItem` component.

![Menu demo](screenshots/menu-item.gif)

#### `src/components/MenuItem.js`

Each of our `MenuItem`s is basically a `<div>` with some special styling, and
event handling.  Because each `MenuItem` is so simple, we once again use
a React function component (i.e., vs. a class):

```js
import React from 'react';
import './MenuItem.css'

export default function(props) {
  return (
    <div
      className="menu-item"
      title={props.bridge.name}
      onClick={props.onClick}
    >
      {props.bridge.nameEncoded}
    </div>
  );
}
```

We define our `<div>` and specify four things:

1. `className="menu-item"`, which will define a class name of `menu-item`.  React uses the JS-style [`className` over `class`](https://reactjs.org/docs/dom-elements.html#classname).
1. `title={props.bridge.name}`, which will bind the bridge's name to the [`title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title).  We'll discuss `props` more below.
1. `onClick={props.onClick}`, which tells React to register an event listener for our `<div>`'s `click` event, and use the function passed to us via `props.onClick` as the callback.
1. `{props.bridge.nameEncoded}`, which will include our bridge's HTML-friendly name in our  content.

Our `MenuItem` is basic.  It `export`s a `Function` that accepts [`props`](https://reactjs.org/docs/components-and-props.html) from its parent, in this case a `bridge` `Object`. In Vue we used `props` over `data`, since the `MenuItem` didn't manage
its own `bridge`, but simply used the one passed to it.

The only thing different about how we're using `props` in React is that we're not
only receiving our `bridge`, but also an `onClick` event handler `function`.  In Vue
we defined a `method` (i.e., a `function`) for our component, `handleClick`, and
used it to [`emit` a custom event](https://vuejs.org/v2/guide/components-custom-events.html) named `'click'` (we could have called it anything).  In React we've moved this code
to the parent component, and in `MenuItem` simply use the event handler for `click`
that is passed to us on `props.onClick`.

> TIP: in Vue, you listen for events on DOM elements using `v-on`, and then `$emit()`
> your own events.  In React, we use an `onEvent` style prop (e.g., `onClick`, `onChange`, etc)
> passed down from a parent component.  The effect is the same: in both
> cases the component will trigger some function in the parent, but the registration
> pattern is different.

Our `MenuItem`'s CSS is imported from `MenuItem.css`, and looks like this:

```css
.menu-item {
  background-color: #0b3954;
  color: #b5bec6;
  cursor: pointer;
  padding: 8px;
  /* Place a transparent border on all elements, so they don't change width on hover */
  border-left: 3px solid transparent;

  /* Instead of wrapping or cropping, show ... if the name is too long */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.menu-item:hover {
  color: #C7DBE6;
  border-left: 3px solid #bfb1c1;
}
```

The CSS is nearly identical to [our Vue code](https://github.com/sictweb/web422/tree/master/Code%20Examples/week4/bridge-vue#srccomponentsmenuitemvue), with the exception
that we haven't used `scoped` here, and instead use classnames.  As discussed above,
we could also switch to using a [CSS Module](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet) here if we desired the same ability to
write namespaced CSS.

#### `src/components/BridgeMenu.js` 

Having defined a component for each bridge menu item, let's next create the
parent component to manage them all. Create a new file, `src/components/BridgeMenu.js`:

```js
import React from 'react';

import MenuItem from './MenuItem.js'
import getBridgeData from '../bridges.js';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errored: false,
      bridges: []
    };
  }

  componentDidMount() {
    // We're about to start loading our data, set this in our state.
    this.setState({ loading: true });

    // Use our bridge.js function to talk to the REST API.
    getBridgeData()
      .then(bridges => this.setState({ loading: false, bridges }))
      .catch(err => {
        console.error('Unable to load bridge data', err.message);
        this.setState({ errored: true });
      });
  }

  render() {
    // Are we in an error state? If so show an error message.
    if(this.state.errored) {
      return (
        <div>
          <p>Error: unable to load bridge data</p>
        </div>
      );
    }

    // If we aren't in error state, are we in a loading state?
    if(this.state.loading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    // Show our bridges in a menu, with 1 MenuItem per bridge
    return this.state.bridges.map(bridge =>
      <MenuItem
        key={bridge.id}
        bridge={bridge}
        onClick={e => this.props.onChange(bridge)}
      />
    );
  }
}
```

First, just as we did in Vue, we `import` two of the files we made previously: our `bridges.js` file, which will load our data; and `MenuItem.js`, which will manage each menu item.

However there are enough new ideas in this code, that it's worth discussing them separately.

##### Extending `React.Component`

We've moved from using a `function` to a `class` for defining our component.
Recall that in Vue, our `BridgeMenu` included its own `data`, specifically, `boolean`
flags for `loading` and `errored`, and also an `Array` of bridges.

When a Vue component needs to manage its own data, instead of (or in addition to) using
`props`, we define a `function` named `data` that returns an `Object` with our
component's internal state.  Before we look at React, pay attention to what we just
said: in Vue, `data` is a `function` that returns an `Object` with our component's internal state.

In React we leverage the [JavaScript `class`](https://googlechrome.github.io/samples/classes-es6/), and write our component in an Object Oriented style.  The main reason
we do this is so that we can define *instance* data within a *constructor* `function`.
Said another way, data in React is defined as an `Object` called `state` in a *constructor* `function`.  Because of this, each instance of a React component can maintain its own state.

Our `BridgeMenu` component is a `class` that builds on `React.Component`, adding and altering
a few things we need.  In the constructor, we need to accept `props` and pass them
to our super class' constructor (i.e., to `React.Component`), where they'll be
attached to the instance (i.e., available as `this.props`).

##### Using `state` and `setState()`

Next we define our `state`, and attach it to the instance, declaring an `Object`
with properties for our loading status (`loading`, `errored`), and also define
a `bridges` `Array`, which is initially empty, but will soon hold our dataset.

Loading our data happens in much the same way that it did in Vue.  Recall that
our Vue code used the [`created` lifecycle hook](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks) to trigger the call to `getBridgeData()`.
In React we do exactly the same thing, defining an implementation for the
[`componentDidMount` lifecycle hook](https://reactjs.org/docs/react-component.html#componentdidmount).

We're also augmenting the call to `getBridgeData()` with `loading` and `errored`
state changes.  However, unlike Vue, our component's internal state data needs
to be managed manually.  In Vue, our `data` was automatically, and invisibly, wrapped
with getter and setter functions via Vue's [reactivity system](https://vuejs.org/v2/guide/instance.html#Data-and-Methods): any change to our `data` (e.g., `this.data.name = newValue`)
would be seen by Vue as a change to our component's state, and any updates to
the virtual DOM, computed values, watchers, etc would happen automatically.  Vue
takes responsibility for our data, allowing us to "use" it as if it was any
other regular JavaScript `Object`.

React does the same thing, but removes some of the automation.  As with Vue, our
internal state (React calls it `state` instead of `data` to be more explicit) dictates
what should happen in the UI: changes in state needs to trigger updates, re-rendering
of components, etc.  We can access state values using `this.state.name`, but React
asks that we not update them directly in this way.  Instead, we are asked to use a
method of our class, [`setState()`](https://reactjs.org/docs/react-component.html#setstate).

Initially we define our state in the constructor as a regular `Object`.  When we
need to update one or more of our state properties, we use `setState()`, for example:

```js
this.setState({ loading: true });
...
this.setState({
  loading: false,
  bridges: bridges // we could also use the shorthand `bridges` 
})
```

Our call to `setState()` takes an `Object` with one or more properties that need
to be updated.  We can update any or all of the properties on our `state`.  We don't
*have* to provide a value for all of them, however.  If we omit any, they will remain
the same.  React will maintain an **immutable** `Object` for our `state`, and if
anything needs to change due to a call to `setState()`, a new `Object` will be created.
Our `state`'s individual properties won't change.

The call to `this.setState()` is a request to have React update our component's
state--it will happen, eventually.  It won't necessarily happen immediately when
we call it.  Based on the request to `setState()`, React knows that part of our
component needs to update, and potentially other children, which are relying on this
state.  As such, the call to `setState()` will (eventually) trigger a re-rendering
of our component, in order for the UI in the DOM to properly reflect the new internal
state of our component's data.

##### Defining a `render()` function

Let's discuss why we've changed our view code into a `render()` method.  Our earlier `function` components simply returned a React element.  In
our `class` component, we need to do the same, but we do it by providing an implementation
for the `render()` method.

Our `render()` function has three possible branches, defining three separate UI states.
In Vue we expressed this with nested directives (`v-if`, `v-else`) to
[conditionally render portions](https://vuejs.org/v2/guide/conditional.html) of our template.
We essentially do the same in React, but instead use JavaScript branching directly.
Depending on our component's `state`, we'll either render an error UI, a loading spinner, or
if all goes well our entire bridge menu.

The code to create this menu has also changed.  In Vue we used [`v-for` and `:key` to loop through our data](https://vuejs.org/v2/guide/list.html) and create each `MenuItem`.
In React our loop has been expressed using [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
We take an `Array` of bridge `Objects`, and *map* this to an `Array` of React `<MenuItem>`
components.  Just as we did with Vue, we define a unique `key` for each sibling in
our list.

> NOTE: our `render()` method needs to return something to be rendered in the
> virtual DOM.  This can be `null` or `false`, if there's nothing to render.
> Or it can be a React element or component, possibly with many children.
> It can also be an `Array`, as we've done just now.  See the full
> [docs for `render()`](https://reactjs.org/docs/react-component.html#render) for other possible return types.

##### Defining event handlers

There's one final piece of this code worth calling out, and that is how we're
dealing with the `click` event on our `<MenuItem>`s.

Recall that in Vue we used `@click="bridgeSelected"`, which registered an event
listener for the `click` event emitted by the `MenuItem` component.  When a
`MenuItem` was clicked, it would `$emit()` a `click` event, and pass the `bridge`
that was clicked as its only argument.

In our React component we are doing something similar, but flattening the event/handler
paradigm into JavaScript functions passed on `props`.  In React if a parent component
is interested in doing something in response to an event in a child, it needs to pass
a function with the correct signature down to the child via `props`.  We name
these `props` functions using the `onEventName` naming convention, for example: `onClick`.

Looking at our code above, we see the following:

```jsx
<MenuItem onClick={e => this.props.onChange(bridge) ...>
```

This says, "when the `MenuItem`'s `click` event happens, call the following
function."  What we pass to `onClick` needs to be a function--here we use
an arrow function.  In it, we are calling yet another function, which was passed
into our component via `props` named `onChange`.  It expects to receive a `bridge`
as its only argument, so we pass that.  Just as we did with Vue, we're taking
a DOM `click` event, wrapping it, and exposing a `change` event with a `bridge`.
This allows us to start building an abstraction for our bridge menu that focuses
on bridges vs. `<div>`s, and let's our application work at a higher level than the DOM. 

### Using the Menu Components

Now that our menu components are defined, let's use them in `App.js`.  We need
to make a few tweaks to our code:

```js
import React from 'react';

import './App.css';

import BridgeMenu from './components/BridgeMenu.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bridge: null
    };
  }

  handleBridgeChange(bridge) {
    this.setState({ bridge });
  }

  render() {
    return (
      <div id="app">
        <nav id="menu">
          <BridgeMenu onChange={this.handleBridgeChange.bind(this)} />
        </nav>

        <div id="bridge-info">
          Bridge info goes here...
        </div>
      </div>
    );
  }
}

export default App;
```

First, the structure of our `App` has changed from being a `function` to using a
`class`.  We're doing this because we need to start keeping track of some `state`, namely,
the currently selected `bridge`.  In our `constructor` we initially specify that no
`bridge` is selected.

Our `App`'s elements are largely how they were before, but now live in a `render()`
method.  We've also imported our `BridgeMenu.js` component, and started using it as `<BridgeMenu />`.

The third change involves passing an event handler function to our `BridgeMenu` for
the `change` event.  We saw the other side of this in our `BridgeMenu.js` implementation
above.  We said there that we'd received a function to use via `props`, and here
we see it being passed as such.

The definition of the function requires some explanation.  It's pretty clear that
we've added a `handleBridgeChange` method to our `class`, and that when it gets
called, it uses the `bridge` passed to it to update (i.e., `setState()`) our component's
state.  The way that we define it is different, though:

```jsx
onChange={this.handleBridgeChange.bind(this)}
```

There's some inherent complexity in using JavaScript's `this` keyword, and the
way that functions work.  Our code above is essentially saying: "take the function
named `handleBridgeChange` on the current instance and pass it down via `props`."
When we do this we are, in essence, pulling the function off of `this` and passing
it as a `function` on its own; that is, we lose the attachment we had to `this`.  Later, when
we want to call `this.setState()`, the value of `this` will have changed.  To solve this,
we need to explicitly [`bind()` our function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) to `this` so that it retains this attachment.
The `.bind()` method is built into JavaScript functions, and returns a `function` that is
*binds* `this` to the `Object` you pass it as the argument to `.bind()`.  Passing this
new *bound* function is safe, because it carries with it an attachment to the component's
instance, and calls to `this.setState()` will do the right thing. 

> NOTE: when you need to use `this` to refer to the component instance in an
> event handler, you should call `.bind(this)` on your function.  If you don't
> need to access `this` in the event handler function, it's fine to omit this step.

### Bridge Info Components

Now that we've got a working menu for all our bridges, and a way for the user
to select one, let's write some components to visually *display* this bridge.
Recall the shape of our bridge data, as it exists in the `bridges` `Array`:

```js
{
  id: 0,
  name: "Highway 24 Underpass at Highway 403",
  nameEncoded: "Highway 24 Underpass at Highway 403",
  lat: 43.167233,
  lng: -80.275567,
  year: 1965,
  length: 65,
  width: 25.4
}
```

Because we've got geographic coordinates for every bridge, it would be nice to
show it on a map.  The rest of the data is pretty basic, and we can probably
just use text.  The only other interesting data point we could calculate and show
is the age of the bridge, since we know the `year` it was built.

Let's break our `#bridge-info` container into two parts:

1. a map, showing the location of the bridge and its name
1. an info panel of text, only shown when we choose a bridge

Let's create a `BridgeInfo.vue` component to manage all that.

#### `src/components/BridgeInfo.js` and `src/components/BridgeInfo.css`

Create a new file, `src/components/BridgeInfo.js`:

```jsx
import React from 'react';

import './BridgeInfo.css';

function InfoPanel(props) {
  const bridge = props.bridge;
  // Compute the age of the bridge in years
  const age = (new Date()).getFullYear() - bridge.year;

  return (
    <div id="info-panel">
      <h2>{bridge.nameEncoded}</h2>

      <div className="bridge-stats">
        <div>Year: {bridge.year} ({age} years)</div>
        <div>Width: {bridge.width}m</div>
        <div>Length: {bridge.length}m</div>
      </div>
    </div>
  );
}

/**
 * We may or may not have a bridge passed to us via props.
 * If we do, render an info panel across the top.  If we don't
 * render nothing (null), allowing the initial map of Ontario
 * to take over the entire right-hand space. 
 */
function BridgeInfo(props) {
  const infoPanel = props.bridge ? <InfoPanel bridge={props.bridge} /> : null;

  return (
    <div id="bridge-info-wrapper">
      {infoPanel}

      <div id="leaflet-map">
        Map will goe here...
      </div>
    </div>
  );
}

export default BridgeInfo;
```

We're actually going to define two components here, but only publicly `export`
one.  The `BridgeInfo` component will contain both an `InfoPanel` (defined here),
and an as yet undefined map component.

In Vue we achieved this layout using a `v-if` directive to conditionally render
parts of our template.  In our React version, we're doing the same, but using
JavaScript to decide between using an `<InfoPanel />` or `null`, depending on
whether or not we're passed a `bridge` on `props`. 

Our `computed` property `age` from Vue has been transformed into a simple
variable declaration, which gets (re)calculated whenever we render our component.
React doesn't have, or need, a formal mechanism for defining reactive data, since
we can do it explicitly in our JavaScript.

Our `src/components/BridgeInfo.css` file contains our styles:

```css
#bridge-info-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#leaflet-map {
  flex: 5;
  height: 100%;
  width: 100%;
}

#info-panel {
  flex: 1;
  height: 100%;
  width: 100%;

  background-color: #A6CC8B;
  color: #686950;
  border-bottom: solid 2px #686950;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}

#info-panel h2 {
  margin: .5em;
}

.bridge-stats {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-size: 1.3em;
}
```

These are the [same as our styles were in the `BridgeInfo.vue` code](https://github.com/sictweb/web422/tree/master/Code%20Examples/week4/bridge-vue#srccomponentsbridgeinfovue),
if you'd like to remind yourself what they mean.

#### Using BridgeInfo

Before we tackle the map, let's update `App` to use this new component
in its current form.  To do so, we need to make some changes in `App.js`:

```jsx
import React from 'react';

import './App.css';

import BridgeMenu from './components/BridgeMenu.js';
import BridgeInfo from './components/BridgeInfo.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bridge: null
    };
  }

  handleBridgeChange(bridge) {
    this.setState({ bridge });
  }

  render() {
    return (
      <div id="app">
        <nav id="menu">
          <BridgeMenu onChange={this.handleBridgeChange.bind(this)} />
        </nav>

        <div id="bridge-info">
          <BridgeInfo bridge={this.state.bridge} />
        </div>
      </div>
    );
  }
}

export default App;
```

We've imported our `BridgeInfo.js` component, and started using it as `<BridgeInfo />`
in our JSX.  We're also passing the currently selected `bridge` (if any) as a `prop`
to our component.  Here we combine the use of `props` and `state` to allow a parent
component to share its data with a child.

But that's it!  Everything should work now: select a bridge from the menu,
get the info panel showing for the bridge.

The only thing remaining is to add our map.

#### Map Components: `src/components/LeafletMap.js` and `src/components/LeafletMap.css`

To draw our map, we'll once again use the [Leaflet JavaScript library](https://leafletjs.com/),
but for something different this time, let's use a [third-party Leaflet component for React](https://react-leaflet.js.org/) instead of manually creating our own from scratch.  Using [React-Leaflet](https://react-leaflet.js.org/en/), we can go from pure Leaflet-JavaScript code like this...

```js
import L from 'leaflet'

const position = [51.505, -0.09]
const map = L.map('map').setView(position, 13)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map)

L.marker(position)
  .addTo(map)
  .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
```

...to React code like this:

```jsx
import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const position = [51.505, -0.09]
const map = (
  <Map center={position} zoom={13}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Marker position={position}>
      <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
    </Marker>
  </Map>
)
```

> NOTE: we could have done the same with Vue using a component like
> [Vue2Leaflet](https://korigan.github.io/Vue2Leaflet/#/).  There's nothing
> unique about React with respect to using third-party components.

```
npm install --save leaflet react-leaflet
```

Now that we have both Leaflet and React Leaflet installed, we can start creating
our map in `src/components/LeafletMap.js`:

```jsx
import React from 'react';
import { Map, Popup, TileLayer } from 'react-leaflet';

// Import the CSS for Leaflet itself from node_modules/
import '../../node_modules/leaflet/dist/leaflet.css';
import './LeafletMap.css';

function Tiles() {
  return (
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
  );
}

function OntarioMap() {
  // General location/zoom to see all of Ontario
  const ontario = {
    coords: [51.2538, -85.3232],
    zoom: 5
  };

  return (
    <Map className="full-height" center={ontario.coords} zoom={ontario.zoom}>
      <Tiles />
    </Map>
  );
}

/**
 * Render a Leaflet Map. If we're given a bridge object via props,
 * use that, otherwise show a map of Ontario.
 */
function LeafletMap(props) {
  const bridge = props.bridge;

  if(!bridge) {
    return <OntarioMap />
  }

  const coords = [bridge.lat, bridge.lng];
  // By default, zoom the map to this level
  const defaultZoom = 14;

  return (
    <Map className="full-height" center={coords} zoom={defaultZoom}>
      <Tiles />
      <Popup position={coords}>
        {bridge.nameEncoded}
      </Popup>
    </Map>
  );
}

export default LeafletMap;
```

Previously we defined our own [`simple-map.js`](https://github.com/sictweb/web422/tree/master/Code%20Examples/week4/bridge-vue#srcsimple-mapjs) to create and control a Leaflet
map and popup.  Here, we're delegating this responsibility to the React components
[`<Map />`](https://react-leaflet.js.org/docs/en/components.html#map),
[`<Popup />`](https://react-leaflet.js.org/docs/en/components.html#popup), and
[`<TileLayer />`](https://react-leaflet.js.org/docs/en/components.html#tilelayer).
What's nice about these is that we can use them like any other HTML element, without
having to write custom logic to manage my map.  Before we can use them, however,
they have to be imported.  We also need to `import` the CSS styles for Leaflet.

Skipping down to the declaration of `LeafletMap`, we either want to render a map of Ontario,
or a map of the `bridge` specified on `props`.  To simplify this, we've created some
small React Component functions.  First, an `<OntarioMap />`, which does exactly
what you'd expect.  Second, a `<Tiles />` component, which takes care of rendering
our chosen map tiles from [Open Street Maps](https://www.openstreetmap.org/#map=3/71.34/-96.82).

If we're rendering a map for a `bridge`, we use the `bridge` value passed via `props`
to get `lat`, `lng`, and `name` information, centre our map to this
position, and create a popup with the name of the bridge.

The only other point we should call out is the use of `className="full-height"`
on our `<Map />` components.  Our `LeafletMap.css` file looks like this:

```css
/* We need to make sure we use all available height so the map draws fully */
.full-height {
  height: 100%;
}
```

Leaflet expects to have an explicit `height` on the container, so it knows how
much space is available to fill with map tiles.  This makes sure that our container
is sized appropriately to take as much of the visible area (i.e., its parent) as possible.

#### Using LeafletMap

Let's connect everything we've built so far.  Our `BridgeInfo` component needs
to know about our `LeafletMap` component.  Let's make some changes to `BridgeInfo.js`:

```jsx
import React from 'react';
import LeafletMap from './LeafletMap.js';
import './BridgeInfo.css';

function InfoPanel(props) {
  const bridge = props.bridge;
  // Compute the age of the bridge in years
  const age = (new Date()).getFullYear() - bridge.year;

  return (
    <div id="info-panel">
      <h2>{bridge.nameEncoded}</h2>

      <div className="bridge-stats">
        <div>Year: {bridge.year} ({age} years)</div>
        <div>Width: {bridge.width}m</div>
        <div>Length: {bridge.length}m</div>
      </div>
    </div>
  );
}

/**
 * We may or may not have a bridge passed to us via props.
 * If we do, render an info panel across the top.  If we don't
 * render nothing (null), allowing the initial map of Ontario
 * to take over the entire right-hand space. 
 */
function BridgeInfo(props) {
  const infoPanel = props.bridge ? <InfoPanel bridge={props.bridge} /> : null;

  return (
    <div id="bridge-info-wrapper">
      {infoPanel}

      <div id="leaflet-map">
        <LeafletMap bridge={props.bridge} />
      </div>
    </div>
  );
}

export default BridgeInfo;
```

We only need to make 2 small changes to have our `LeafletMap` component work with
our `BridgeInfo` component:

1. use `<LeafletMap>` in our JSX, passing `bridge` on the `props`
2. `import` our `LeafletMap` component from `'./LeafletMap.js'`

## Conclusion

We've been able to explore many different aspects of React, and compare them to 
equivalents in Vue during this walkthrough, including:

- working with `create-react-app`
- loading JSON data from an external API, and processing it
- creating React `function` and `class` components
- working with JSX
- working with `state` and `props`
- writing our own JavaScript modules and classes, and using third-party JavaScript and React modules
- working with HTML and CSS to create dynamic UIs 

Seeing how this same application can be built in two popular frontend frameworks,
and also how many similar ideas they share, should help reinforce many of the
important aspects of modern frontend web development.
