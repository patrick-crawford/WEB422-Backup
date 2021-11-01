---
title: Angular Working with Web API
layout: default
---

## Working with a Web API in Angular

Working with a Web API in Angular is different than in React for a couple of reasons.  First, we will primarily be fetching data from within a *service*, rather than directly in a component.  Next, instead of using "fetch", "XMLHttpRequest", or another 3rd party library such as "jQuery" or "axios" to make AJAX requests, we will instead leverage Angular's excellent, built-in "HttpClient" service.  

However, before we can begin to work with "HttpClient", we must first discuss the concept of an "Observable".  This is the return type of the methods exposed from the "HttpClient" service.  It is essentially an alternative to Promises for handling asynchronous code, however it's extremely powerful and gives us more control over the data.

<br>

### Observable (from RxJS) Introduction

**R**eactive E**x**tensions for **J**ava**S**cript ([RxJS](http://reactivex.io/rxjs/)) is a library that comes bundled with the Angular toolchain.

> "RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code."

This sounds like exactly what we need - something to "make it easier to compose **asynchronous** code".  However, you might be thinking "we have that already, it's called a **Promise**".  This is true, Promises do help us manage asynchronous code; they do so by giving us an opportunity to perform a task / queue up a follow up Promise to be executed upon the completion or failure of the first piece of asynchronous code (Promise).  By writing functions that return promises, we can enforce an order of execution for asynchronous code while avoiding the use of callbacks, which tend to lead to ["Callback Hell"](http://callbackhell.com/).

Observables on the other hand, allow us to watch (observe) the changing values of data over time and execute code when these changes occur.  For example:

```js
import { Observable } from 'rxjs';

var source = new Observable(observer => {
  let i = 0;
  let interval = setInterval(() => {

    observer.next(i++);

    if (i == 5) {
      clearInterval(interval);
      observer.complete();
    }

  }, 1000);
});

var subscription = source.subscribe(
  function (x) { console.log('next: %s', x); }, // "next"
  function (e) { console.log('error: %s', e); }, // "error"
  function () { console.log('complete'); } // "complete"
);

// Note: we can also "unsubscribe" to this service at any time using:
// subscription.unsubscribe();
```

In the above code, we create an "Observable" by passing a function that contains operations that we wish to **subscribe** to (ie: "be notified of", or "observe").  In the above case, every 1000 ms, the function increases an internal counter ( **i** ) and notifies any subscribers (there can be more than one) of the change, by invoking the "next" method. 

Once the function is complete, it notifies any subscribers by invoking the "complete" method.

If we wish to "subscribe" to our Observable method we can simply invoke the "subscribe" method on the Observable and pass in 1 (or more) callback functions to be executed on: **"next"**, **"error"** or **"complete"**.

If we run the code above as-is, we should see the output: 

```
next: 0
next: 1
next: 2
next: 3
next: 4
complete
```

If we encounter an error (say, instead of calling "complete" on i==5, we call `observer.error("encountered an Error");` ), our output would instead look like:

```
next: 0
next: 1
next: 2
next: 3
next: 4
error: encountered an Error
```

In summary, from within the Observable function, we can notify subscribers using the **next()**, **error()**, and **complete()** methods on the "observer" object.  If a "subscriber" wishes to handle each of the above scenarios, the callback methods are provided in the same order (ie, next, error, and complete) to the "subscribe" method.

Finally, in addition to simply "subscribing" to any changes identified using the "next" function, RxJS also provides additional methods to control the flow/output of observed data, ie:

* [map()](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-map)
* [filter()](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-filter)
* [delay()](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-delay)
* [distinct()](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-distinct)

Note: To use the above methods, we need to import them from 'rxjs/operators', ie:

```
import { map, filter, delay, distinct } from 'rxjs/operators';
```

As well as incorporating the "pipe" method, ie: 

```js
someObservable.pipe(delay(5000)).subscribe(()=>{
  // callback for initial 'next' delayed by 5 seconds
})
```

For a full reference of all methods available on the Observable object, see: [the official documentation here](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html).

<br>

### HttpClient Introduction

[HttpClient](https://angular.io/guide/http#httpclient) is Angular's mechanism for communicating with a remote server over HTTP.  This is used instead of "fetch" to request data from a Web API.

From the official documentation:

> The `HttpClient` in `@angular/common/http` offers a simplified client HTTP API for Angular applications that rests on the `XMLHttpRequest` interface exposed by browsers. Additional benefits of `HttpClient` include testability features, typed request and response objects, request and response interception, `Observable` apis, and streamlined error handling.

To make HttpClient available everywhere in the app:

1. Open the root AppModule for editing (`app.module.ts`),  
2. Import the **HttpClientModule** symbol from @angular/common/http,  
3. Add it to the **@NgModule.imports** array.

<br>

### Important Note

When trying to use **HttpClient** anywhere else in your application (e.g. a `whatever.component.ts` file), be sure to *import* ***HttpClient*** (and not HttpClientModule) into that service or component. For example:

```js
import { HttpClient } from "@angular/common/http";
```

and "inject" it using the constructor, ie:

```js
constructor(private http: HttpClient) { }
```

<br>

### Updating our DataManagerService

Before we begin to discuss the details and methods surrounding the **HttpClient** service, why don't we quickly update our "DataManagerService" (created in [Angular Services - Introduction](angular-service-intro)).  

**Note:**  The following code assumes that you have correctly updated `app.module.ts` to include the `HttpClientModule`, according to the instructions above.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './Post';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constructor(private http: HttpClient) { }

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

The only change here is that we have imported "HttpClient" and injected it into our component using the constructor.

<br>

### The get() function

[HttpClient](https://angular.io/api/common/http/HttpClient) includes an intuitive `get()` function to fetch data.

This is what we will use in our getting-started examples. In its simplest usage, we do two things:

1. Specify the shape of the data that we're expecting
2. Specify the URL
 
The `get()` function returns an *Observable* (discussed above). In essence, it is a stream of asynchronous data. The data could be a single object, or a collection. 

The specification of the **get()** function is as follows:

* The return type is actually a generic `Observable`.  
* The syntax is `Observable<T>`, where `T` is a placeholder for a type.   
* Often, it is an observable of an *array of data*.  

<br>

### Utilizing get() within DataManagerService

Let's continue our example and update our DataManagerService to actually make a request for data using HttpClient.  Fortunately, we have access to a public test API:  [https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com) that can provide this data for us.  

**Note:** For the below function implementation to work, the following import lines must be included:

```typescript
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
```

and the "HttpClient" service must be injected in the constructor, ie:

```js
constructor(private http: HttpClient) { }
```

For our implementation, let's create a function called "getLivePosts()".  Here, we will actually make a request for data from a live API, instead of data stored locally (like the "getStaticPost()" function):

```typescript
getLivePosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
}
```

Notice that the return type of the method is `Observable<Post[]>`. You can read this return type as an "observable of an array of Post objects".

<br>

### "Subscribing" to the Result

Since "getLivePosts()" returns a type of "Observable" (instead of a Promise), we must "subscribe" to the result (instead of calling "then" or "catch").  Recall from the [Angular Services - Introduction](angular-service-intro) code, we updated our App.js to use the service by making a call to "getStaticPost()".  Now that we have a new method "getLivePosts()", let's make a call to this function and store the data in a variable called "posts": 

**app.component.ts**

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataManagerService } from './data-manager.service'
import { Post } from './Post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  staticPost: Post = {} as Post; // cast the empty object as type "Post"
  posts: Array<Post> = [];

  private livePostsSub: any; // make the subscription reference "private"

  constructor(private data: DataManagerService){ }

  ngOnInit(){
    this.staticPost = this.data.getStaticPost();
    this.livePostsSub = this.data.getLivePosts().subscribe(data => this.posts = data);
  }

  ngOnDestroy(){
    this.livePostsSub.unsubscribe();
  }
}
```

We have made a few changes here, but nothing too drastic.  In addition to the obvious inclusion of a "posts" property and the call to "getLivePosts()" from the "DataManagerService", you will notice that we have included a "private" property called "livePostsSub".  This is a "reference" to the subscription so that we can properly dispose of it once our component is [destroyed](https://angular.io/api/core/OnDestroy).

**app.component.html**

```html
<h1>Live Posts</h1>

<table border="1">
  <tr>
    <th>ID</th>
    <th>User ID</th>
    <th>Title</th>
    <th>Body</th>
  </tr>
  <tr *ngFor="let post of posts">{% raw %}
    <td>{{post.id}}</td>
    <td>{{post.userId}}</td>
    <td>{{post.title}}</td>
    <td>{{post.body}}</td>
  {% endraw %}</tr>
</table>
```

<br>

