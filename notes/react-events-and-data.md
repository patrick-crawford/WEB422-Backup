---
title: React Events and Rendering Data
layout: default
---

## Handling Events

> **Quick Note:** Some of the below code examples and explanations have been reproduced from sections of the [official online documentation](https://reactjs.org/docs/getting-started.html) for React. 

Handling events in React is very similar to handling events on DOM elements using properties like [onclick](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick).  However, there are some differences, ie:

* React events are named using camelCase, rather than lowercase.
* With JSX you pass a function as the event handler, rather than a string.

For example, the HTML:

```html
<button onclick="processClick()">
  Click Me!
</button>
``` 

is slightly different in React:

```html
<button onClick={processClick}>
  Click me!
</button>
```

To see this in action, let's code a simple "click counter" component that renders a single button that shows a number that increases by one (1) every time it's clicked.  To achieve this, we'll create a new component called "ClickCounter" using the class syntax:

```jsx
import React from 'react';

class ClickCounter extends React.Component{
    constructor(props){
        super(props);

        this.state = {numClicks: 0};

        this.increaseNumClicks = this.increaseNumClicks.bind(this); // 'this' must be bound to the event handler
    }

    increaseNumClicks(e){ // 'e' is the current event object
        this.setState((prevState) => {
            return { numClicks: prevState.numClicks + 1 }
        });
    }

    render(){
        return <button onClick={this.increaseNumClicks}>Clicks: {this.state.numClicks}</button>
    }
}

export default ClickCounter;
```

Here, you will notice that we have added a few new concepts to the construction and rendering of a typical class component, ie:

* We have declared a function to handle the event.  It recieves a single parameter 'e' which is a "[SyntheticEvent](https://reactjs.org/docs/events.html)" - "a cross-browser wrapper around the browser’s native event. It has the same interface as the browser’s native event, including *stopPropagation()* and *preventDefault()*, except the events work identically across all browsers."

* In our *constructor* function, we had to modify our event handler by calling `.bind(this)` to ensure that 'this' works correctly in the callback, according to the React Documentation:
  
  "This is not React-specific behavior; it is a part of how functions work in JavaScript. Generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method."

* on our button element, we use "onClick" (instead of "onclick") to reference the event handler and "wire up" the event.

For more on passing event handlers to components, such as passing parameters, using arrow functions, etc. see: [https://reactjs.org/docs/faq-functions.html](https://reactjs.org/docs/faq-functions.html).  However, as it states in the linked document, using the alternate syntax can potentially "have performance implications" or "break optimizations based on strict identity comparison", so be careful when using them. 

<br>

## Rendering Data

So far, we have seen how we can render a value in JSX by placing an expression within curly braces `{...}`.  This expresion is then evaluated and used in place within our JSX, either to:

* render the data in place, ie:

  ```jsx
  {this.state.date.toLocaleTimeString()}
  ```
* provide a value to a property, ie:

  ```html
  <img src={user.avatarUrl} />
  ```

However, we actually have a great deal of control over the output of the render function, given this syntax.  Since the content between the curly braces `{...}` is a *statement*, we can use well known JavaScript syntax and functions to control our output. 

Before we move on to the examples, let's assume that we have the following collection of data (borrowed from our Lodash examples) hardcoded in the state of a component:

```js
this.state = { users:[
    { 'user': 'fred',    'active': false, 'age': 40 },
    { 'user': 'pebbles', 'active': false, 'age': 1  },
    { 'user': 'barney',  'active': true,  'age': 36 }
]};
```

<br>

### Logical && Operator (If)

First, let's take a look at a situation where we may only want to render some data under a specific condition. For example, say we only want to show the 'user' name if the user is "active".  To accomplish this, we can leverage the [&& Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators).

```jsx
return (
    <div>
        {this.state.users[0].active &&
            <p>{this.state.users[0].user} is Active!</p>
        }
    </div>
);
```

<br>

### Ternary Operator (If-Else)

Next, let's look at how we can use the [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator), ie: `(age > 18) ? "adult" : "minor"` to render a differnet &lt;p&gt; element depending on whether or not the user is "active".

```jsx
render() {
    return (
        <div>
            {this.state.data[0].active ? (
                <p>{this.state.users[0].user} is Active!</p>
            ) : (
                <p>{this.state.users[0].user} is Inactive!</p>
            )}
        </div>
    );
}
```

<br>

### Array.map() (Iteration)

One extremely common task is iterating over a collection and outputting each element using a consistant format.  This could be rows in a table, items in a list, other components, etc.  To achieve this within our JSX code, we can use the [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method, ie:

```jsx
return (
    <table>
        <thead>
            <tr>
                <th>User</th>
                <th>Active</th>
                <th>Age</th>
            </tr>
        </thead>
        <tbody>
            {this.state.users.map(user => 
                <tr>
                    <td>{user.user}</td>
                    <td>{(user.active) ? "yes" : "no"}</td>
                    <td>{user.age}</td>
                </tr>
            )}
        </tbody>
    </table>
);
```

While this does work to render each user in it's own &lt;tr&gt; element, we actually have one small problem.  If you open the console in the browser, you will see an error: "Warning: Each child in a list should have a unique "key" prop."  According to the documentation:

>Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.

Normally, we would have a unique id to work with (ie "_id" from MongoDB), however with our list we don't have any "stable" id's to work with.  In this case, we can make use of the 2nd parameter to the "map()" method - the "index".  This requires us to change our JSX to use the following code:

```jsx
{this.state.users.map((user, index) => 
    <tr key={index}>
        <td>{user.user}</td>
        <td>{(user.active) ? "yes" : "no"}</td>
        <td>{user.age}</td>
    </tr>
)}
```

<br>

### Returning Null

Finally, we can actually choose not to render anything by returning ***null*** from our render function, for example:

```jsx
render() {
    if(!this.state.loading){
        return <p>Done Loading! - TODO: Show the data here</p>;
    }else{
        return null; // don't render anything - still loading
    }
}
```

