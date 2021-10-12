---
title: Angular Components Introduction
layout: default
---

## Angular Components Introduction

> **Quick Note:** Some of the below code examples and explanations have been reproduced from sections of the [official online documentation](https://angular.io/) for Angular. 

### What is an Angular component?

A *component* controls a patch of screen (display, UI surface, rectangle) called a *view*. In Angular, this is implmented using a class, with a certain [decorator](https://www.typescriptlang.org/docs/handbook/decorators.html). Let's take a quick look at the **App** Component that was created with our default Angular application:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
}

```

The class is JavaScript, specifically TypeScript. It includes all the code needed for the the component's *behaviour* during its lifetime.  In this case the class only has a single property: title.

The definition and assignment to the "title" property is actually our first line of TypeScript!  It could also have been written like this:

```typescript
title: string = 'my-app';
```

However, because the "title" property was assigned a value of type *string*, the type was implied. If we decide to assign "title" a number value later, we will actually get an error,  ie:

```javascript
this.title = 5;
```

will give the following error:

```terminal
error TS2322: Type '5' is not assignable to type 'string'.
```

Welcome to "types" for JavaScript!

In our file, above the class definition we have also included a decorator (in this case it's the <br>
[@Component()](https://angular.io/api/core/Component) decorator). It has one parameter, which is an object composed of configuration information as key-value pairs. This object is *metadata*, and the Angular runtime uses the metadata when initializing the component. 

One of the decorator's properties is a *template* (or *templateUrl*), which defines the *appearance* of the component. The template includes HTML, or the name of an HTML file. By definition, HTML is the language of the Angular template. Almost all HTML elements are valid in a template, except for these: `html`, `body`, `base`, and `script`.

Another decorator property is the *selector*. Its value is the name of the custom HTML element in the *parent* template that becomes the component. In the above example, you will see the following component in the "src/index.html" file:

```html
<app-root></app-root>
```

This is the component that is rendering our default page.  Think of it as Angular's equivalent of the react ```<App />``` component.

In summary, from the Angular documentation's Fundamentals > Architecture guide:

*The template, metadata, and component together describe a view.*

![Component code + template + metadata = a view](https://angular.io/generated/images/guide/architecture/template-metadata-component.png)

If you are familiar with the MVC or MVVM design patterns, how do they map to Angular code? Well, in Angular:
* The *component* has the code for the *controller* or the *view model*. 
* The *template* has the code for the *view*. 

<br>

### Creating our first Component (Using "ng generate")

In Angular, adding a component manually can be a little tedious.  At a minimum, the following 3 files must be created / edited (assuming our component is called **foo** and we don't wish to use an [inline template](https://angular.io/api/core/Component#template)):

* New **foo.component.ts** file:  This file must specify the component **class** (typescript)
* New **foo.component.html** file:  This file must specify the component **template** (html)
* Edit **app.module.ts** file:  Our new component must be imported and added to the "declarations" array

However, the good news is that the **ng** command can do more than create a starter Angular application for us.  It can also help us add components ([among other things](https://angular.io/cli#command-overview)) to our app automatically!

For example, the command:

```bash
ng generate component foo
```

will not only perform the tasks outlined above, but also provide us with an empty ".css" (or ".scss", ".less", etc. depending on your configuration) file and include it in our new component decorator.  If we choose to add styles in one of our "styleUrls", it is important to note that all of the styles are automatically [scoped to the related component](https://angular.io/guide/component-styles#style-scope), ie "The styles specified in @Component metadata apply only within the template of that component".

If we open up our newly created **foo.component.ts** file, we should see the following code:

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```

This is very simmilar to the "app" component that was created with our default Angular application, however there are a few noteable differences:

* Class name ("FooComponent"):  Obviously, the class name will be different, however it is interesting to note that the suffix "Component" was automatically added. This ensures that our component is named according to Angular's [Coding Style Guide](https://angular.io/guide/styleguide), spedifically: "[Symbols and file names](https://angular.io/guide/styleguide#symbols-and-file-names)".

* Similarly, the "selector" has been created to reflect the name of our component.  However, it included the "app" prefix to adhere with Angular's Coding Style Guide as well.

* The ngOnInit() [lifecycle hook](https://angular.io/api/core/OnInit) has been included: (**NOTE:** our component should also implement the [OnInit interface](https://angular.io/api/core/OnInit)).  For our purposes, it will function similarly to React's "useEffect" hook in that we will use it to update our component with data either locally, or from a remote resource (via a "service").

* Finally the **foo.component.html** file has been created and updated to show `<p>foo works!</p>`.  We will actually get this customized default for every component created with "ng generate component ..."

<br>

### Adding the new component to the view

Before we go ahead and add our newly created "FooComponent" to our "app", let's follow the advice given in the **app.component.html** file and 

> "Delete the template below to get started with your project".

Once this is complete, add the `<app-foo></app-foo>` element (corresponding to the "selector" property in the FooComponent's "@Component" decorator) to your **app.component.html** file and "serve" your application again, if it's not already running.  This should cause "foo works!" to be rendered in the browser.

Congratulations - you have added your first component in Angular!

<br>

### Using "Templates" in your components

As we have seen, Angular components use a separate ".html" file to indicate the "template" for the component.  However, we know that there is a relationship between the properties within the **class** of the component and the **template** itself.  We saw this when we updated the "title" property of our AppComponent back in the "Getting started with Angular" documentation. This was done by using a special syntax for Angular templates called "Interpolation".

<br>

### Interpolation and Template Expressions

Essentially, "interpolation" allows you to incorporate calculated strings into the text between HTML element tags and within attribute assignments. "Template expressions" are what you use to calculate those strings.

For example, let's go ahead and add some properties with default values to our FooComponent class, ie:

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit {

  studentName: string = "Jason Bourne";
  studentPhoto: string = "https://upload.wikimedia.org/wikipedia/en/6/60/Jason_bourne_infobox.jpg";
  studentUpdated: Date = new Date();

  constructor() { }

  ngOnInit() {
  }
}
```

Here, we're using Typescript to add 3 properties to the class and set them to a default value, ie: 

* **studentName**: type: *string*, default value: "Jason Bourne"

* **studentPhoto**: type: *string*, default value: "https://upload.wikimedia.org/wikipedia/en/6/60/Jason_bourne_infobox.jpg"

* **studentUpdated**: type: *Date*, default value: new "Date" object.

We do not technically need to include the types, since we are immediately providing a value to each property (causing the type to be inferred).  However it's a good excuse to see a little more Typescript and start to get used to the syntax.

> **NOTE:** It's important to note before we go on, that whenever a property in a component changes, the view is rendered to reflect the change.  Because of this "change detection" mechanism, we can change the value any of these properties later and see the update reflected in the UI.

Now that we have our data in place, let's use "interpolation" to include these values as template expressions within our *foo.component.html* file one at a time:

<br>

```html
<p>Student Name: {% raw %}{{ studentName }}{% endraw %}</p>
```

When we use the double curly braces in an Angular component, we are technically embedding an "expression" using interpolation.  In the above case,  Angular replaces stuentName with the string value of the corresponding component property.

<br>

```html
<div><img src="{% raw %}{{studentPhoto}}{% endraw %}"></div>
```

In the example above, Angular evaluates the studentPhoto property and fills in the blank, causing the correct image to be displayed.
More generally, the text between the braces is a template expression that Angular first evaluates and then converts to a string.

<br>


```html
<p>Student Updated: {% raw %}{{studentUpdated.toLocaleDateString()}}{% endraw %}</p>
```

In this example, the "toLocaleDateString" method is executed on the "studentUpdated" Date property to produce a string, which is then shown between the curly braces.

<br>


### Property Binding - "Where are the props?"

In React, we spoke at length about "props".  This was how parent-child component communication was accomplished.  In Angular, we have a similar idea.  To begin. we can say that in image example above we updated the "src" *property* of an "img" DOM element node.  Another way of writing the element would be to use the [Property Binding Syntax](https://angular.io/guide/template-syntax#property-binding-property), ie:

```html
<div><img [src]="studentPhoto"></div>
```

In the above example, the brackets [ ] tell Angular to evaluate the template expression.  It's important to note that "Property Binding" flows a value in *one direction*, from a component's property into a target element property. You can't use property binding to read or pull values out of target elements. Similarly, you cannot use property binding to call a method on the target element. If the element raises events, you can listen to them with an event binding (discussed further down).

At this point, you may be thinking, "why use this syntax instead of interpolation?"  For example, the following binding pairs do the same thing:

```html
<p><img src="{% raw %}{{itemImageUrl}}{% endraw %}"> is the <i>interpolated</i> image.</p>
<p><img [src]="itemImageUrl"> is the <i>property bound</i> image.</p>

<p><span>"{% raw %}{{interpolationTitle}}{% endraw %}" is the <i>interpolated</i> title.</span></p>
<p>"<span [innerHTML]="propertyTitle"></span>" is the <i>property bound</i> title.</p>
```

Interpolation is a convenient alternative to property binding in many cases. When rendering data values as **strings**, there is no technical reason to prefer one form to the other, though readability tends to favor interpolation. However: 

> When setting an element property to a **non-string** data value, you ***must use property binding***.

<br>

The "Property Binding" syntax also works well with our notion of parent-child component communication via "props".  In Angular however, the set up is slightly different.  Instead of using the child component constructor to store all of the "props", we must instead add them as properties of the child *class* and add a special [@Input Decorator](https://angular.io/api/core/Input).  For example, let's say that our "foo" component is rendered inside another component called "parent".  In the "ParentComponent" class, we have the following property:

```typescript
studentPhotos: Array<string> = ["https://upload.wikimedia.org/wikipedia/en/6/60/Jason_bourne_infobox.jpg", "https://upload.wikimedia.org/wikipedia/commons/d/d1/Matt_Damon_%28cropped%29.jpg"]
```

**NOTE:** In the code above, you will notice that we have another new line of Typescript.  In this case "*Array&lt;string&gt;*" indicates that the "studentPhotos" array can only contain string values.

Next, in the *template* of the "ParentComponent", we have the following html:

```html
<app-foo [photos]="studentPhotos"></app-foo>
```

Here, we wish to pass the array of "studentPhotos" in the "ParentComponent" to "FooComponent" using "Property Binding".  According to what we have learned from above, this should be fine.  However, how do we access the "photos" property in the "FooComponent"?  The answer is the previously mentioned [@Input Decorator](https://angular.io/api/core/Input).  In this case, we must update our "FooComponent" as follows:

```typescript
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit {

  studentName: string = "Jason Bourne";
  //studentPhoto: string = "https://upload.wikimedia.org/wikipedia/en/6/60/Jason_bourne_infobox.jpg";
  @Input() photos: Array<string> = [];
  studentUpdated: Date = new Date();

  constructor() { }

  ngOnInit() {
  }
}
```

Notice how we had to import "Input" from '@angular/core' as well as add "photos" to our list of properties, preceded by the "@Input()" decorator, which:

> "Marks a class field as an input property and supplies configuration metadata. The input property is bound to a DOM property in the template. During change detection, Angular automatically updates the data property with the DOM property's value."

<br>

Finally, since "photos" is an array, we should change our "foo.component.html" template to use one of the images provided.  For now, let's hard-code the first image, ie:

```html
<img [src]="photos[0]">
```


<br>

### Event Binding ("Template Statements")

In Angular, event binding allows you to listen for certain events such as keystrokes, mouse movements, clicks, and touches.  The syntax consists of a target **event name** within parentheses on the left of an equal sign, and a quoted **template statement** on the right. The following event binding listens for the button's click events, calling the component's toggleImage() method whenever a click occurs:

```html
<button (click)="toggleImage()">Toggle Image</button>
```

If we also want access to the native DOM element event, we can use the following syntax:

```html
<button (click)="toggleImage($event)">Toggle Image</button>
```

Here, we can use $event to access properties such as target ($event.target) or target.value ($event.target.value).  Although in Angular, it's better practice to ["get user input from a template reference variable"](https://angular.io/guide/user-input#get-user-input-from-a-template-reference-variable) (discussed in detail later in this course).

<br>

Continuing from our example above, why don't we use this new syntax to add a button that will let the user toggle between the different student photos in the "photos" array (passed in from ParentComponent).  To accomplish this, we should add a new property on our FooComponent indicating which photo is currently being viewed (ie: "currentPhoto"), as well as a method "toggleImage" to correspond to the "click" event and update the value of "currentPhoto":

```typescript
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent implements OnInit {

  studentName: string = "Jason Bourne";
  @Input() photos: Array<string> = [];
  studentUpdated: Date = new Date();
  currentPhoto: number = 0;

  toggleImage() {
    // increment currentPhoto until we reach the end of the array, then start from 0
    this.currentPhoto = (this.currentPhoto == this.photos.length - 1) ? 0 : this.currentPhoto + 1;
  }

  constructor() { }

  ngOnInit() {
  }
}
```

Finally, let's update our "foo.component.html" template to invoke the "toggleImage" method whenever a button is clicked (Note:  We will not be requiring $event here, so we will not pass it to the function):

```html
<p>Student Name: {{studentName}}</p>
<button (click)="toggleImage()">Toggle Image</button>
<br><br>
<div><img [src]="photos[currentPhoto]"></div>
{% raw %}<p>Student Updated: {{studentUpdated.toLocaleDateString()}}</p>{% endraw %}
```

And there you have it!  Property and Event binding working together to create a simple user interface to swap "student" images in the view on demand.  We were also able to perform some simple top-down communication by storing the array of student photos in a "parent" component (ParentComponent) and passing them to the "child" component (FooComponent) through property binding syntax and the use of the "@Input()" decorator.

Next week we will continue to discuss components as well as introduce structural / attribute [directives](https://angular.io/guide/attribute-directives#directives-overview) and [Routing](https://angular.io/start/routing) in Angular.

Happy Coding!

<br>