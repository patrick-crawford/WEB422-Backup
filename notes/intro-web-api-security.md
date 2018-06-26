---
title: Introduction to Securing a Web API with JWT
layout: default
---

## Introduction to Securing a Web API with JWT

Introduction paragraph here.... (NOTE: mention having postman installed upfront)

Before we can begin learning about how to secure a Web API, we will need to create a simple Node.js server to handle our API requests.  To speed this along, we have included a simple Web API in the Code Examples for this week (See the "simple-api" folder from the [Week 12 example code](https://github.com/sictweb/web422/tree/master/Code%20Examples/week12).  Currently, the primary function of this Web API is to return a hard-coded, static list of vehicles from its data-service.js module, using the route "/api/vehicles".  

Once you have grabbed the "simple-api" folder from gitHub, open it in Visual Studio and execute the command:

```
npm install
```

from the integrated terminal to fetch the dependencies (currently, only [express](https://www.npmjs.com/package/express) & [cors](https://www.npmjs.com/package/cors)).

Once this is complete, execute the command:

```
node server.js
```

to start the server and test the "/api/vehicles" route on localhost:8080.  You should see an array of JSON objects, consisting of 5 vehicles. 

<br>

### Review User Account Management & Security

Now that our extremely simple "vehicles" API is in place and produces data, we can discuss how we might *protect* this data from unwanted access. For example, say these vehicles belong to a user of the system, and they do not want the VIN numbers available to the public.

Back in WEB322, we discussed a number of [security considerations](http://zenit.senecac.on.ca/~patrick.crawford/index.php/web322/course-notes/week12-class1/) that are vital to a modern web application.  This primairly included coverage of HTTPS, Certificates / Certificate Authorities and password encryption (hashing). In today's example, we will focus on bcrypt, as well as a refresher on setting up an mLab DB to store our user information & credentials.

<br>

#### mLab & MongoDB

You should be familiar with mLab from our [experience in WEB322](http://zenit.senecac.on.ca/~patrick.crawford/index.php/web322/course-notes/week8-class1/) as well as the [Teams API Setup notes](https://sictweb.github.io/web422/notes/teams-api-setup).  MLab will be responsible for hosting our separate (MongoDB) "users" database.

To set up your new "users" collection, follow along with the [Teams API Setup notes](https://sictweb.github.io/web422/notes/teams-api-setup) starting with "**MongoDB Database**" and continuing until you complete the "**Adding a new User**" step.  **Note:** Instead of naming your collection "teams-api-db", name it "simple-api-users" to keep everything separate and clear.

Be sure to keep track of your connection string, as we will be using it in the next piece:

#### Adding the "user-service"

To keep our DB authentication clean, we will be adding a new "user-service.js" file to our solution.

<br>

#### Hashed Passwords with bcrypt

<br>

### Introduction to JWT

<br>

### Securing routes in existing Teams API 

* Passport.js
* Passport-jwt

<br>

### Updating an Angular app to use JWT

* Route Guards
* Http Interceptors

<br>
