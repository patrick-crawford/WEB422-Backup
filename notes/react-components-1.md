---
title: React Components Introduction
layout: default
---

## React Components

> **Quick Note:** Some of the below code examples and explanations have been reproduced from sections of the [official online documentation](https://reactjs.org/docs/getting-started.html) for React. 

As we have stated, at the core of all applications written using React, are **components**.  So far, we have seen one component: **&lt;App /&gt;**.  To see the source for this component, open the file "App.js":


```jsx
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

This is known as a [functional component](https://reactjs.org/docs/components-and-props.html#function-and-class-components), since it's defined as a "function".  The name of the function corresponds to the tag used to render the component, in this case &lt;App /&gt;.  This tag is said to be "self-closing", but we could also write the component in this form: &lt;App&gt;&lt;/App&gt;.  Ths is not as common however, and it's unnecessary unless we wish to write a component that acts as a wrapper that simply renders other components.

Additionally, you will notice that our function is preceded by two import statements.  In this case, they provide the following functionality:

* `import logo from './logo.svg';` - This provides the actual source code for the svg file used in the cool spinning "React" logo - you can see it for yourself if you open the logo.svg file.

* `import './App.css';` - Here, we are simply including the CSS file for this component

Finally, below the function, you will notice the "export" statement: `export default App;`.  This is required because our App component exists in a separate file (module), and its loaded in to our main index.js file using the line: `import App from './App';` - this is known as [ES6 module syntax](https://exploringjs.com/es6/ch_modules.html). 

<br>

### Creating our own Component

Now that we have seen what a basic component consists of, let's create our own component using the same pattern to explore the unique syntax and functionality that can be achieved using functional components.

Start by creating a new file in the "src" directory called "Hello.js" (Our component will be named "Hello").  Inside the component, we will add everything required for a basic component that outputs (you guessed it: "Hello World"), ie:

```jsx
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

Next, include the "Hello" component *beneath* the "Learn React" link using its associated "self-closing" tag:

```jsx
<Hello />
```

This should cause your App.js file to look like the following;

```jsx
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

### Introducing "Hooks".

As of version 16.8, React has introduced a feature known as "hooks".  Using this syntax will open up some new, interesting possibilities to our functional components, including working with the "[state](https://reactjs.org/docs/hooks-state.html)" as well as performing "[side effects](https://reactjs.org/docs/hooks-effect.html)" during the lifetime of the component (ie: "Data fetching, setting up a subscription, and manually changing the DOM in React components").  

Basically, by using certain built-in "hooks" (functions), React components are able to store and manage data internally to the component (ie, its "state" values).  When this data changes, a refresh (render) of the component will occur and the user interface will be updated.  This allows us to create components that work with data internally that changes over time.

To actually see this in action, let's create a new component called **Clock**:

First, create a new file in "src" called "Clock.js".  Once this is done, add the following code:

```jsx
import { useState, useEffect } from 'react';

function Clock(props){
    return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {props.date.toLocaleTimeString()}.</h2>
        </div>
    );
}

export default Clock;
```

So far, this looks very similar to our "Hello" component above; it is defined as a function that accepts props and it returns some JSX to be rendered.  However, there is one key difference: we have imported both the **[useState](https://reactjs.org/docs/hooks-reference.html#usestate)** and the **[useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)** hooks from 'react'.  Soon, we will use these functions within our component.

For now, let's just add the Clock component to our App so that we can see it render some data:

Open the **App.js** file and add the following "import" statement:

```js
import Clock from './Clock';
```

Next, include the "Clock" component *beneath* the &lt;Hello /&gt; tag using its associated "self-closing" tag, as well as some code to include the current date as its only "prop":

```jsx
<Clock date={new Date()} />
```

Not bad, there's just the issue of updating the clock output - but we'll deal with that next.  

<br>

#### Adding "state"

As mentioned above, the "state" of a component is a way to store data within the component that is synchronized with the UI of the component.  This is a very powerful concept and one of the core ideas behind designing apps using components.

For our example, let's add a "state" value to our &lt;Clock /&gt; component, so that we can keep the UI of the component in sync with the current time.  In this way, we can say that each &lt;Clock /&gt; component keeps track of its own internal Date() data. It will also be responsible for updating its UI every second to reflect changes in this data.

Here is where we will use our first hook: **useState()**.  In the first line of your "Clock" function, add the line:

```jsx
const [date, setDate] = useState(new Date());
```

Here, we can see that "useState" is a function, which: 

* Accepts a parameter that allows us to set the *initial value* of a "state" variable
* Returns an array consisting two values: the "state" variable itself and a function to update it.  We use a *[destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)* to assign each of those values to a pair of constant variables - in this case: "date" and "setDate".  In the above case, this is *shorthand* for:
  
  ```jsx
  const dateState = useState(new Date());
  const date = dateState[0];
  const setDate = dateState[1];  
  ```
  
  We use the "const" keyword here since we **must** use the "setDate" function to modify the state value "date" - we cannot modify "date" directly.  By invoking the "setDate" method, we not only update the value of "date", but also trigger our component to re-render!

  **NOTE**

  If the new state is computed using the previous state, you can [pass a function to setState](https://reactjs.org/docs/hooks-reference.html#functional-updates). The function will receive the previous value, and return an updated value., ie:

  If you have the variable "num" in your state:

  ```js
  const [num, setNum] = useState(0);
  ```

  and you wish to increase it's value by 1, you can use the following code:

  ```js
  setNum(prev => prev + 1);
  ```


Now, instead of passing a new "Date" object as the "date" property to the &lt;Clock /&gt; component, we will let the component set its own date once its initialized.  Since we're using the "date" state variable, instead of "props" to reference the date, we must also update our return value, ie:

```jsx
return (
    <div>
        <h1>Hello, world!</h1>
        <h2>It is {date.toLocaleTimeString()}.</h2>
    </div>
);
```

<br>

**Quick Note: "state" vs. "props"**

 While "state" &amp; "props" both hold information that can be used to influence the output of the rendered component, they are different in one important way: props get *passed to* the component whereas state is managed *within* the component.

 One interesting thing to note about "props" is that we can pass anything as a property, including functions!  This can be very helpful if we wish to send a message from a "child" component to a "parent" component.  For example, if we define a function (ie: handleMessage(msg)) in the "Parent" component, we can pass it in to the "Child" component using a custom property, ie "sendMessage").  Whenever the child wishes to send a message back to the parent, it can invoke the callback function from "props" and pass the data:	

**Parent Component**	

```jsx	
function handleMessage(msg){	
    console.log(`Child Says: ${msg}`)	
}	
return <Child sendMessage={handleMessage} />;	
```	

**Child Component**	

```js	
props.sendMessage("Hello");	
```	

<br>

#### Updating the &lt;Clock /&gt; Component using the "useEffect" Hook

For our &lt;Clock /&gt; component to function as a proper clock and update the UI every second, we must add some additional logic.  As expected, this will involve the [setInterval()](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals#setInterval) function to update the date value every second.  However, where we *place* the code is important:

For example, you may be tempted to simply place the code: 

```jsx
const timerID = setInterval(()=>{
    setDate(new Date());
},1000);
```

within the body of the Clock function, before the return statement.  While this code will technically achieve our goal of updating the "date" state value once every second (triggering a re-render with the new value of "date"), there are a few problems:

<br>

**1. Out of Control Execution**

If we place a log statement just before the interval is created, ie:

```jsx
console.log("creating a new interval");
const timerID = setInterval(()=>{
    setDate(new Date());
},1000);
```

and check our updated code running in the browser, we will see that things quickly get out of control in the console. To resolve this, we need to ensure that our setInterval function is only executed **once**.

This can be achieved by using the **[useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)** hook, which will help us to ensure that our function is only executed after the component is "mounted" (ie: after the first render).  This is typically where we will set up any asynchronous operations such as fetching data (or registering a callback timer in this case).  It's important to note however, that the "useEffect" hook can be used to execute code at other times as well (ie: when a state or props value has been updated), but we will discuss this topic later on.

For now, let's just invoke the "useEffect" function and provide it with our setInterval() logic:

```jsx
useEffect(()=>{
    console.log("creating a new interval")
    const timerID = setInterval(()=>{
        setDate(new Date());
    },1000);
}, []); 
```

In the above code, you'll notice that the **useEffect** hook actually accepts two parameters: a callback function and an array of "dependencies".  The callback function is simply the code to be executed once the component is first "mounted" and rendered, while the dependency array is a list of variables that, when changed, will cause the effect to execute again.  Since we only want this effect to execute **once**, we can provide an empty array.

If we check our updated code running in the browser now, we will see that "creating a new interval" is only executed once!

<br>

**2. When / How to Stop the interval?**

At the moment, our code has no mechanism to **stop** the interval using [clearInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearInterval) when it is no longer needed.  This would be part of a clean-up process and should execute when the component is "unmounted" or removed from the DOM.

Fortunately, we can handle this situation within the **return value** of the callback function provided to **useEffect**, ie:

```jsx
useEffect(()=>{
    console.log("creating a new interval")
    const timerID = setInterval(()=>{
        setDate(new Date());
    },1000);
    return ()=>{ // clean up the effect
        clearInterval(timerID);
    }
}, []);
```

<br>

### Finally, Remove "date={new Date()}" property

As a final step, we can remove the "date={new Date()}" property from our &lt;Clock /&gt; component within our &lt;App /&gt; definition, located in App.js.

Once this is done, check the updated solution running in the browser to see the Clock updating itself once every second!  Also, it's interesting to note that we can reuse this &lt;Clock /&gt; component anywhere and it will function correctly, since it's responsible for initializing and maintaining its own "state".















