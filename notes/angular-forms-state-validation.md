---
title: Angular forms "State" &amp; Validation
layout: default
---

## Angular Forms - Element "State" &amp; Validation

### Tracking the "state" of elements using CSS classes

If we use the integrated Developer tools in the browser when testing a template-driven form with  (ie: our "Driver" form from [Angular Forms Introduction](angular-forms-intro)), we will notice that there are CSS classes that get added or removed as we edit the data.  The below table (from the [documentation](https://angular.io/guide/forms#track-control-state-and-validity-with-ngmodel)) illustrates the meanings of each class added.

<table>
<tbody>
<tr>
<th>State</th>
<th>Class if true</th>
<th>Class if false</th>
</tr>
<tr>
<td>The control has been visited.</td>
<td>ng-touched</td>
<td>ng-untouched</td>
</tr>
<tr>
<td>The control's value has changed.</td>
<td>ng-dirty</td>
<td>ng-pristine</td>
</tr>
<tr>
<td>The control's value is valid.</td>
<td>ng-valid</td>
<td>ng-invalid</td>
</tr>
</tbody>
</table>

By using CSS to track the "state" we can now *style* the elements that have not yet been visited / changed or are invalid,  to create a richer and more interactive user experience.

<br>

#### "Valid" Form elements

You will notice that there is a notion of "validity" with a form element, but what exactly makes a form element "valid"? - what controls those CSS classes?  Recall way back in WEB222 when we disused [HTML5 attribute / constraint based validation](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation) 

> Angular uses directives to match these attributes with [validator](https://angular.io/api/forms/Validators) functions in the framework.
> 
> Every time the value of a form control changes, Angular runs validation and generates either a list of validation errors, which results in an INVALID status, or null, which results in a VALID status.
> 
> You can then inspect the control's state by exporting ngModel to a local template variable.

The validation attributes currently supported are as follows:

**[required](https://angular.io/api/forms/RequiredValidator)**
```html
<input type="text" name="name" required>
```
**[pattern](https://angular.io/api/forms/PatternValidator)**
```html
<input type="text" name="name" pattern="[a-zA-Z ]*">
```
**[maxlength](https://angular.io/api/forms/MaxLengthValidator)**
```html
<input type="text" name="name" maxlength="45">
```
**[minLength](https://angular.io/api/forms/MinLengthValidator)**
```html
<input type="text" name="name" minlength="2">
```
**[email](https://angular.io/api/forms/EmailValidator)**
```html
<input type="text" name="email" email>
```

Any other validation task (ie: "min" value for a type="number") will need to be created as a [Custom Validator](https://angular.io/guide/form-validation#custom-validators), however this is beyond the scope of the lecture today. 

If we wish to display a message for a specific type of error, we must first include a [template reference](https://angular.io/guide/template-syntax#template-reference-variables-var) to the element we want using a property (variable) name, beginning with "#" and taking the value of "ngModel".  For example, if we wish to add "template reference variable" called "name" to the "name" field from our example, we use the syntax: **#name="ngModel"**:

```html
<input type="text" class="form-control" name="name" [(ngModel)]="driverData.name" required autofocus #name="ngModel">
```
we can then access its "error" property, ie: **name.error**.  For a quick glimpse at what error properties get applied, we can place the following diagnostic output somewhere near the "name" control:
{% raw %}
```html
{{name.errors | json}}
```
{% endraw %}
This will initially show "null" as the text "Richard Hammond" is currently entered.  However, if we delete the text, we will see 

```js
{ "required": true } 
```

appear in our diagnostic code.  We can then use this to conditionally show a warning the moment the user violates the validation rule, using the code:

```html
<div *ngIf="name.errors?.required">
  <strong>Warning:</strong> "Full Name:" is required.
</div>
```

**Note:** Notice the "?." operator used here.  This is known as the "[Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)" operator.  

> The optional chaining operator ?. permits reading the value of a property located deep within a chain of connected objects without having to expressly validate that each reference in the chain is valid (ie: not null or undefined).

<br>

Similarly, if we wish to conditionally add a class if a field is "invalid", we can leverage the "valid" property of the reference variable, ie:

```html
<label class="control-label" for="name" [class.text-danger]="!name.valid">Full Name:</label>
```

<br>