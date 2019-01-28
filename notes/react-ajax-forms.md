---
title: React AJAX & forms
layout: default
---

## React Forms

To learn about how we can use form elements in React, we will be referencing the official documentation [located here](https://reactjs.org/docs/forms.html).  This includes the following topics:

* [Controlled Components](https://reactjs.org/docs/forms.html#controlled-components)
* [The textarea Tag](https://reactjs.org/docs/forms.html#the-textarea-tag)
* [The select Tag](https://reactjs.org/docs/forms.html#the-select-tag)
* [Handling Multiple Inputs](https://reactjs.org/docs/forms.html#handling-multiple-inputs)

This will give us a complete introduction on using forms within and how we can use "state" to achieve a two-way "stateful" binding relationship to properties within the component.

<br>

## AJAX and the Teams API

If a component is going to fetch data from an external API, such as our Teams API, it is typically done in the **"componentDidMount()"** lifecycle method in order to populate the component's "state" with the results.  

In React there's nothing built in that supports making an Ajax request, however we can leverage either the native [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) Object, or the much more straightforward [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).  


### Fetching the Data

The following example shows how a "componentDidMount()" lifecycle method can be used to make a request for data using the Fetch API.  This example uses the popular [https://reqres.in](https://reqres.in) testing service as an example of how we can fetch the data.  This can easily be swapped out for your "Teams" API running on Heroku:

```javascript
componentDidMount() {
  fetch("https://reqres.in/api/users") // this would be a URI from your "Teams API"
  .then(res => res.json())
  .then(data => {
      this.setState({ 
          users: data 
      });
  }).catch(err => {
      console.log(err);
  });
}
```


### Updating the Data

If we wish to update data, things become slightly more complicated, as we must use "PUT" and provide the API with actual data.  For example, if we wish to update "user 2" using [https://reqres.in](https://reqres.in), we can use the following code:

```javascript
fetch("https://reqres.in/api/users/2",{
    method: 'PUT',
    body: JSON.stringify({
        name: "morpheus",
        job: "zion resident"
    }),
    headers: { 'Content-Type': 'application/json' } 
})
.then(res => res.json())
.then(data => {
    console.log(data);
}).catch(err => {
    console.log(err)
});
```

<br>

### Putting it together - Example Code

To see how we can put all the ideas from Week 5 together in a single React web application, we will be walking through the [Week 5 example](https://github.com/sictweb/web422/tree/master/Code%20Examples/week5) from our Github repo.  Here, we will see how we can load / modify "Employee" data, access different routes and render Bootstrap components in a structured, component-oriented manner.

<br>
