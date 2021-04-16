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

To see this in action, let's code a simple "click counter" component that renders a single button that shows a number that increases by one (1) every time it's clicked.  To achieve this, we'll create a new component called "ClickCounter":

```jsx
import { useState } from 'react';

function ClickCounter(props){
    const [numClicks, setNumClicks] = useState(0);

    function increaseNumClicks(e){ // 'e' is the current event object
        setNumClicks(prevClicks => prevClicks + 1);
    }

    return <button onClick={increaseNumClicks}>Clicks: {numClicks}</button>
}

export default ClickCounter;
```

Here, you will notice that we have added a couple new concepts to the construction and rendering of a typical functional component, ie:

* We have declared a function to handle the event.  It receives a single parameter 'e' which is a "[SyntheticEvent](https://reactjs.org/docs/events.html)" - "a cross-browser wrapper around the browser’s native event. It has the same interface as the browser’s native event, including *stopPropagation()* and *preventDefault()*, except the events work identically across all browsers."

* On our button element, we use "onClick" (instead of "onclick") to reference the event handler and "wire up" the event. **Note:** For a full list events please refer to the official documentation for [supported events](https://reactjs.org/docs/events.html#supported-events).

<br>

### Adding Parameters

As you can see from the above example, our callback function "increaseNumClicks" is registered to the onClick event by *passing the function only* - the function is not actually *invoked* anywhere in our JSX.  This works fine, but what if we wish to pass one or more parameters to the function, in addition to the SyntheticEvent (above)?  

This can actually be achieved by registering the event as an anonymous function declared within the JSX, which *invokes* the callback function.  For example:

```jsx
function increaseNumClicks(e, message){ // 'e' is the current event object
    console.log(message);
    setNumClicks(prevClicks => prevClicks + 1);
}

return <button onClick={(e)=>{increaseNumClicks(e, "Hello")}}>Clicks: {numClicks}</button>
```

Here, we declare the callback function in place.  It accepts a single parameter "e" as before, but the body of the function *invokes* the callback function.  This allows us to continue to pass the SyntheticEvent (e) to our event handler "increaseNumClicks" as well as add any other parameter values. 

<br>

## Rendering Data

So far, we have seen how we can render a value in JSX by placing an expression within curly braces `{...}`.  This expression is then evaluated and used in place within our JSX, either to:

* render the data in place, ie:

  ```jsx
  {date.toLocaleTimeString()}
  ```
* provide a value to a property, ie:

  ```html
  <img src={user.avatarUrl} />
  ```

However, we actually have a great deal of control over how the data is rendered using this syntax.  Since the content between the curly braces `{...}` is a *statement*, we can use well known JavaScript syntax and functions to control our output. 

Before we move on to the examples, let's assume that we have the following collection of data (borrowed from our Lodash examples) hardcoded in the state of a component:

```js
const [users, setUsers] = useState([
    { 'user': 'fred',    'active': false, 'age': 40 },
    { 'user': 'pebbles', 'active': false, 'age': 1  },
    { 'user': 'barney',  'active': true,  'age': 36 }
]);
```

<br>

### Logical && Operator (If)

First, let's take a look at a situation where we may only want to render some data under a specific condition. For example, say we only want to show the 'user' name if the user is "active".  To accomplish this, we can leverage the [&& Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators).

```jsx
return (
    <div>
        {users[0].active &&
            <p>{users[0].user} is Active!</p>
        }
    </div>
);
```

<br>

### Ternary Operator (If-Else)

Next, let's look at how we can use the [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator), ie: `(age > 18) ? "adult" : "minor"` to render a different &lt;p&gt; element depending on whether or not the user is "active".

```jsx
return (
    <div>
        {users[0].active ? (
            <p>{users[0].user} is Active!</p>
        ) : (
            <p>{users[0].user} is Inactive!</p>
        )}
    </div>
);
```

<br>

### Array.map() (Iteration)

One extremely common task is iterating over a collection and outputting each element using a consistent format.  This could be rows in a table, items in a list, other components, etc.  To achieve this within our JSX code, we can use the [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method, ie:

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
            {users.map(user => 
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

While this does work to render each user in its own &lt;tr&gt; element, we actually have one small problem.  If you open the console in the browser, you will see an error: "Warning: Each child in a list should have a unique "key" prop."  According to the documentation:

>Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.

Normally, we would have a unique id to work with (ie "_id" from MongoDB), however with our list we don't have any "stable" id's to work with.  In this case, we can make use of the 2nd parameter to the "map()" method - the "index".  This requires us to change our JSX to use the following code:

```jsx
{users.map((user, index) => 
    <tr key={index}>
        <td>{user.user}</td>
        <td>{(user.active) ? "yes" : "no"}</td>
        <td>{user.age}</td>
    </tr>
)}
```

<br>

### Returning Null

Finally, we can actually choose not to render anything by returning ***null***, for example:

```jsx

if(!loading){
    return <p>Done Loading! - TODO: Show the data here</p>;
}else{
    return null; // don't render anything - still loading
}

```

