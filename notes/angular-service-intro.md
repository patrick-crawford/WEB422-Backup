---
title: Angular Services Introduction
layout: default
---

## Angular Services - Introduction

An Angular *service* is a code asset that performs a task. It does not have a user interface. Often its main task is to perform data service operations (e.g. fetch, add, edit, transform). 

A service can be used by *any* of your app's components. Its use promotes a layered system architecture, also known as a [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns). Enables you to write the code once, and use it in many places. 

<br>

### More about components, and the role of services

Consider a scenario where an app has many components. Some of the components need to display data stored in a database on a server. The data could be fetched in a couple of ways:

1. Wrong way - add the same data-handling code to each component (so that multiple components have the same repeated block of data-handling code)

2. Right way - add the data-handling code to a single *service*, and then call the service from each component

A component should be lean and focused. Its job is to enable the user experience and nothing more. It mediates between the *view* (rendered by the template) and the *application logic* (which often includes some notion of a model). A good component presents properties and methods for data binding. It delegates everything nontrivial to services.

Angular helps you follow these principles by making it easy to place your application logic within services and make those services available to components through dependency injection.

<br>

### Adding a service to an app

We can use the Angular CLI to add a service. In the example below, a service named "DataManager" is added to the app:

```
ng g s DataManager
```

As you have seen when creating components, a CamelCase name is transformed into lower case with dash word separators, when it generates the source code files. 

A new source code file is created, named `data-manager.service.ts`. Its contents:

```js
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor() { }
}
```

The `@Injectable()` decorator indicates that this service is intended to be "injected" into another component or service at runtime. We'll have more to say about "injection" soon. 

<br>

### What's in a Service?

The primary task is to write a function, in the service, that can be called by a component. The function will do something with data. In our simple getting-started examples, it will *deliver* data to the component. (Then, the component can display/render the data in its user interface.)

<br>

### Use a Service

A service can be used by *any component*. There are typically about four coding tasks to be done in the component class, and then another in its HTML template. The four tasks are:

* **Import statement**: As you would expect, we must `import` the service, to be able to use its members. 

* **Constructor parameter**: We "inject" the service into the constructor, as a parameter. More about this in the next section. 

* **Property to hold the data**: The main goal of our getting-started work is to work with data. Therefore, a component will need one or more properties to hold the results of a call to the service. 

* **Get the data**: In our examples, we will fetch the data when the component is loaded/initialized. Later (but soon), we'll learn how to fetch data as the result of user interaction. 

Incidentally, the HTML template coding task will require us to add/edit elements to display/render the data that was fetched. 

<br>

### Dependency Injection

Above, you were introduced to the `@Injectable` decorator, which indicates that a service is intended to be "injected" into another component or service at runtime. 

The Angular system is has dependency injection (DI) built in. It includes an "Injector", which is a module that knows about and maintains a container of **service**  ([singletons](https://angular.io/guide/singleton-services)) that it has previously created. A service is created when it is accessed for the first time.

The idea behind dependency injection is very simple. You have a component that depends on a service. In the component's code, you do not create that service yourself. Instead, you request one in the constructor (as a parameter - see: ["Parameter Properties"](https://www.logicbig.com/tutorials/misc/typescript/parameter-properties.html)), and the framework will provide you one. This leads to more decoupled code.

<br>

### A Simple Service Example

So far, we have created a single "DataManagerService".  Why don't we add a function to return a simple piece of data, ie: a "Post":

```ts
interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}
```

To ensure that the "Post" type can be used across multiple files, we should place it in a separate file from our service (ie: "Post.ts"). 

**Note**:  Do not forget to "export" the interface once it's placed in its own file.

Once "Post.ts" is created (in this case, in the "src/app" directory), we must import it into our DataService.  While we're at it, let's also create a method to return a single, hard-coded "Post" object:

```js
import { Injectable } from '@angular/core';
import { Post } from './Post';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor() { }

  getStaticPost(): Post{ // return type "Post"
    return {
      userId: 1,
      id: 1,
      title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }
  }
}
```

In the above example, you will notice that our function "getStaticPost" has a return type of "Post".  This is important, as the code using this service can be assured of the exact "shape" of the data returned.

To test this service, let's "inject" it into our App component and display the data in its template:

**app.component.ts**

```typescript
import { Component, OnInit } from '@angular/core';
import { DataManagerService } from './data-manager.service'
import { Post } from './Post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  staticPost: Post = {} as Post; // cast the empty object as type "Post"

  constructor(private data: DataManagerService){ }

  ngOnInit(){
    this.staticPost = this.data.getStaticPost()
  }
}
```

Notice that we have made some key changes to the AppComponent (above), primarily:

* We had to correctly import both the "DataManagerService" and the "Post" class, since our DataManagerService only returns "Post" data.  

* We have created a "staticPost" property (type "Post") within our AppComponent class to store the data retrieved from the service so that it can be rendered in the template (app.component.html).

* You will also notice that we have finally made use of the "constructor".  Here, we "inject" the "DataManagerService" using the aforementioned ["Parameter Properties"](https://www.typescriptlang.org/docs/handbook/classes.html#parameter-properties) syntax.  Essentially, using this syntax, we can get a reference to the "DataManagerService" (stored in our Component as the variable "data").

* Finally, we invoke our service method "getStaticPost" within the ngOnInit method to retrieve the data and store it within the "staticPost" property of the Component.

**app.component.html**

```html
<h1>Static Post</h1>

<table border="1">
  <tr>
    <th>ID</th>
    <th>User ID</th>
    <th>Title</th>
    <th>Body</th>
  </tr>
  <tr>{% raw %}
    <td>{{staticPost.id}}</td>
    <td>{{staticPost.userId}}</td>
    <td>{{staticPost.title}}</td>
    <td>{{staticPost.body}}</td>
  {% endraw %}</tr>
</table>
```

<br>
