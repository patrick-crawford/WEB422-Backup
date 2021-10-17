---
title: Attribute Binding & Directives
layout: default
---

## Attribute, Class & Style Binding

> **Quick Note:** Some of the below code examples and explanations have been reproduced from sections of the [official online documentation](https://angular.io/) for Angular. 

Last week we introduced the notion of "Property Binding", ie: the `[prop]="expression"` syntax used to set the value of a specific "property" of an html element or component (configured using the [@Input()](https://angular.io/api/core/Input) decorator). 

Today we will expand on this idea and introduce "Attribute Binding".  You will recall that not all HTML *attributes* necessarily match to DOM *properties*.  Take "colspan", for example: If we tried to use "Property Binding" to dynamically set the "colspan" value with a property in our component class:

```html
<table class="table">
    <thead>
        <tr>
            <th [colspan]="headerSpan">Table Header</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Column 1</td>
            <td>Column 2</td>
        </tr>
    </tbody>
</table>
```

We would get the following error, preventing our template from rendering correctly in the browser:

```
Can't bind to 'colspan' since it isn't a known property of 'th'.
```

To solve this issue, we use "Attribute Binding"

> Attribute binding syntax resembles property binding, but instead of an element property between brackets, start with the prefix attr, followed by a dot (.), and the name of the attribute. You then set the attribute value, using an expression that resolves to a string, or remove the attribute when the expression resolves to null.

Therefore, to fix the above error, we simply update the ```<th>``` "Property Binding" syntax to start with ```attr.```, ie:

```html
<table class="table">
    <thead>
        <tr>
            <th [attr.colspan]="headerSpan">Table Header</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Column 1</td>
            <td>Column 2</td>
        </tr>
    </tbody>
</table>
```

This is important to remember if you ever come across the "isn't a known property" error (as above).

<br>

### Class Binding 

One important attribute that we often set dynamically is "class".  We frequently add or remove classes dynamically from the space-separated list of classes (defined using the "class" attribute).  In vanilla JavaScript, we would use the "classList" property's "add" and "remove" methods, ie:

```javascript
// add
document.getElementById("someId").classList.add("someClass");

// remove
document.getElementById("someId").classList.remove("someClass");
```

In Angular, we can use a special "class" binding syntax to conditionally add or remove a class from the list of classes for an element using an expression. 

> Angular adds the class when the bound expression is truthy, and it removes the class when the expression is falsy 

For example, if we wanted to conditionally add the bootstrap "table-warning" class if a "showWarning" property is true, we can update our above template as follows:

```html
<tr [class.table-warning]="showWarning">
```


**NOTE:** If you wish to add or remove several CSS classes simultaneously, you can use [ngClass](https://angular.io/api/common/NgClass).

<br>

### Style Binding

If we wanted to accomplish a similar task using the "style" attribute instead, we must use a slightly different syntax.  For example, if we wanted to set the "background-color" of one of the cells in the above table to "lightgrey", the regular HTML "style" attribute would look like:

```html
<td style="background-color: lightgrey" >Column 1</td>
```

If we wish to pull the "backckground-color" value dynamically from a property in our component (for example "grayBackground"), we can we can use the following "Style Binding" code:

```html
<td [style.background-color]="grayBackground" >Column 1</td>
```

We can also conditionally add or remove the above style using the ternary operator in JavaScript.  For example, let's say that the "background-color" should only be set to the value of the "grayBackground" property if a 2nd property ("showBackground") is true.  In this case, we can update our previous example to use the following code:

```html
 <td [style.background-color]="showBackground ? grayBackground : null" >Column 1</td>
 ```

 **NOTE:** If you wish to set many inline styles at the same time, you can use [ngStyle](https://angular.io/api/common/NgStyle).

<br>

### Built-in Structural Directives

In Angular, a directive is essentially a custom attribute that can be used on an element or component to help manipulate the DOM or change the appearance or behaviour of an element, component or another directive.

For our purposes, we will specifically be studying "Structural Directives" as they will help us dynamically manipulate the HTML layout, ie:

> They shape or reshape the DOM's structure, typically by adding, removing, or manipulating elements. <br><br> As with other directives, you apply a structural directive to a host element. The directive then does whatever it's supposed to do with that host element and its descendants. <br><br>Structural directives are easy to recognize. An asterisk (\*) precedes the directive attribute name.  

<br>

In the following examples, we will assume that our component contains a single "users" property, consisting of an array of "User" Objects, specified using the class "User":

```typescript
class User{
  firstName: string = "";
  email: string = "";
  age: number = 0;
  language: string = "";
  active: boolean = false;
}
```

Declared in the component using the syntax:

```typescript
users: Array<User> = [] // "User" Data here
```

<br>

### *ngFor

The ["*ngFor"](https://angular.io/api/common/NgForOf#ngforof) directive is used to render the "host element" once for every element in a provided collection using the syntax: ```"let x of y"```, where: ```"y"``` is a collection and ```"x"``` is the element that exists in the current iteration. 

For example, if we wanted to render our "users" collection in a table format, we could use the code:

```html
<table class="table">
    <thead>
        <tr>
            <th>First Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>First Language</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let user of users">
            <td>{%raw%}{{user.firstName}}{%endraw%}</td>
            <td>{%raw%}{{user.email}}{%endraw%}</td>
            <td>{%raw%}{{user.age}}{%endraw%}</td>
            <td>{%raw%}{{user.language}}{%endraw%}</td>
            <td>{%raw%}{{user.active}}{%endraw%}</td>
        </tr>
    </tbody>
</table>
```

Notice how the "host element" is the ```<tr>``` element, which means that it will repeat once for ever "user" in the "users" collection.  The children of this element will all have access to the working object for the iteration (specified as "user").

If you wish to reference the current index of the iteration or know whether or not the current iteration is even or odd, etc.  Angular provides a number of "local variables" that can be declared alongside the ```"let x of y"``` syntax.  For more information see the [full list of options](https://angular.io/api/common/NgForOf#local-variables).


<br>

### \*ngIf

The ["\*ngIf"](https://angular.io/api/common/NgIf#ngif) directive is used to conditionally render a "host element".

> \*ngIf is a structural directive that conditionally includes a template based on the value of an expression coerced to Boolean. When the expression evaluates to true, Angular renders the template provided in a then clause, and when false or null, Angular renders the template provided in an optional else clause. The default template for the else clause is blank.

The "template" in this case is the element that the "*ngIf" directive is placed on.  For example, instead of outputting "true" or "false" for ```"user.active"```, let's instead output the text "active" or "inactive":

```html
<td *ngIf="user.active">Active</td>
<td *ngIf="!user.active">Inactive</td>
```

In the above example, we will either render ```"<td>Active</td>"``` or ```"<td>Inactive</td>"``` depending on the value of ```"user.active"```.

<br>

### [ngSwitch] / \*ngSwitchCase

The final structural directive(s) that we will discuss are the ["[ngSwitch]"](https://angular.io/api/common/NgSwitchCase) / ["\*ngSwitchCase"](https://angular.io/api/common/NgSwitchCase) directives.  These are used in conjunction to provide an experience similar to a regular switch / case statement in your code. 

Officially, the "[ngSwitch]" directive is described as:

> A structural directive that adds or removes templates (displaying or hiding views) when the next match expression matches the switch expression.

While the "\*ngSwitchCase" directive is said to:

> Provide a switch case expression to match against an enclosing ngSwitch expression. When the expressions match, the given NgSwitchCase template is rendered. If multiple match expressions match the switch expression value, all of them are displayed.

<br>

To see an example, let's re-write our above ```"user.active"``` example to use a the new directives:

```html
<td [ngSwitch]="user.active">
    <span *ngSwitchCase="true">Active</span>
    <span *ngSwitchCase="false">Inactive</span>
</td>
```

**Note:** If you wish to provide a "default" option, the ["\*ngSwitchDefault"](https://angular.io/api/common/NgSwitchDefault#ngswitchdefault) directive can be used.


<br>
