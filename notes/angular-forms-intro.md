---
title: Angular forms introduction
layout: default
---

## Angular forms introduction

In recent weeks, we have had a straight-line topic treatment of components, routing, and services. However, we have mostly avoided the topic of *user interaction*, but now it's time to do that, now that we have a good foundation on which to build. 

As the [official Angular documentation](https://angular.io/guide/forms) states, "Forms are the mainstay of business applications. You use forms to log in, submit a help request, place an order, book a flight, schedule a meeting, and perform countless other data-entry tasks."

<br>

### Topic coverage plan

* First, we describe three ways to do forms in Angular. We will use only one, *Template-driven Forms*. 

* Next, we refresh our memory by showing a simple and standard HTML Form. 

* Then, we show how to configure an Angular app to use HTML forms.

* Once the Angular app configured properly, we will add some data in a Component to be used with the form.

* We will then show the changes required to the form as well as each of the standard form elements to "bind" our data (using "two-way" binding) and "submit" the form.

<br>

### Three ways to do forms in Angular

Angular offers *three* ways to do forms:

**[Template-driven](https://angular.io/guide/forms#template-driven-forms)**

This approach takes advantage of your knowledge of, and skills with an HTML template in a component. 

It builds upon your experience with one-way read-only data binding <br>(using `{%raw%}{{ curly braces syntax }}{%endraw%}`), by going further with two-way data binding. 

**[Reactive](https://angular.io/guide/reactive-forms)**

This approach features more programming in the component class, where each element of the form is explicitly declared, configured, and managed. 

We will NOT work with Reactive Forms in this course. After understanding and working with Template-driven Forms, you will be able to learn what you need to, if or when you need to, work with Reactive Forms. 

**[Dynamic](https://angular.io/guide/dynamic-form)**

This approach is interesting, in that metadata on the data model is used to generate forms dynamically. This replaces the cycle of editing in Template-driven Forms, where we go back-and-forth between the component's class code and its HTML template, when developing a form. 

As above, we will NOT work with Dynamic Forms in this course. After understanding and working with Template-driven Forms, you will be able to learn what you need to, if or when you need to, work with Dynamic Forms. 

In this course, we will work only with *Template-driven Forms*.

<br>

### "Standard" HTML Form, without Angular

Here's a simple form, in pure HTML5, which features all of the most typical form elements, ie:
* input (type: "text", "checkbox", "radio")
* textarea
* select (single / "multiple")

It also uses the bootstrap "forms" classes, ie "form-group" and "form-control" for formatting:

```html
<form action="/path/to/handler" method="post">

  <div class="form-group">
    <label class="control-label" for="name">Full Name:</label>
    <input type="text" class="form-control" id="name" name="name" required autofocus>
  </div>

  <div class="form-group">
    <label class="control-label" for="description">Description:</label>
    <textarea class="form-control" id="description" name="description" rows="6"></textarea>
  </div>

  <div class="form-group">
    <label class="control-label" for="ownedTransportation">Owned Transportation:</label>
    <select multiple class="form-control" id="ownedTransportation" name="ownedTransportation">
      <option value="C">Car</option>
      <option value="B">Bus</option>
      <option value="M">Motorcycle</option>
      <option value="H">Helicopter</option>
    </select>
  </div>

  <div class="form-group">
    <label class="control-label" for="favouriteTransportation">Favourite Transportation:</label>
    <select class="form-control" id="favouriteTransportation" name="favouriteTransportation">
      <option value="C">Car</option>
      <option value="B">Bus</option>
      <option value="M">Motorcycle</option>
      <option value="H">Helicopter</option>
    </select>
  </div>

  <div class="form-group">
    <label for="driverLicence" class="control-label">Has a driver's license?</label>
    <div class="checkbox">
        <label><input type="checkbox" id="driverLicence" name="driverLicence" /> Yes, if checked</label>
    </div>
  </div>

  <div class="form-group">
    <label for="" class="control-label">Vehicle usage:</label>
    <div class="radio">
      <label class="control-label" for="vehicleUseBusiness">
        <input type="radio" id="vehicleUseBusiness" name="vehicleUse" value="business" /> Business
      </label>
    </div>
    <div class="radio">
      <label class="control-label" for="vehicleUsePleasure">
        <input type="radio" id="vehicleUsePleasure" name="vehicleUse" value="pleasure" /> Pleasure
      </label>
    </div>
    <div class="radio">
      <label class="control-label" for="vehicleUseOther">
        <input type="radio" id="vehicleUseOther" name="vehicleUse" value="other" /> Other
      </label>
    </div>
  </div>

  <button class="btn btn-primary" type="submit">Create</button>

</form>
```

It's possible that you have written hundreds of these forms. It's a very well-understood process. 

<br>

### Configuring an Angular app to use HTML forms

Before making any changes to the form however, we must first add the Angular "FormsModule" to the "imports" array in our **app.module.ts** file:

1. Import the [FormsModule](https://angular.io/api/forms/FormsModule) from '@angular/forms'
2. Add **FormsModule** to the "imports" array

<br>

### Adding a Component with data (ie: a data model)

Next, we *always assume* that an Angular form is backed by a data model. The model is defined or maintained in the component class. Its data values are *made available to* the form when it is built and rendered, and *updated by* the form during user interaction and submission. 

For example, consider the following Component.  It contains all the data that is required to populate our "Standard" html form, including some class definitions to define the "shape" of the data, as well as some sample data that we can use to "bind" to our form:

```js
import { Component, OnInit } from '@angular/core';

export class Driver{
    name: string = ""; 
    description: string = ""; 
    ownedTransportation: string[] = []; 
    favouriteTransportation: string = ""; 
    driverLicence: boolean = false; 
    vehicleUse: string = ""; 
}

export class Option{
  value: string = "";
  text: string = "";
}

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  constructor() { }
 
  // the data that will be used in the form
  driverData: Driver = {} as Driver;

  // Define the preset list of "transportation" options
  transportationList: Option[] = [
    {value: "C", text: "Car"},
    {value: "B", text: "Bus"},
    {value: "M", text: "Motorcycle"},
    {value: "H", text: "Helicopter"}
  ];

  ngOnInit() {

    // Populate the "driverData" with some static data (this would normally come from a data service)
    this.driverData = {
      name: "Richard Hammond",
      description: "Richard is a motor vehicle enthusiast",
      ownedTransportation: ["C", "M"], 
      favouriteTransportation: "M",
      driverLicence: true, 
      vehicleUse: "pleasure"
    };
    
  }
}

```

There's a lot going on in the above Component, however there's nothing in there that we haven't seen before.  

We define a "Driver" class that will represent the type of data that we will be "binding" to our form so that it can be modified.  We also define a generic "option" class, which is simply defining what our "options" will look like, ie ```{value: "C", text: "Car"}``` - this can be used as an "option" in an "&lt;select&gt;" list or the value / label used in a radio button.

<br>

### "Binding" the data / Form Events

With our component in place we can begin to update the original "Standard" form to work directly with the data using "two-way binding" syntax:

> You often want to both display a data property and update that property when the user makes changes.
>
> On the element side that takes a combination of setting a specific element property and listening for an element change event.
>
> Angular offers a special two-way data binding syntax for this purpose, ```[(x)]```. The ```[(x)]``` syntax combines the brackets of property binding, ```[x]```, with the parentheses of event binding, ```(x)```.
>
> ([https://angular.io/guide/template-syntax#two-way-binding-](https://angular.io/guide/template-syntax#two-way-binding-))

Since we're working with "Forms", Angular actually provides a very handy **NgModel** Directive that we can bind to, so that we can update our data model!

So, every time we have a form element that we wish to "bind" to our Component data, we can use the syntax:

```html
[(ngModel)]='componentProperty'
```

For example, let's see how we can update each of our form element types in our "Simple" form using this syntax, paired with the "DriverComponent" data:

<br>

### input (type="text")

```html
<input type="text" class="form-control" id="name" name="name" [(ngModel)]="driverData.name" required autofocus>
```

Here, we simply add the "two-way" binding syntax with ngModel to reference the "driverData.name" property

<br>

### textarea

```html
<textarea class="form-control" id="description" name="description" [(ngModel)]="driverData.description"></textarea>
```

This is very similar to the **input** example above, ie: we simply add the two-way data binding to ngModel with the correct Component property

<br>

### select / select multiple
{% raw %}
```html
<select multiple class="form-control" id="ownedTransportation" name="ownedTransportation" [(ngModel)]="driverData.ownedTransportation">
        <option *ngFor = "let transportation of transportationList" [value]="transportation.value">{{transportation.text}}</option>
</select>
```
{% endraw %}
{% raw %}
```html
<select class="form-control" id="favouriteTransportation" name="favouriteTransportation" [(ngModel)]="driverData.favouriteTransportation">
          <option *ngFor = "let transportation of transportationList" [value]="transportation.value">{{transportation.text}}</option>
</select>
```
{% endraw %}
The above two examples are practically identical, the only differences are the property that they're binding to and the "multiple" attribute.

You will notice that our ```[(ngMode)]``` binding syntax has not changed, however the method for displaying the `<option>` elements is different.  Here, we use the standard `*ngFor` structural directive, but we have added a **value** property that we can / must set.  

Since both the "ownedTransportation" and "favouriteTransportation properties use the "value" of the transportation, we must use "transportation.value" as the "value" for the `<option>` elements, if we want to correctly bind to the lists

<br>

### input (type="checkbox")

```html
<input type="checkbox" id="driverLicence" name="driverLicence" [(ngModel)]="driverData.driverLicence" />
```

Once again, nothing special here.  We simply bind to ngModel as before.

<br>

### input (type="radio")

```html
<input type="radio" id="vehicleUseBusiness" name="vehicleUse" [(ngModel)]="driverData.vehicleUse" value="business" /> 
<input type="radio" id="vehicleUsePleasure" name="vehicleUse" [(ngModel)]="driverData.vehicleUse" value="pleasure" /> 
<input type="radio" id="vehicleUseOther" name="vehicleUse" [(ngModel)]="driverData.vehicleUse" value="other" />
```

Here, we must place identical ngModel binding on each "radio" button with the same "name" attribute.

As a rule of thumb, whenever you would like to "read from" / "write to" a form using **two-way** binding, always bind to ngModel on a form element that would typically have a "name" property.  

<br />

### Handling the Form "Submission"

Finally, all of our data for "Richard Hammond" should be correctly rendered in the form.  As a way to inspect/test that the two-way binding is working, you can add the following line somewhere below the form:
{% raw %}
```js
{{driverData | json}}
```
{% endraw %}
This will show you how your driverData "data model" is being updated with every change you make in the form!

If we want to handle a form submission event, we simply add the event handler "ngSubmit" to our `<form>` element:

```html
<form (ngSubmit)='onSubmit()'>
```

The above will execute the method "onSubmit" (which we will have to write) when the form is submitted.  If we wish to pass a reference to the specific form to the onSubmit() event handler, we can use 'ngForm' to assign a reference variable (see: [Template Reference Variables](https://angular.io/guide/template-reference-variables)) to the form itself, and pass it to onSubmit(), ie:

```html
<form #f='ngForm' (ngSubmit)='onSubmit(f)'>
```

If we decide to do this, our onSubmit handler will take the form:

```js
onSubmit(f: NgForm): void { }
```

Notice that "f" is type "NgForm"? For this to function properly, we must:

```js
import { NgForm } from "@angular/forms";
```
By passing a reference to the form into onSubmit, we gain access to the aggregate value (`f.value`) and validity status (`f.valid`) of the form, as well as user interaction properties like dirty (`f.dirty`) and touched (`f.touched`).

