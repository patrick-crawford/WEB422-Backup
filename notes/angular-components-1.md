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

However, because the "title" property was assigned a value of type *string*, the type was implied.  If we did not have a default value for *string* the code would instead look like:

```typescript
title: string;
```

As expected, the value of **this.title** is undefined.  However, unlike regular JavaScript, if we decide to assign "title" a number value later, we will actually get an error,  ie:

```javascript
this.title = 5;
```

will give the following error:

```terminal
error TS2322: Type '5' is not assignable to type 'string'.
```

Welcome to "types" for JavaScript!

We have also included a decorator (in this case it's the [@Component()](https://angular.io/api/core/Component) decorator). It has one parameter, which is an object composed of configuration information as key-value pairs. This object is *metadata*, and the Angular runtime uses the metadata when initializing the component. 

One of the decorator's properties is a *template* (or *templateUrl*), defines the *appearance* of the component. The template includes HTML, or the name of an HTML file. By definition, HTML is the language of the Angular template. Almost all HTML elements are valid in a template, except for these: `html`, `body`, `base`, and `script`.

Another decorator property is the *selector*. Its value is the name of the custom HTML element in the *parent* template that becomes the component. In the above example, you will see the following component in the "src/index.html" file:

```html
<app-root></app-root>
```

This is the component that is rendering our default page.  Think it as Angular's equivalent of the react ```<App />``` component.

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

will not only perform the tasks outlined above, but also provide us with an empty ".css" (or ".scss", ".less", etc. depending on your configuration ) file and include it in our new component decorator.  If we choose to add styles in one of our "styleUrls", it is important to note that all of the styles are automatically [scoped to the related component](https://angular.io/guide/component-styles#style-scope), ie "The styles specified in @Component metadata apply only within the template of that component".

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

* Similairly, the "selector" has been created to reflect the name of our component.  However, it included the "app" prefix also to adhere with Angular's Coding Style Guide.

* The ngOnInit() [lifecycle hook](https://angular.io/api/core/OnInit) has been included: (**NOTE:** our component should also implement the [OnInit interface](https://angular.io/api/core/OnInit)).  For our purposes, it will function similairly to React's "componentDidMount()" lifecycle method in that we will use it to update our component with data either locally, or from a remote resource (via a "service").

* Finally the **foo.component.html** file has been created and updated to show `<p>foo works!</p>`.  We will actually get this customized default for every component created with "ng generate component ..."

<br>

### Adding the new component to the view

Before we go ahead and add our newly created "FooComponent" to our "app", let's follow the advice given in the **app.component.html** file and 

> "Delete the template below to get started with your project".

Once this is complete, add the `<app-foo></app-foo>` element (corresponding to the "selector" property in the FooComponent @Component decorator) to your **app.component.html** file and "serve" your application again, if it's not already running.  This should cause "foo works!" to be rendered in the browser.

Congratulations - you have added your first component in Angular!

<br>

### Using "Templates" in your components

As we have seen, Angular components use a separate ".html" file to indicate "template" for the component.  However, we know that there is a relationship between the properties within the **class** of the component and the **template** itself.  We saw this when we updated the "title" property of our AppComponent back in the "Getting started with Angular" documentation. This was done by using a special syntax for Angular templates called "Interpolation".

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

Next, let's use "interpolation" to include these values as template expressions within our *foo.component.html* file one at a time:

```html
<p>Student Name: {% raw %}{{ studentName }}{% endraw %}</p>
```

TODO: Explanation

```html
<div><img src="{% raw %}{{studentPhoto}}{% endraw %}"></div>
```

TODO: Explanation

```html
<p>Student Updated: {% raw %}{{studentUpdated.toLocaleDateString()}}{% endraw %}</p>
```

TODO: Explanation


IDEAS: 

NOTE: Maybe add a function to the class and call it before we do property binding ? then do "Template Statements" which are events...

maybe end with structural directives (ie: a loop that loops through an array of objects specified using a class)








<hr /><hr />
[OLD STUFF HERE]

From the example above, we have seen how we can add multiple components as children of a parent component.  However, these were simply "static" components (i.e. their content is hardcoded into the .html).  If we wish our "template" (.html file) to reference values within its corresponding component, we need to reference them using the following techniques:

* [Interpolation](https://angular.io/guide/template-syntax#interpolation-)
* [Template Expressions](https://angular.io/guide/template-syntax#template-expressions) / [Property Binding](https://angular.io/guide/template-syntax#property-binding--property-)
* [Template Statements](https://angular.io/guide/template-syntax#template-statements)
* [Attribute, class, and style bindings](https://angular.io/guide/template-syntax#attribute-class-and-style-bindings)

Essentially, the above logic is really referring to specific types of ["Binding Syntax"](https://angular.io/guide/template-syntax#binding-syntax-an-overview). 

Note:  We will save ["Two-way binding"](https://angular.io/guide/template-syntax#two-way-binding---) until we discuss forms in Angular.

<br>

NOTE::: THIS SHOULD BE IN THE NEXT WEEK!!!

#### Quick "directive" overview

A *directive* is an Angular class. It interacts with HTML elements in the browser DOM. There are three kinds of directives:
1. Components — directives that have an HTML template
2. Structural directives — they change the DOM layout by adding and removing DOM elements
3. Attribute directives — change the appearance or behavior of an element

Components are the most common kind of directive. 

[Directives overview](https://angular.io/guide/attribute-directives#directives-overview)

**Built-in directives**

* [Built-in attribute directives](https://angular.io/guide/template-syntax#built-in-attribute-directives)
* [Built-in structural directives](https://angular.io/guide/template-syntax#built-in-structural-directives) e.g. `ngIf`, `ngFor`, etc.)

**Building a simple "attribute" directive**

A topic for more advanced scenarios:

* [Build a simple attribute directive](https://angular.io/guide/attribute-directives#build-a-simple-attribute-directive)

<br>