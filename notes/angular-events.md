---
title: Events
layout: default
---

## Events in Angular

Recall during our discussion of React, we discussed how we can pass a "callback" function from a parent component to a child component via its "props".  The idea here was to enable the child component to communicate to the parent component that some important event had occurred.  This might be that a specific piece of data was viewed by the user, or some code was executed that needed to be logged, etc. 

While this can still be done in Angular (ie: using the "@Input()" decorator to receive a property containing a callback).  We will instead leverage the "@Output()" decorator (since the child component is really sending data "out"), as well as Angular's excellent [EventEmitter](https://angular.io/api/core/EventEmitter) (which we will use later on as well).

To begin, let's set up a situation where a child component contains one or more buttons.  Whenever one of these buttons is clicked, the child component communicates to the parent component that such an event has occurred.  It will be up to the parent component to watch for this occurrence and log it to the UI or Console whenever it happened.

<br>

### Coding the ChildComponent

The main purpose of our child component is to provide two buttons that when clicked, cause the whole component to emit an event that one of the buttons was indeed clicked. Additionally, the event should provide a message indicating *which* button was clicked.  To set this up, we must do a few things:

**@Output() Decorator** 

Decide on a name of your event and add it to your component as a property with the `@Output()` decorator.  In our example, we will call the event "btnClicked". **Note:** do not forget to include "Output" in your import statement from "@angular/core" at the top of the component.ts file.

```typescript
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Output() btnClicked;

  constructor() { }

  ngOnInit() {
    
  }

}
```

**new EventEmitter()**

Our btnClicked property will actually be an instance of Angular's ["EventEmitter" class](https://angular.io/api/core/EventEmitter).  Therefore, we must "import" it from *'@angular/core'* as well as use it to create our btnClicked emitter:

```typescript
@Output() btnClicked = new EventEmitter();
```

**Emitting the events**

With our btnClicked EventEmitter in place, we are all set to emit events.  It's just a matter of where and when we will emit them. In our case, we will have two buttons that when clicked, will emit the event.  Therefore, we will place the code within each button's click handler code:

```typescript
btnOneClicked(){
    this.btnClicked.emit("Button One Clicked");
}

btnTwoClicked(){
    this.btnClicked.emit("Button Two Clicked");
}
```

Here, we are assuming that in the template, button one will invoke "btnOneClicked()" on its "(click)" event and button two will invoke "btnTwoClicked()" on its "(click)" event.  In each case we emit the event by invoking the ["emit" method](https://angular.io/api/core/EventEmitter#emit) on the EventEmitter and pass a value to be logged by the parent component.

<br>

### Coding the ParentComponent

Now that the child component is complete we can add it to the parent component and start recording events.  To achieve this, we must first add the child component to the template with the following assumption:

> It will emit the event **btnClicked**

As such, we can use the same syntax that we use for any element that emits an event - **event binding**.

**Including the Child Component in the Parent Template**

In the template of the parent component, add the Child component (ie: `<app-child></app-child>`) using the following syntax, assuming that the "event handler" will be called "logClick" (below):

```html
<app-child (btnClicked)="logClick($event)"></app-child>
```

Notice how we used regular event binding syntax for our custom event?  Also, we have invoked the method with "$event" - this value will contain the message emitted by the "btnClick" event (in our Child Component).

**Writing the Event Handler Function in the Parent**

Finally (in the parent component), write an event handler that will be executed whenever our child component emits *btnClicked*.  For example:

```typescript
logClick(msg){
   console.log(msg);
}
```
<br>

**Success!** our child component has informed the parent component that a button click event has occurred as well as some detail on which button was clicked for the log.

<br>
