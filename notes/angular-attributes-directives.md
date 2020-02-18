---
title: Attribute Binding & Directives
layout: default
---

## Attribute, Class & Style Binding

> **Quick Note:** Some of the below code examples and explanations have been reproduced from sections of the [official online documentation](https://angular.io/) for Angular. 

Last week we introduced the notion of "Property Binding", ie: the `[prop]="expression"` syntax used to set the value of a specific "property" of an html element or component (configured using the [@Input()](https://angular.io/api/core/Input) decorator). 

Today we will expand on this idea and introduce "Attribute Binding".  You will recall that not all HTML *attributes* necessarily match to DOM *properties*.  Take "colspan", for example: If we tried to use "Property Binding" to dynamically set the "colspan" value in the following example:

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

We would get the following error, preventing our template to render correctly in the browser:

```
Can't bind to 'colspan' since it isn't a known property of 'th'.
```

To solve this issue, we use "Attribute Binding"

> Attribute binding syntax resembles property binding, but instead of an element property between brackets, start with the prefix attr, followed by a dot (.), and the name of the attribute. You then set the attribute value, using an expression that resolves to a string, or remove the attribute when the expression resolves to null.

Therefore, to fix the above error, we simply update the ```<th>``` "Property Binding" syntax to start with "attr.", ie:

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

One important attribute that we often set dynamically is "class".  We frequently add or remove classes dynamically from the space-separated list of classes defined using "class".  In vanilla JavaScript, we would use the "classList" property's "add" and "remove" methods, ie:

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

### Style Binding

If we wanted to accomplish the same thing using the "style" attribute instead, we must use a slightly different syntax.  For example, if we wanted to set the "background-color" of one of our cells in the above table to "lightgrey", the regular HTML "style" attribute would look like:

```html
<td style="background-color: lightgrey" >Column 1</td>
```

If we wish to pull the "backckground-color" value dynamically from a property in our component (for example "grayBackground"), we can we can use the following "Style Binding" code:

```html
<td [style.background-color]="grayBackground" >Column 1</td>
```

We can also conditionally add or remove the above style using the ternary operator in JavaScript.  For example, let's say that the "background-color" should only be set to the value of the "grayBackground" property if a 2nd property: "showBackground" is true.  In this case, we can update our previous example to use the following code:

```html
 <td [style.background-color]="showBackground ? grayBackground : null" >Column 1</td>
 ```

<br>

### Built-in Structural Directives

We must not forget to include the extremely useful built-in attribute and structural directives in our list.  Using built-in directives like \[ngClass\], \*ngIf, \*ngFor, and \[ngSwitch] / \*ngSwitchCase, we can control how our data is displayed, based on it's current value:

* ["Built-in Attribute Directives"](https://angular.io/guide/template-syntax#built-in-attribute-directives)
* ["Built in Structural Directives"](https://angular.io/guide/template-syntax#built-in-structural-directives)



### Building Custom Directives

<br>
