---
title: Angular Routing Continued
layout: default
---

## Angular Routing Continued

### Introducing "Parameters"

Last week, we introduced a way to define simple routes (ie: display a specific Component when a route is matched / no route is matched, or redirect to a separate route altogether)  However, as we learned in WEB322, there are ways to capture variables within our routes, ie **Route** Parameters & **Query** Parameters.  

The following explanations are from the excellent Rangle.io documentation for [Route Parameters](https://angular-2-training-book.rangle.io/handout/routing/routeparams.html) and [Query Parameters](https://angular-2-training-book.rangle.io/handout/routing/query_params.html) 

<br>

### Route Parameters

A route parameter is a value in the URL. 

For example, consider this URL segment (which has omitted the [scheme and host](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier#Syntax) information):

```
/product-details/15
```

The `product-details` segment would typically identify the component or view that is the navigation target. 

The `15` segment *is the route parameter*. It is a variable piece of data (a value) that is calculated or determined by user interaction. The *product-details component* will extract that value, and do whatever it needs to (ie: fetch the data for product 15) to render the view's content. 

<br>

### Declaring Routes with Parameters

The syntax for a route parameter is familiar to anyone who has configured routes in the server-side Express.js framework. Simply prefix the variable or property name with a colon (`:`). 

For example, look at the route object for `product-details` below:

```ts
export const routes: Routes = [
  // other routes may already be here...
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
```

<br>

### Linking to Parameterized Routes

As you have learned, we use the `routerLink` attribute in the `<a>` element when using routing. 

In a ProductList component, we could display a list of products. Each product would have a link to the "product-details" route, and pass the product identifier:

```html
<a *ngFor="let product of products"
  [routerLink]="['/product-details', product.id]">
  {% raw %}{{ product.name }}{% endraw %}
</a>
```

Note that the routerLink directive passes an array which specifies the path, and the *value* of the route parameter. 

Alternatively we could navigate to the route programmatically:

```js
goToProductDetails(id) {
  this.router.navigate(['/product-details', id]);
}
```

However, the above code requires you to first:

```typescript
import { Router } from '@angular/router';
```

as well as "inject" the router service in the constructor() of your component:

```typescript
constructor( private router: Router ){}
```

<br>

### Reading Route Parameters

In a component class, we can read or get the value(s) of route parameters. 

For example, in a ProductDetails component, we can read the parameter, take an action (fetch and display product details) based on the parameter value.

How? We use the *ActivatedRoute* service, in any component that needs to read route parameters. We do three coding tasks

**1. Import statement**

Here's the import statement:

```ts
import { ActivatedRoute } from '@angular/router';
```

**2. Inject it into the constructor**

In the component's constructor, add it to the list of objects that are injected. For example:

```typescript
constructor( private route: ActivatedRoute ) {}
```

**3. Read the parameter(s)**

Somewhere in your component class, you will have methods that will want to read and use the parameter(s). We must know the parameter name that was used in the section above (see: [Declaring Routes with Parameters](#declaring-routes-with-parameters)). 

Continuing from above, assume that we want to read the parameter named `id`. This can be accomplished using the following code:

```ts
let id = this.route.snapshot.params['id'];
```

> Note: During the viewing of the component, if it is possible that the app's user will navigate to the same component/view but with a different parameter value, then this task becomes a bit more complicated, ie:

```ts
ngOnInit() {
  this.sub = this.route.params.subscribe(params => {
     this.id = +params['id']; // (+) converts string 'id' to a number
     // In a real app: dispatch action to load the details here.
  });
}

ngOnDestroy() {
  this.sub.unsubscribe();
}
```
<br>

### Query parameters

Query parameters allow you to pass *optional* parameters to a route. 

For example, consider a scenario in which we have a component that displays a long list of items (customers, products, whatever). If the component uses `*ngFor` to render the items, it will render *all* the items. So, if there are 1,000 items, it will render all 1,000. That might not deliver a good user experience. A common tactic is to "page" the results, by showing fewer items, and giving the user some controls to enable "paging" through the list if items, a group at a time, ie:

```
localhost:3000/product-list?page=3
```

In essence, the key difference between query parameters and route parameters is that route parameters are *essential* to determining navigation, whereas query parameters are *optional*.

<br>

### Linking to routes with query parameters

Use the **queryParams** directive, along with **routerLink**, to pass query parameters. 

In the `<a>` element, both are used as attributes. For example:

```html
<a [routerLink]="['product-list']" [queryParams]="{ page: 5 }">View page 5</a>
```

<br>

Alternatively, we can navigate programmatically

```js
goToPage(pageNum) {
  // assume that "pageNum" holds a page number value
  this.router.navigate(['/product-list'], { queryParams: { page: pageNum } });
}
```

However, the above code requires you to first:

```typescript
import { Router } from '@angular/router';
```

as well as "inject" the router service in the constructor() of your component:

```typescript
constructor( private router: Router ){}
```

<br>

### Reading query parameters

Reading query parameters is similar to the technique discussed above (see: [Reading Route Parameters](#reading-route-parameters)) in that we must import "ActivatedRoute" and inject it into the constructor. 

First, let's assume that we want to read the parameter named `page`.  This can be accomplished using the following code:

```ts
let pg = this.route.snapshot.queryParams['page'];
```

> Note: During the viewing of the component, if it is possible that the app's user will navigate to the same component/view but with a different parameter value, then this task becomes a bit more complicated, ie:

```ts
ngOnInit() {
  this.sub = this.route.queryParams.subscribe(params => {
    // Defaults to 0 if no query param provided.
    this.page = +params['page'] || 0;
  });
}

ngOnDestroy() {
  this.sub.unsubscribe();
}
```

<br>