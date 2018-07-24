---
title: Incorporating JWT in an Angular Application
layout: default
---

## Incorporating JWT in an Angular Application

If our Web API provides security features (register/login routes, stored user names with hashed passwords and JWT for authenticating requests), we will have to design our Angular application to work with the security mechanisms of the API.  Specifically, we will need:

* A "JWT" module to help us work with JSON Web Tokens
* An "Authentication" service to manage the authentication tasks and JWT
* "User Registration" and "Login" components / routes
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

#### Step 1: Install the \@auth0angular-jwt package 

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

#### Step 2: Add "AuthService" to the "providers" array in app.module.ts

**TODO**

<br>

#### Step 3: Add the definition for a "User" Object

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

#### Step 4: Update the Code in auth.service.ts

```js
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

import {User} from './User';

@Injectable({
  providedIn: 'root'
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

**TODO: Explain the above code**

<br>

### Creating the "Register" Component / Route

**NOTE: Only add this in if we have time... otherwise, we can use the "bob" user from part 1 ... We could also do a "logout", that removes the token??**

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

**TODO: Explain the above Code**

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

**TODO: Explain the above Code**

<br>

#### Step 6: Previewing the form 

**TODO: Screenshot of Form working - Maybe also add "local storage" showing the JWT**

<br>

### Generating a "GuardAuthService" (TODO: Change this Step Title)

**TODO: Explanation of what this is and why we're doing it**

<br>

#### Step 1: Use the Angular-CLI to generate our "GuardAuthService

```
ng g s GuardAuth --module app --spec false
```

<br>

#### Step 2: Add "GuardAuthService" to the "providers" array in app.module.ts

**TODO**

<br>

#### Step 3: Updating the "GuardAuthService" class:

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

### Generating an "InterceptTokenService" (TODO: Change this Step Title)

**TODO: Explanation of what this is and why we're doing it**

<br>

#### Step 1: Use the Angular-CLI to generate our "InterceptTokenService

```
ng g s InterceptToken --module app --spec false
```

<br>

#### Step 2: Add "InterceptTokenService" to the "providers" array in app.module.ts

**TODO**

<br>

#### Step 3: Updating the "InterceptTokenService" class:

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

**TODO: Explain the Above Code**

<br>










