---
title: Routing
layout: default
---

## Introduction to Routing

Recall the ["Routing" in React](react-routing) notes from a few weeks ago. The high-level topis covered were primarily:

* The purpose of routing is to implement navigation in an app
* Routing matches a URL/path to a component
* In an app, we must add the router code module, and then design and configure the URLs
* It is possible to define URL parameters
* It is possible to define a "not found" route

As you would expect, Angular has the routing feature. If you understood the configuration and use of routing in React, then you will be comfortable with routing in Angular. 

> One of the differences between Angular and React is that the Angular team wrote the router as part of the platform. If you want routing in a React app, then you must use a third-party router written by people who are not on the React team. 

This document covers some of the *getting started* topics. 

For the remainder of the course, we'll continue to work with routing, as we cover *services* and *interactive forms*. For example, next week, we will learn about routing with URL parameters.

<br>

### Adding routing to an app

The best and easiest way to add the routing feature to an app is to make sure that it has it when the project is *created* for the first time. 

As you have learned, when learning more about components, we should (must) use the `--routing` option when creating a new project:

`ng new week7-app --routing -S -g`

The remainder of this document teaches you how to configure and use routing. 

<br>

### Configure and use routing

At this point in time, we have a project with the routing feature. 

Let's study the project's code, to learn how to recognize routing in an app, and to learn where to find the routing feature. That will enable us to learn where to begin configuring and using it. 

<br>

#### New source code: app-routing.module.ts

In the `src/app` folder, notice a new `app-routing.module.ts` source code file. Its contents:

```javascript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

<br>

Notice the `routes` constant. Soon, we will edit the contents of the empty array, and add *route objects*. Each of these route objects has a *string URL path*, and the name of a *component class*. 

Before we add each route object, we will `import` the component that it refers to. For example:

```javascript
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
```

When fully configured, the `routes` constant will look something like this:

```javascript
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
```

<br>

> Notice - if you're coding the routes while reading this, make sure that:  
> 1) the component already exists, and  
> 2) it is imported.

<br>

#### Updated code: app.module.ts

In the `src/app` folder, notice the familiar `app.module.ts` source code file. 

The ability of the app to support routing is seen in this file. The code was added because the `--routing` option was used when the project was created. 

First, in the "import" statements near the top, we see:

```javascript
import { AppRoutingModule } from './app-routing.module';
```

Then, in the `@NgModule` decorator, it matches up to an `AppRoutingModule` value in the `imports` array:

```javascript
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
```

<br>

#### Checkpoint...

To summarize so far, routing is recognized in an app by the presence of the app routing module code, and some new code in the app module. 

To preview the rest of the procedure, here's what we must do:
1. Plan your components and routes
2. Add one or more components that will participate in routing
3. In the HTML markup (i.e. the view code) of the component that will "host" the routed component, add a `"<router-outlet>"` element
4. In the HTML markup of a navigation component (or any kind of component), use the `"routerLink"` attribute in the `"<a>"` element instead of the `"href"` attribute

<br>

#### Planning your components and routes

One of the first tasks to be done when designing any app is to *sketch out* the user interface (UI), and the interaction or usage flow. 

This task will enable you to clearly and separately *list or document* the components that will enable your UI and interaction plan. Some will be structural (in that they will appear on every screen, such as a "navigation bar"), while others will be routed components.

Finally, as a result of sketching out the UI and interaction flow, and then listing/documenting the components that are needed, you will be able to design or infer the URL path segments for each routed component. 

<br>

#### Adding a *new* routed component

Adding a new *routed* component is an easy thing to do, with a clear and unambiguous procedure. In fact, it adds only one more task to the overall task of adding a new component to an app. 

You already know that a new component can be added to an app with an `ng g c foo` command in the Angular CLI. The command will 1) generate the source code files for the new component, and 2) update the app component by adding an "import" statement and a value in the "declarations" array. 

To enable the new component to participate in routing, we must do one more task (which you have seen above):

Edit the `app-routing.module.ts` source code file. Assume we are working with a newly-created app that supports routing.

Near the top, add an "import" statement. Assume that we have just added (generated) a new "about" component. The import statement will look like the following. It is no different from the code statement that was added to the app module:

```javascript
import { AboutComponent } from './about/about.component';
```

Then, add a new *route* object to the `routes` array:

```javascript
const routes: Routes = [
  // other existing routes may already be here
  { path: 'about', component: AboutComponent },
  // other existing routes (empty, not found, etc.)
];
```

In summary, this enables a component to participate in routing. There's still a bit more to do however, explained soon.

<br>

**What's in a *route object*?**

A *route object* a JavaScript object that conforms to the [Route interface](https://angular.io/api/router/Route). 

While the interface documentation shows the members, we must look at the [Routes type](https://angular.io/api/router/Routes) documentation to learn about the purpose and use of each member. 

For beginner scenarios, the most-often used members are:

`path` - a string for the URL segment that follows the leading slash 

`component` - a component type (class name)

Soon, you will learn about a couple of other members for some specialty route objects.

<br>

#### Locate and use the router-outlet element in the hosting component

The view for a routed component must appear somewhere, right?

Choose a component that will be the "host" for routed components. Often it will be a simple content container that conceptually enables other content to be swapped in and out (i.e. routed) based on some interaction or context/environmental stimulus. 

Then, in that component's HTML markup, in a suitable location, add a `"<router-outlet>"` element:

```html
<!-- other markup above -->
<router-outlet></router-outlet>
<!-- other markup below -->
```

At runtime, the HTML markup from the routed component will be added to the document object model (DOM) *just below* the `<router-outlet>` element. 

> Note: In a new app, we find the `<router-outlet>` element in the *app component*.

<br>

#### Showing a routed component - the routerLink attribute

How can we cause the view for a routed component to appear? 

Most often - at least for beginner or introductory app scenarios - we use a navigation component. For example, the view code (i.e. the HTML markup) for this kind of component is typically an unordered list of `<a>` (anchor/hyperlink) elements. 

In standard HTML documents, the `href` attribute is used. However, we do NOT use this attribute in links to routed components. Instead, re use the `routerLink` attribute.

For example, assume we are adding a link to the new "about" component from above. We add a new `<a>` element, as shown below. (The `nav-...` classes are from the Bootstrap styles.)

```html
  <!-- other markup below -->
  <li class="nav-item">
    <a class="nav-link" routerLink="/about">About</a>
  </li>
  <!-- other markup below -->
```
<br>

#### More about routerLink

In the [RouterLink documentation](https://angular.io/api/router/RouterLink), we learn that it is a directive. 

It "Lets you link to specific parts [components] of your app." 

In the Description section, it briefly describes the usage of a static link, which we use today. It also has other coverage, which will be useful next week, or in the future:
* Dynamic links/values
* Segment naming and matching rules
* Query string parameter handling

<br>

#### Highlighting the current Nav item with "routerLinkActive"

"routerLink" also has a companion directive called [RouterLinkActive](https://angular.io/api/router/RouterLinkActive), which lets you add a ***CSS class*** to an element when the link's route becomes active.  Using our routerLink example from above, we could modify it to add the class ***"active"*** to the ***&lt;a class="nav-link"&gt;*** element, whenever the "/about" link is currently active, ie: 

```html
  <!-- other markup below -->
  <li class="nav-item">
    <a class="nav-link" routerLink="/about" routerLinkActive="active">About</a>
  </li>
  <!-- other markup below -->
```

<br>

#### Special routed components and routes

While the tasks above will enable you to successfully define, configure, and use routing, an app needs a few more "special" routing-related tasks. 

First, an app should have a "home" view, that serves as its "start page" or "landing page". That's easy to create and code. The component's name can be "home" or "start" or something that makes sense for your app.

> It is usually a good idea to configure the "home" route as the first object in the routes array.

Next, an app must have a *route object* to handle an empty route. In other words, if the URL has no segments - just the host name - then the app must know what to show. Assuming that you have already created a "home" component (mentioned in the previous paragraph), add a new *route object* to the `routes` constant in the app routing module:

```javascript
const routes: Routes = [
  // existing route objects
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
```

Finally, an app must have a component that will appear whenever an invalid (non-existing) URL is entered or processed. This is the classic "page not found" use case. To accomplish this, create a new component using the Angular CLI, and pay attention to the use of upper and lower case, by using CamelCase:

```text
ng g c PageNotFound
```

The Angular CLI will look at the CamelCase name, and generate properly-named source code files and a JavaScript class. 

Then, in the app routing module, add another *route object* as the *last item* in the `routes` array:

```javascript
const routes: Routes = [
  // existing route objects
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
```

<br>

#### Does the order of the *route objects* in the `routes` array matter?

Yes. Here are some getting-started guidelines:

Place the *more specific* route(s) (i.e. the one with more segments, and/or URL parameters, and/or query string parameters) above (before) the *less specific* route(s). This will make more sense next week, when we begin to use URL parameters. 

Place the *empty*  route just above (before) the last route in the array. 

Finally, place the *not found* route as the last item in the array. 

<br>

### Summary, and next actions

Before this week, you learned how to create and work with *components*. The scenarios were simple, in that the goal was to package and display an area of the user interface. Multiple components were created and displayed. 

This week, we learned how to add *routing* to an app. This feature enables the app to swap out or replace a component (an area of the user interface) with another. 

The best plan is to ensure that a new project is created with the routing option. Then, adding routed components becomes a predictable and straightforward manner. 

<br>
