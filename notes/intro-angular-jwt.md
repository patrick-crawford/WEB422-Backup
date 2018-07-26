---
title: Incorporating JWT in an Angular Application
layout: default
---

## Incorporating JWT in an Angular Application

If our Web API provides security features (register/login routes, stored user names with hashed passwords and JWT for authenticating requests), we will have to design our Angular application to work with the security mechanisms of the API.  Specifically, we will need:

* A "JWT" module to help us work with JSON Web Tokens
* An "Authentication" service to manage the authentication tasks and JWT
* A "Login" component / route
* "Route Guards" to stop the user from navigating to "protected" routes
* "Http Interceptor" to automatically attach an "Authorization" header (containing the user's JWT) to requests for data.

<br>

### Getting Started

**Note:** If you have not yet completed "[Introduction to Securing a Web API with JWT](https://sictweb.github.io/web422/notes/intro-web-api-security)", please go back and complete it now.  We will be using the secure "simple-API" as a source of data for our App.

If your "simple-API" (from "[Introduction to Securing a Web API with JWT](https://sictweb.github.io/web422/notes/intro-web-api-security)" is not currently running on port 8080, please start it up now. 

<br>

#### Obtaining &amp; Running the "simple-app"

We have provided a "starting point" in the form of a simple Angular application containing a Navbar and two routes: "Home" and "Vehicles".  This Angular application is located in the "simple-app" folder from the [Week 11 example code](https://github.com/sictweb/web422/tree/master/Code%20Examples/week11)); download it and open it in Visual Studio Code before we proceed.

You will notice that our "simpleApp" will not run as downloaded.  This is because the all-important "node_modules' folder containing all of our dependencies is missing.  To rebuild this folder and get the app running, we will need to execute the familiar `npm install` command.

With the dependencies fetched, we can now start up our app with `ng serve`.  You will see that we only have two routes (excluding the "not found" route) available to the user: "Home" and "Vehicles".  If we try to access the "Vehicles" route, we will not see any data due to a **401 - Unauthorized** error returned from our "simple-API" (this can be confirmed in the browser console). 

<br>

### Adding support for JWT (JwtModule)

If we wish to work with JWT in our Angular application, we will need to obtain the ([`@auth0/angular-jwt`](https://www.npmjs.com/package/@auth0/angular-jwt) package) - this will give us access to the "JwtModule". 

<br>

#### Step 1: Install the @auth0/angular-jwt package 

```
npm install @auth0/angular-jwt
```

<br>

#### Step 2: Import JwtModule in app.module.ts

```ts
import { JwtModule } from "@auth0/angular-jwt";
```

<br>

#### Step 3: Define a "tokenGetter" Function

Next, we must define a "tokenGetter" function, to be used in the configuration of the JwtModule.  This function will be responsible for actually obtaining the locally stored "JWT".  In our application, we will simply store the JWT in "[local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)" using the identifier: "access_token". 

This function will be defined in **app.module.ts** just *below* all of the `import` statments, and *before* the `@NgModule` decorator:

```ts
export function tokenGetter() {
  return localStorage.getItem('access_token');
}
```

<br>

#### Step 4: Add the JwtModule to the 'imports' Array:

Finally, we will add the JwtModule to the 'imports' array using the following configuration:

```ts
  imports: [
    ...,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        authScheme: 'JWT'
      }
    })
  ],
```

<br>

### Building an "Authentication" Service:

Since we will be working with JWT and protected routes, it makes the most sense to have all of our "Authentication" related code in one place (ie: a "service").  This service will be responsible for:

* Fetching the token from "local storage"
* Reading the contents of the token
* Determining whether or not the user is "authenticated" - ie: does the token exist in local storage?
* Make an AJAX "POST" call using the "HttpClient" service to the "api/login" route of our server.  We will provide a "user" object as credentials

To create this service, follow along with the instructions below:

<br>

#### Step 1: Use the Angular-CLI to generate our "AuthService"

```
ng g s Auth --module app --spec false
```

<br>

#### Step 2: Add the definition for a "User" Object

In a new file called "User.ts", add the following code (below).  This will define a "User" object with the same properties as our "userSchema" (used by the simple-API users database on MLab).

```
export class User{
    "_id": string;
    "userName": string;
    "password": string;
    "fullName": string;
    "role": string;
    __v: 0;
}
```

<br>

#### Step 3: Update the Code in auth.service.ts

```js
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

import {User} from './User';

@Injectable({
  providedIn: 'root' // Note: "providedIn" not added in versions < 6
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public readToken(): any{
    const token = localStorage.getItem('access_token');
    return this.jwtHelper.decodeToken(token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    // Note: We can also use this.jwtHelper.isTokenExpired(token) 
    // to see if the token is expired

    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  login(user: User): Observable<any> {
    // Attempt to login
    return this.http.post<any>('http://localhost:8080/api/login', user);
  }
}
```

There's a lot going on in the above code, so let's break it down *piece by piece* to understand how everything works.  To begin, all of the import statements are fairly standard:  We will be using an Observable, so we must fetch it from "rxjs" (in previous versions of Angular, it was located in "rxjs/Observable").  The HTTPClient comes from "@angular/common/http" (which we will need to communicate with our simple-api) and the JwtHelperService (used to decode the contents of the JWT) comes, once again from "@auth0/angular-jwt".

Next, you will notice that we have our @Injectable decorator.  If the app was built using an earlier version of Angular (ie: before version 6), it would have looked like this: `@Injectable()`.

After injecting our required services in the constructor, we see the following methods:

* **getToken()** The get token method simply pulls the token from "local storage".  It will return **null** if the token does not exist

* **readToken()** This method is designed to return the data from the JWT stored in "local storage".  It uses the [decodeToken()](https://www.npmjs.com/package/@auth0/angular-jwt#decodetoken) method from the JwtHelperService.

* **isAuthenticated()** ...The isAuthenticated() method really only checks to see if there's a token available in local storage.  If there is a token, return **true**, otherwise return **false**.  This will be used by a future "GuardAuthService" to prevent the user from accessing a specific route, if the token is unavailable.

* **login()** The all-import login() method simply makes "POST" request to our "simple-api" (currently running on localhost), and passes it the user's credentials (defined as type "User".  These will be obtained from the below "Login" Component.

<br>

### Creating the "Login" Component / Route

Now that our "Authentication" service is complete, we can add a new "Login" component to provide an interface to the "/api/login" endpoint of our "simple-API".  If the user's login attempt was successful, we will then store the returned JWT in "[local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)".

<br>

#### Step 1: Use the Angular-CLI to generate our "LoginComponent"

```
ng g c Login
```

<br>

#### Step 2: Adding the "LoginComponent" to the list of "Routes"

In "app.routing.module.ts", add the following route to the "Routes" array under "vehicles".   **Note:** You will have to "import" the "LoginComponent" (`import { LoginComponent } from './login/login.component';`):

```js
{ path: 'login', component: LoginComponent }
```

<br>

#### Step 3: Adding a link to "Login" in the NavComponent template

In the "navbar-collapse" &lt;div&gt;...&lt;\/div&gt;, just above "home" link, add the code:

```html
<li routerLinkActive="active"><a routerLink="login">Login</a></li>
```

<br>

#### Step 4: Updating the "LoginComponent" class:

```ts
import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:User;
  public warning:string;

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
    this.user = new User;
  }

  onSubmit(f: NgForm): void {

    this.auth.login(this.user).subscribe(
      (success) => {
        // store the returned token in local storage as 'access_token'
        localStorage.setItem('access_token',success.token);
        // redirect to the "vehicles" route
        this.router.navigate(['/vehicles']);
      },
      (err) => {
        this.warning = err.error.message;
      }
    );

  }
}
```

If we examine the above code, we can see that there's nothing too new happening here, with the exception of the "onSubmit()" method.  In **onSubmit()**, the **user** property (modified using the form in the compoment template - see below) is passed ot the **login** method, which (as we have seen) will pass the data on to the "/api/login" route of our "simple-api".  If our simple-API successfully authenticates the user based on these credentials, the Observable will pass the message back (success), containing the JWT (in the "token" property).  We then take this "token" (JWT) and store it in local storage as "access_token" for later use. Additionally, we will redirect the user to the "/vehicles" route.  

If the simple-API sends an error back stating that there's an issue with the credentials, we can catch this error (err) in the 2nd "subscribe" callback and set the "warning" property of the component with the returned message.  This will provide appropriate feedback to the user in the event that they have made a mistake entering their login credentials. 

<br>

#### Step 5: Updating the "LoginComponent" template:

```html
<div class="row">
  <div class="col-md-12">
    
    <div class="well">
      <h2>Login</h2>
      <p>Enter your login information below:
    </div>

    <form #f="ngForm" (ngSubmit)="onSubmit(f)">
      <div class="form-group">
        <label class="control-label" for="name">User:</label>
        <input type="text" class="form-control" id="userName" name="userName" [(ngModel)]="user.userName" autofocus>
      </div>
      <div class="form-group">
        <label class="control-label" for="name">Password:</label>
        <input type="password" class="form-control" id="password" [(ngModel)]="user.password" name="password">
      </div>

      <div class="alert alert-danger" *ngIf="warning">
        {{warning}}
      </div>

      <button class="btn btn-primary pull-right" type="submit">Login</button>
    </form>
    
  </div>
</div>
```

Here, we have a simple form that captures the **userName** and **password** properties of the public **user** (type: "User") property in the component.  If the "warning" property is set (as we have seen from above), then the warning will be displayed to the user.

<br>

#### Step 6: Previewing / Testing the Component 

If we try to log in now, we should see everything functioning as expected: the errors show up correctly, and the user is redirected to the "/vehicles" route once correctly identified (authenticated).  

![Simple App Login Error](../media/simple-app-login-error-bob.png)

Unfortunately, even though we have stored the JWT in local storage as "access_token" (this can be verified using the Chrome dev tools under the "Application" tab) we still are not getting any **vehicle** data back from the server.  This is because we are still **not sending the JWT** with the request.  To remedy this and *automatically* send the JWT with our requests, we need to create another service:  

<br>

### Generating an "InterceptTokenService"

To automatically send our JWT (located in local storage as "access_token") using the correct "Authorization" header and scheme (ie: "JWT" + *space* + token), we need to write a special [HttpInterceptor](https://angular.io/api/common/http/HttpInterceptor) service.  For our purposes, it's just a regular service that **implements** "HttpInterceptor" (from "@angular/common/http") and has a special method called **intercept**, that performs the work.

<br>

#### Step 1: Use the Angular-CLI to generate our "InterceptTokenService"

```
ng g s InterceptToken --module app --spec false
```

<br>

#### Step 2: Updating the "InterceptTokenService" class:

* First, add the required "import" statements:

```ts
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
```

* Next, update the class definition:

```ts
export class InterceptTokenService implements HttpInterceptor {

  // Initialization

  constructor(private a: AuthService) { }

  // Methods

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // Clone the existing request, and add the authorization header
    request = request.clone({
      setHeaders: {
        Authorization: `JWT ${this.a.getToken()}`
      }
    });
    // Pass the request on to the next handler
    return next.handle(request);
  }

}
```

You can see from the above code, that our ["intercept" method](https://angular.io/api/common/http/HttpInterceptor#intercept) has a very specific definition.  It's function is to "intercept" the request (available as the "request" property), perform some work on the request, and finally pass the request on to the "next" request handler (available as the "next" property).

For our purposes, this is all fairly boilerplate except for the "setHeaders" property.  This is where we identify which header we would like to set (ie: "Authorization") and what the data should be (ie: "JWT" + *space* + token).  We use the "AuthService" to pull the token from local storage.

<br>

### Adding "HTTP_INTERCEPTORS" to the "providers" Array in app.module.ts

Once our special "HttpInterceptor" service is complete, the final step is to add it to our application so that it can be applied to our HTTP requests.  This involves updating the **providers** array in **app.module.ts** using a slightly different definition (see below)

#### Step 1: Add the Correct "import" Statements to app.module.ts

```ts
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
```

and

```ts
import { InterceptTokenService } from './intercept-token.service';
```

#### Step 2: Add the "InterceptTokenService" to the "providers" array.

```ts
{
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptTokenService,
  multi: true
}
```

You will notice that we do not add the "InterceptTokenService" directly.  Instead, it is identified in the "userClass" property of an anonymous object, added to the array of providers. The "provide" property allows us to register our "InterceptTokenService" with the [array of "HttpInterceptors"](https://angular.io/api/common/http/HTTP_INTERCEPTORS), while the "multi" property indicates that there could be more than one Interceptor.

#### Step 3: Testing the "/vehicles" Route.

If we refresh the "/vehicles" route, we should now see our list of vehicles!  This is because our "Authorization" header was correctly added to the request (thanks to our "InterceptTokenService") and the simple-API accepted our token (stored in local storage after login).

![Simple App Vehicles Populated](../media/simple-app-vehicles-populated.png)

<br>

### Generating a "GuardAuthService" to 

**TODO: Explanation of what this is and why we're doing it**

<br>

#### Step 1: Use the Angular-CLI to generate our "GuardAuthService

```
ng g s GuardAuth --module app --spec false
```

<br>

#### Step 2: Updating the "GuardAuthService" class:

* First, add the required "import" statements:

```ts
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
```

* Next, update the class definition:

```ts
export class GuardAuthService implements CanActivate {

  // Initialization

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  // Methods

  canActivate(): boolean {

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
```

**TODO: Explain the Above Code**

<br>

#### Step 3: Updating our "vehicles" Route with the "Guard":

...

<br>

**TODO: Look into adding this code to NavComponent to Update it whenever the route changes (to display something like "welcome Bob" and show/hide routes (NOTE: there may be a better way... maybe add a loginNotifier method of the authService or that we can call when logged in and any "subscribers" will be notified? - see "Shared Service" [here](https://sharpten.com/blog/2016/03/23/using-eventemitters-notify-component-changes-angular-2.html) for ideas):

In NavComponent, add the property:

```ts
public token: any;
```

Constructor should look like:

```ts
constructor(private router: Router, private auth:AuthService) { }
```

ngOnInit should look like:

```ts
ngOnInit() {
  this.router.events.subscribe((event) => {
    this.token = this.auth.readToken();
  });
}

```

Then, in our template, we can add:

ngIf for our "vehicles" link

```html
<li *ngIf="token" routerLinkActive="active"><a routerLink="vehicles">Vehicles</a></li>
```

ngIf for our "home" link

```html
 <li *ngIf="!(token)" routerLinkActive="active"><a routerLink="login">Login</a></li>
```

Additionally, in the menu, we can conditionally change the "Home" to a "Welcome" message if the user is logged in:

```html
<li routerLinkActive="active"><a routerLink="home"><span *ngIf="token">Welcome {{token.userName}}</span><span *ngIf="!(token)">Home</span></a></li>
```







