---
title: React Components Introduction
layout: default
---

## React Components

> **Quick Note:** Some of the below code examples and explanations have been reproduced from sections of the [official online documentation](https://reactjs.org/docs/getting-started.html) for React. 

As we have stated, at the core of all applications written using React, are **components**.  So far, we have seen one component: **&lt;App /&gt;**.  To see the source for this compoent, open the file "App.js":


```jsx
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

This is known as a [functional component](https://reactjs.org/docs/components-and-props.html#function-and-class-components), since it's defined as a "function" (rather than a "class").  The name of the function corresponds to the tag used to render the component, in this case &lt;App /&gt;.  This tag is said to be "self-closing", but we could also write the component in this form: &lt;App&gt;&lt;/App&gt;.  Ths is not as common however, and it's unnecessary unless we wish to write a component that acts as a wrapper that simply renders other components.

Additionally, you will notice that our function is preceded by three import statements.  In this case, they provide the following functionality:

* `import React from 'react';` - This may look strange, because we don't reference "React" directly anywhere in our file.  However, it is required because of the strange syntax that exists in the return statement (ie: JSX - explained further down)

* `import logo from './logo.svg';` - This provides the actual source code for the svg file used in the cool spinning "React" logo - you can see it for yourself if you open the logo.svg file.

* `import './App.css';` - Here, we are simply including the CSS file for this component

Finally, below the function, you will notice the "export" statement: `export default App;`.  This is required because our App component exists in a separate file (module), and its loaded in to our main index.js file using the line: `import App from './App';` - this is known as [ES6 module syntax](https://exploringjs.com/es6/ch_modules.html). 

<br>

### Creating our own Component

Now that we have seen what a basic component consists of, let's create our own component using the same pattern to explore the unique syntax and functionality that can be achieved using functional components.

Start by creating a new file in the "src" directory called "Hello.js" (Our component will be named "Hello").  Inside the component, we will add everything required for a basic component that outputs (you guessed it: "Hello World"), ie:

```jsx
import React from 'react';

function Hello() {
  return (
    <p>Hello World!</p>
  );
}

export default Hello;
```

To actually see this component working, we need to render it on the page somewhere.  During this course, we will always work with a single top level component - currently it's the: &lt;App /&gt; component.  Therefore, to render our &lt;Hello /&gt; component, we must import it into the App.js file and add it somewhere within the code inside the "return" block:

Inside the App.js file, add the following "import" statement:

```js
import Hello from './Hello';
```

Next, include the "Hello" component *beneath* the "Learn React" link using it's associated "self-closing" tag:

```jsx
<Hello />
```

This should cause your App.js file to look like the following;

```jsx
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './Hello';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          
        </a>
        <Hello />
      </header>
    </div>
  );
}

export default App;
```

Once you have saved everything, head back to your browser to see the changes - "Hello World!"

<br>

### Introducing JSX

Now that our &lt;Hello /&gt; component is displaying correctly within our "App", let's discuss the strange syntax within the return values of these functions.  It looks like a String or HTML, but it is in fact, neither:

It is called JSX, and it is a syntax extension to JavaScript. We recommend using it with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript. 

**Important Note:**

Whenever we use JSX, we must ensure that whatever we return, it's wrapped in a *single element*.  This is because part of the build process for our React apps is [Babel](https://babeljs.io/) compiling the **JSX** code into a **React.createElement(component, props, ...children)** call, ie:

```jsx
const element = (
  <p className="greeting">
    Hello, world!
  </p>
);
```

becomes:

```js
const element = React.createElement(
  'p',
  {className: 'greeting'},
  'Hello, world!'
);
```

**ALSO:** When using JSX, there is no notion of an "[empty element](https://developer.mozilla.org/en-US/docs/Glossary/Empty_element)", so be careful when using tags like:

```html
<br>
```

as this will actually cause a problem and your component will not compile, due to the error **"Parsing error: Unterminated JSX contents"**.  Instead, you must use the "self-closing" syntax, ie:

```html
<br />
```

<br>

#### Embedding Expressions in JSX
In the example below, we declare a variable called name and then use it inside JSX by wrapping it in curly braces:

```jsx
function Hello() {
  const name = 'Josh Perez';
  return (
    <p>Hello {name}!</p>
  );
}
```

You can put any valid [JavaScript expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) inside the curly braces in JSX. For example, 2 + 2, user.firstName, or formatName(user) are all valid JavaScript expressions.

In the example below, we embed the result of calling a JavaScript function, formatName(user), into a &lt;p&gt; element.

```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

function Hello() {

  const user = {
    firstName: 'Harper',
    lastName: 'Perez'
  };
  
  return (
      <p>Hello, {formatName(user)}!</p>
  );
}
```

We split JSX over multiple lines for readability. While it isn’t required, when doing this, we also recommend wrapping it in parentheses to avoid the pitfalls of [automatic semicolon insertion](https://stackoverflow.com/q/2846283).

<br>

#### JSX is an Expression Too
After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects.

This means that you can use JSX inside of if statements and for loops, assign it to variables, accept it as arguments, and return it from functions:


```jsx
function getGreeting(user) {
  if (user) {
    return <p>Hello, {formatName(user)}!</p>;
  }
  return <p>Hello, Stranger.</p>;
}
```

<br>

#### Specifying Attributes with JSX

You may use quotes to specify string literals as attributes:

```jsx
const element = <div tabIndex="0"></div>;
```

You may also use curly braces to embed a JavaScript expression in an attribute:

```jsx
const element = <img src={user.avatarUrl} />;
```

Don’t put quotes around curly braces when embedding a JavaScript expression in an attribute. You should either use quotes (for string values) or curly braces (for expressions), but *not both* in the same attribute.

**Warning**:

Since JSX is closer to JavaScript than to HTML, React DOM uses camelCase property naming convention instead of HTML attribute names.

For example, class becomes [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) in JSX, and tabindex becomes [tabIndex](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex).

<br>

### Accepting "Props"

Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

For example, we can extend our "Hello" component to accept one or more "props" by including the "props" parameter to our function definition and acccessing each named "prop" as an attribute using the same name, ie:

```jsx
function Hello(props) {
  return (
      <p>Hello {props.fName} {props.lName}!</p>
  );
}
```

will allow us to provide "fName" and "lName" values to the component using the straightforward syntax:

```jsx
<Hello fName="Jason" lName="Perez" />
```

<br>

### Introducing "class" Components.

In addition to "functional" components, React also provides components in the form of an ES6 **class**.  Using this syntax will open up some new, interesting possibilities, including storing the "[state](https://reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class)" of a Component as well as handling [events on DOM elements](https://reactjs.org/docs/handling-events.html) and component [lifecycle events](https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class).

To practice working with class, let's create a new component called **Clock**:

First, create a new file in "src" called "Clock.js".  Once this is done, add the following code:


```jsx
import React from 'react';

class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Clock;
```

Once again, we must add the correct import statement and component to our App.js file, ie:

Inside the App.js file, add the following "import" statement:

```js
import Clock from './Clock';
```

Next, include the "Clock" component *beneath* the &lt;Hello /&gt; link using it's associated "self-closing" tag, as well as some code to include the current date as its only "prop":

```jsx
<Clock date={new Date()} />
```

Not bad, there's just the issue of updating the clock output - but we'll deal that next.  In the mean time, let's discuss the small differences between our &lt;Clock /&gt; class component and our &lt;Hello /&gt; functional component:

* To create a component using a "class", we must [*extend*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends) the [React.Component](https://reactjs.org/docs/react-component.html) class

* When using "props", we have to refer to them using the "this" keyword, rather than "props" directly

* We must include a "render()" method that returns the content of our component.  This will be invoked every time the component is rendered.

As you can see, the differences between a class component and a functional component are relatively small.  However, by using a class, we can leverage some added complexity, such as "state".  

<br>

#### Adding "state"

The "state" of a component is a way to store data within the component that is synchronized with the UI of the component.  This is a very powerful concept and one of the core ideas behind designing apps using components.

For our example, let's add "state" to our &lt;Clock /&gt; component, so that we can keep the UI of the component in sync with the current time.  In this way, we can say that each &lt;Clock /&gt; component keeps track of its own internal *Date* data. It will also be responsible for updating its UI every second to reflect its internal "state" data.

The first thing we must do, is add a "constructor" to our function.  This is where we will initialize the component's internal state, as well as pass "props" to the parent object (React.Component) using the [super](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) keyword:

```jsx
constructor(props) {
    super(props);
    this.state = { date: new Date() };
}
```
Now, instead of passing a new "Date" object as the "date" property to the &lt;Clock /&gt; component, we will let the component initizlize its own Date once its initialized.  Since we're using the "state" object, instead of "props" to reference the date, we must also update our render() method, ie:

```jsx
return (
    <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
    </div>
);
```

<br>

**Quick Note: "state" vs. "props"**

Props (short for “properties”) and state are both plain JavaScript objects. While both hold information that influences the output of render, they are different in one important way: props get passed to the component (similar to function parameters) whereas state is managed within the component (similar to variables declared within a function).

One interesting thing to note about "props" is that we can pass anything as a property, including functions!  This can be very helpful if we wish to send a message from a "child" component to a "parent" component.  For example, if we define a function (ie: handleMessage(msg)) in the "Parent" component, we can pass it in to the "Child" component using a custom property, ie "sendMessage").  Whenever the child wishes to send a message back to the parent, it can invoke the callback function from "props" and pass the data:

**Parent Component**

```jsx
handleMessage(msg){
    console.log(`Child Says: ${msg}`)
}

render(){
    return <Child sendMessage={this.handleMessage} />;
}
```

**Child Component**

```js
this.props.sendMessage("Hello");
```

Here are some good resources for further reading on when to use props vs state, from the [official documentation](https://reactjs.org/docs/faq-state.html#what-is-the-difference-between-state-and-props):

* [Props vs State](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)
* [ReactJS: Props vs. State](https://lucybain.com/blog/2016/react-state-vs-pros/)

<br>

#### Updating "state" and synchronizing the UI

Now that our &lt;Clock /&gt; component has a notion of "state", we can write code to manage the value of the current state and update the UI.  This involves the **setState()** method, however there are certain cautions we must take when using this function:

* **Do Not Modify State Directly**

  For example, this will not re-render a component:

  ```jsx
  // Wrong
  this.state.comment = 'Hello';
  ```

  Instead, use setState():

  ```jsx
  // Correct
  this.setState({comment: 'Hello'});
  ```

  The only place where you can assign this.state is the constructor.

* **State Updates May Be Asynchronous**

  React may batch multiple setState() calls into a single update for performance.

  Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state.

  For example, this code may fail to update the counter:

  ```jsx
  // Wrong
  this.setState({
    counter: this.state.counter + this.props.increment,
  });
  ```

  To fix it, use a second form of setState() that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:

  ```jsx
  // Correct
  this.setState((state, props) => {
    return { counter: state.counter + props.increment }
  );
  ```

<br>

#### Updating the &lt;Clock /&gt; Component using Lifecycle Methods

For our &lt;Clock /&gt; component to function as a proper clock and update the UI every second, we must add a few functions.  As expected, this will involve the [setInterval()](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#setInterval) function to update the Date value every second.  However, where we *place* the code is important:

For example, we will override the ["componentDidMount"](https://reactjs.org/docs/react-component.html#componentdidmount) Lifecycle method, in order to invoke "setState()" once every second and update the "state" and UI with a new Date.  Also, we assign its return value to an internal property called "timerID" using "this", so that we may clear the interval later (within the ["componentWillUnmount"](https://reactjs.org/docs/react-component.html#componentwillunmount)) method.  

```jsx
componentDidMount() {
    this.timerID = setInterval(() => {
        this.setState({
            date: new Date()
        });
    }, 1000);
}

componentWillUnmount() {
  clearInterval(this.timerID);
}
```

For more information on the "lifecycle" of a component, and what functions are invoked during that lifecycle, you can check out this excellent tool:

* [Interactive React Lifecycle Methods diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

**Important Note from the Documentation**

> componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.


<br>

### Finally, Remove "date={new Date()}" property

As a final step, we can remove the "date={new Date()}" property from our &lt;Clock /&gt; component within our &lt;App /&gt; definition, located in App.js.

Once this is done, check the updated solution running in the browser to see the Clock updating itself once every second!  Also, it's interesting to note that we can reuse this &lt;Clock /&gt; component anywhere and it will function correctly, since it's responsible for initializing and maintaining its own "state".















