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

### Getting Started



... download the starter app..

### (Notes, going from simple-app to simple-app-complete)

NOTE... (Route Guards)[https://angular.io/guide/router#milestone-5-route-guards]

Created a new Angular App "simpleApp"

installed bootstrap css, js & jquery js (index.html)

created navbar component & added the bootstrap navbar in there


Note... the vehicles route won't fetch data (missing JWT)... so here's where our code steps in

#### Modifications to app.module.ts before we begin (we need angular-jwt): 

Installed angular-jwt from @auth0:

```
npm i @auth0/angular-jwt
```

Imported it in app.module:

```
import { JwtModule } from "@auth0/angular-jwt";
```

Next, just below all of the import statements, and before the @NgModule decorator, add this function:

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

Finally, in the imports array of the @NgModule decorator, add the JwtModule... object:

```
JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        authScheme: 'JWT'
      }
    })
```

#### LOGIN COMPONENT

Ceated my own "loginComponent"

ng g c Login

added Login as a route path:"login", component: LoginComponent

Added login to nav.component.html

```
<li routerLinkActive="active"><a routerLink="login">Login</a></li>
```

Added the "FormsModule" (see "angular-forms-intro" for editing app.module.ts:

Import the FormsModule from ‘@angular/forms’
Add FormsModule to the “imports” array

added a "user" in a new "User.ts"

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

Added this to the login template:

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


Added this to the login.component.ts

```js
import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:User;
  public warning:string;

  constructor() { }

  ngOnInit() {
    this.user = new User;
  }

  onSubmit(f: NgForm): void { 
    console.log(this.user);
  }
}
```
#### AUTH SERVICE...

Next, we need to crate an auth service:

```
ng g s Auth --module app --spec false
```

This will need the HTTPClient Module.... (already in simple-app) NOTE!!! Maybe add the FormsModule to simple-app as well to save time???

Added the following code to auth.service.ts

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

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

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

ADD AUTH SERVICE TO LOGIN COMPONENT...

```
import { AuthService } from '../auth.service';
```

ADD ROUTER SERVICE TO LOGIN COMPONENT

```
import {Router} from "@angular/router"
```

...

```
  constructor(private auth:AuthService, private router:Router) { }
```

update onSubmit to use the "auth" service:

```js
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
```






