---
title: jQuery (with Bootstrap) Review
layout: default
---

## jQuery Review

As we have seen from the notes in the WEB322 course, the jQuery Library is an extremely popular and valuable tool for front-end web application development.  To refresh your memory:

> "jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript."

Today, we will be re-examining the way that jQuery can help us manipulate the DOM to gain complete control of the elements on the page, including: "Selecting / Accessing Elements", "Watching for Events" & "Updating Elements".  We will then re-examine the fundamentals of the Bootstrap 3 framework and how jQuery can be used to programatically manipulate UI elements such as modal windows.

To begin, let's review how we can include jQuery (and Bootstrap) in our projects using the **script** and **link** elements from our primary HTML page:

<br>

#### CSS

* The bootstrap 3.4.1 compiled/minified CSS file from the bootstrapcdn.com CDN - [https://www.bootstrapcdn.com/legacy/bootstrap/](https://www.bootstrapcdn.com/legacy/bootstrap/)
  
  ```html
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
  ```

#### JavaScript

* The jQuery 3.4.1 slim, minified JS file from the code.jquery.com CDN - [https://code.jquery.com/](https://code.jquery.com/)
  
  ```html
   <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8=" crossorigin="anonymous"></script>
   ```

* The bootstrap 3.4.1 minified JS file from the bootstrapcdn.com CDN - [https://www.bootstrapcdn.com/legacy/bootstrap/](https://www.bootstrapcdn.com/legacy/bootstrap/)
  
  ```html
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script>
  ```

Once we have obtained the correct Javascript &amp; CSS files, the following functionality should be available to us:

<br>

### {% raw %}The '$(function() { });' or '$(document).ready(function(){ });' functions{% endraw %}

It stands to reason that any JavaScript code that deals with accessing elements in the DOM **must** be executed *after* the DOM is built.   It is for this reason that you will see most jQuery code residing in an anonymous function delcared as a parameter to either **$();** or **$(document.ready());**.  When the DOM is ready, the supplied anonymous ("callback") function will be executed, ensuring that any DOM operation within the function will be safe to use.

```js
$(function(){
    console.log("DOM is ready!");
});
```

<br>

### Selecting / Accessing Elements Using Class &amp; ID Selectors

jQuery has a rich ["selector" framework](https://api.jquery.com/category/selectors/) for getting a reference to a specific element in the DOM.  We will be briefly discussing two of the simplest methods of obtaining a DOM element in jQuery, primarily: 

Selector | Description 
--- | ---
$( "#my-table" );| **id Selector:** Selects a single element with the given id attribute.
$( ".table-heading" );| **class Selector:** Selects all elements with the given class.

Both of these selector styles mimic the structure of CSS selectors, so please feel free to leverage your knowedge of CSS to select (jQuery wrapped) elements in the DOM using the above methods.  

As you are aware, when using selectors like the **class Selector**, it is often the case that **more than one** element will be selected. This is fine if we want to apply the same operations to a group of elements.  However, if we wish to access each selected element individually,  we can leverage jQuery's [each() function](http://api.jquery.com/each/) to iterate over the elements in the collection. For Example:

```javascript
$("tr.highlight").each(function(index){
    $(this).css({"background-color":"#eff6f7"}); // color the "highlight" rows gray
});
```

The .each() function will iterate over every selected element returned by the selector and invoke the provided "callback" function.  You can optionally pass a parameter to the callback function if you wish to know the current index (0, 1, 2, 3, etc).  

During each iteration, the current element can be accessed using "$(this)".  It's a little strange to see "this" wrapped in a jQuery function, however we need to wrap "this" (ie: the current element) into a jQuery object so that we can perform jQuery specific operations on it (ie, using the [.css()](http://api.jquery.com/css/) method).  If we remove the code surrounding "this", we will run into the error:

```
TypeError: this.css is not a function
```
<br>

### Watching for Events

Now that we have access to the element (or elements) we wish to modify in the DOM, we can apply a number of operations to modify their appearance and/or behaviour using jQuery.  One extremely important aspect in creating a reactive and dynamic view (DHTML) is watching a given element for a user / system initiated event and responding to it with custom code.

jQuery provides this functionality via its [on()](http://api.jquery.com/on/) method:


```
.on( events [, selector ] [, data ], handler )
```

We can apply this method to any selected element in order to wire up ("respond to") an "event" by passing a callback function to the "handler" parameter, ie:

```javascript
$(".my-table tbody").on("click", "tr", function(){ // watch the tbody element contained within an element with class "my-table" and execute code whenever new (or existing) <tr> elements are clicked
     console.log("table row clicked!");
});
```

What makes this function so powerful is that if we invoke the ".on" method on an element that isn't likely to change (an outer container or document, for example), we can use the "selector" parameter to apply the callback function to **any** child element that matches that selector (even if it's dynamically created in the future).  

This means that even if we use some of jQuery's DOM modification methods (see below) to dynamically create a new input element (contained within an existing element with class="row") **after** we define the event, it will **still be applied** to the new input element.  This can sometimes lead to event handlers that take the form:

<br>

### Updating Elements

The final piece in creating dynamic html (DHTML) is actually modifying the DOM by creating, destroying or modifying elements (nodes) within the DOM tree. JavaScript itself provides a number of methods for dealing with the DOM, however jQuery extends this functionality and provides some new methods as well.  For our purposes, we will just be revisiting two of the most simple methods, ie [empty](https://api.jquery.com/empty/), [html](https://api.jquery.com/html/) and [append](https://api.jquery.com/append/) - for a full list of the 40+ methods available, refer to the [Official Documentation here](https://api.jquery.com/category/manipulation/).

<table>
<thead>
<tr>
<th>Method</th>
<th>Description</th>
<th>Result</th>
</tr>
</thead>
<tbody>
<tr>
<td>$("#content").empty();</td>
<td><strong>.empty()</strong>  Remove all child nodes of the set of matched elements from the DOM.</td>
<td>removes all html contained within the "content" element.</td>
</tr>
<tr>
<tr>
<td>$("#content").html("&lt;span&gt;New Div!&lt;/span&gt;");</td>
<td><strong>.html()</strong> Get / Set the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element.</td>
<td>Sets the inner HTML of the "content" element to contain a &lt;span&gt; element with the text "New Div!"</td>
</tr>

<td>$("#content").append("&lt;span&gt;Another New Div!&lt;/span&gt;");</td>
<td><strong>.append()</strong> Insert content, specified by the parameter, to the end of each element in the set of matched elements.</td>
<td>Adds the  &lt;span&gt; element with the text "Another New Div!" to the end of the "content" element.</td>
</tr>

<tr>
<td>$("#content").attr("data-id");</td>
<td><strong>.attr()</strong> Get / Set the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element.</td>
<td>Get the "data-id" attribute value for the content element, ie: &lt;div id="content" data-id="123"&gt;</td>
</tr>

</tbody>
</table>

<br>

## Handling Form Data

jQuery has a very nice interface for handling form values.  The following sections illustrate how we can **get**, **set** and correctly **clear** the values of **text** / **password**, **checkbox**, **radiobutton**, **textarea** and **select (single / multiple)** elements as well as how to correctly wire up the form "submit" event.

<br>

### The "submit" event

If we wish to read form values using the below methods when the form is submitted (ie: to make an AJAX call to update a resource on a Web API), we must correctly wire up the "submit" event for the form.  Secondly, we must also prevent the from from attempting to "submit" the data using the traditional method of generating a new "POST" request.  

For example, say that our form exists within a &lt;div&gt; element with the class "forms"; we can use the following code to correctly wire up the "submit" event and prevent the form from trying to generate a new HTTP request by utalizing [event.preventDefault()](https://api.jquery.com/event.preventdefault/):

```js
$(".forms").on("submit", "form", function(e){
    e.preventDefault();
    console.log("form Submitted!");
});
```

<br>

### text / password elements

```html
<input type="text" class="form-control" id="inputEmail" placeholder="Email">
<input type="password" class="form-control" id="inputPassword" placeholder="Password">
```

***Set***
```js
$("#inputEmail").val("from jQuery"); // set to "from jQuery"
$("#inputPassword").val("abc"); // set to "abc"
```

***Get***
```js
$("#inputEmail").val(); 
$("#inputPassword").val();
```

***Clear***
```js
$("#inputEmail").val(""); 
$("#inputPassword").val("");
```

<br>

### checkbox elements

```html
<input type="checkbox" id="checkbox1"> Checkbox
```

***Set***
```js
$("#checkbox1").prop("checked", true); // set to "checked"
```

***Get***
```js
$("#checkbox1").prop("checked"); // true / false
```

***Clear***
```js
$("#checkbox1").prop("checked", false);
```

<br>

### radio (button) elements

```html
<input type="radio" name="optionsRadios" id="optionsRadios1" value="option1"> Option One
<input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"> Option Two
```

***Set***
```js
$('input[name=optionsRadios][value=' + 'option2' + ']').prop("checked", true ); // set "option 2" to checked
```

***Get***
```js
$('input[name=optionsRadios]:checked').val(); // get the value of the checked "optionsRadio"
```

***Clear***
```js
$('input[name=optionsRadios]').prop("checked", false);
```

<br>

### textarea elements

```html
<textarea class="form-control" rows="3" id="textarea1"></textarea>
```

***Set***
```js
$("#textarea1").val("from jQuery"); // set to "from jQuery"
```

***Get***
```js
$("#textarea1").val();
```

***Clear***
```js
$("#textarea1").val("");
```

<br>

### select (single / multiple) elements

```html
<select class="form-control" id="select1">
    <option value="">Please Select</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
    <option value="4">Four</option>
    <option value="5">Five</option>
</select>
<select multiple="" class="form-control" id="select2">
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
    <option value="4">Four</option>
    <option value="5">Five</option>
</select>
```

***Set***
```js
$("#select1").val(3); // set to "Three"
$("#select2").val([4,5]); // set to "Four" and "Five"
```

***Get***
```js
$("#select1").val();
$("#select2").val();
```

***Clear***
```js
$("#select1").val("");
$("#select2").val("");
```

<br>

## jQuery & Bootstrap

The Bootstrap UI framework has become so instrumental in the construction of modern, responsive web apps; largely due to its execellent design patterns, modern tooling and wealth of online resources and templates.  However, we have only really used its CSS (and minimal) JavaScript capabilities.  In order to unlock Bootstrap's full potential as a UI/UX framework, is to familiarize ourselves with the interactive UI components and the jQuery API used to invoke/manipulate them.  

As we have seen, we don't necessairly need to touch any JS code to make use of some of the interactive components.  The bootstrap framework uses jQuery in an unobtrusive way, by utalizing '**data-**' attributes, ie:

```html
<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
  Launch demo modal
</button>
```

However, what if we wish to launch a modal window at a different (unknown) time? For example; when an Ajax request completes?  This is where the [Programmatic API](https://getbootstrap.com/docs/3.4/javascript/#js-programmatic-api) comes in to play. It gives us more power and flexability to work with the components.

Using the API we can interact with all of Bootstrap's JavaScript components programmatically (from JavaScript).  The following examples illustrate how we can use the API to take advantage of some of Bootstraps most useful components:

<br>

### Modal Window

Arguably one of the most important elements in modern UI/UX design is the "modal" window.  We can use it to display error/success warnings or focus the user's attention on a specific task.

See: [https://getbootstrap.com/docs/3.4/javascript/#modals](https://getbootstrap.com/docs/3.4/javascript/#modals)

```js
$('#myModal').modal({ // show the modal programmatically
    backdrop: 'static', // disable clicking on the backdrop to close
    keyboard: false // disable using the keyboard to close
});
````

<br>

### Button States

Although, technically deprecated, the 'loading' and 'reset' button states are simple way to programmatically enable/disable a button while at the same time, changing its text.  This is useful in cases where clicking the button makes an Ajax request and we wish to disable the button until the request has completed.

The 'toggle' state is not deprecated and provides a quick way to show a button as 'pressed'.   

See: [https://getbootstrap.com/docs/3.4/javascript/#buttons-stateful](https://getbootstrap.com/docs/3.4/javascript/#buttons-stateful) and also: [https://getbootstrap.com/docs/3.4/javascript/#buttons-methods](https://getbootstrap.com/docs/3.4/javascript/#buttons-methods)

```js
$("#loadingDelay").button('loading'); // switch to a disabled 'loading' state
$("#loadingDelay").button('reset'); // reset the button state
$("#loadingDelay").button('toggle'); // toggles 'push' state
```

<br>

### Popovers

Popovers are like a tooltip, however they have their own title bar, and are capable of rendering HTML content.  If we wish to use these components, we must 'opt-in' by using the following "popover" method in JavaScript.  The full list of options provided can be found here: [https://getbootstrap.com/docs/3.4/javascript/#popovers-options](https://getbootstrap.com/docs/3.4/javascript/#popovers-options)

See: [https://getbootstrap.com/docs/3.4/javascript/#popovers-usage](https://getbootstrap.com/docs/3.4/javascript/#popovers-usage)

```js
$("#dynamicPopover").popover({
    template: `<div class="popover" role="tooltip"><div class="arrow"></div> 
              <h3 class="popover-title"></h3><div class="popover-content"></div></div>`,
    title: 'Tooltip Title',
    content: 'Lorem ipsum dolor sit amet',
    placement: 'top',
    trigger: 'click'
});
```

<br>

### Alerts

Alerts are small messages that take the form of "**success**", "**information**", "**warning**", or "**danger**".  The template for creating alerts is fairly consistant, ie:

```js
let $warningAlert = $(`<div class="alert alert-warning alert-dismissible fade in" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                        <strong>Warning</strong> ${alertMessage}
                    </div>`);
```
We can use this to create alert messages on the fly and .append() them to our page whenever we wish to alert the user.  

Unlike the modal window, these small messages don't block the UI and don't demand any action from the user, except to explicitly close them.  We can however, get around this limitation by using the .alert('close') method after a certain amount of time:

```js
setTimeout(function(){
    $warningAlert.alert('close'); 
},3000);
```

See: [https://getbootstrap.com/docs/3.4/javascript/#alerts-methods](https://getbootstrap.com/docs/3.4/javascript/#alerts-methods)

<br>






