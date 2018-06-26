---
title: Introduction to Securing a Web API with JWT
layout: default
---

## Introduction to Securing a Web API with JWT

Introduction paragraph here.... (NOTE: mention having postman installed upfront).  NOTE: have a "completed" version of this, available as well, ie "simple-API-complete", etc.

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

### Quick note on "CORS"

TODO: Quick note explaining CORS

<br>

### Review User Account Management & Security

Now that our extremely simple "vehicles" API is in place and produces data, we can discuss how we might *protect* this data from unwanted access. For example, say the information for all vehicles in the system must be kept private and only authorized users are permitted access it.

Back in WEB322, we discussed a number of [security considerations](http://zenit.senecac.on.ca/~patrick.crawford/index.php/web322/course-notes/week12-class1/) that are vital to a modern web application.  This primairly included coverage of HTTPS, Certificates / Certificate Authorities and password encryption (hashing). In today's example, we will focus on bcrypt, as well as a refresher on setting up an mLab DB to store our user information & credentials.

<br>

#### mLab & MongoDB

You should be familiar with mLab from our [experience in WEB322](http://zenit.senecac.on.ca/~patrick.crawford/index.php/web322/course-notes/week8-class1/) as well as the [Teams API Setup notes](https://sictweb.github.io/web422/notes/teams-api-setup).  MLab will be responsible for hosting our separate (MongoDB) "users" database.

To set up a new "users" collection for the simple API, follow along with the [Teams API Setup notes](https://sictweb.github.io/web422/notes/teams-api-setup) starting with "**MongoDB Database**" and continuing until you complete the "**Adding a new User**" step.  **Note:** Instead of naming your collection "teams-api-db", name it "simple-api-users" to keep everything separate and clear.

Be sure to keep track of your connection string, as we will be using it in the next piece:

#### Updating the "user-service"

To keep our DB authentication piece clean, we will be making use of the promise-based "userService" module, defined in the   "user-service.js" file.  If you open this file, you will see a space for your Mongo DB connection string - enter it now before proceeding.

Next, you will notice a definition for a "user" Schema (userSchema).  In this case, it consists of 4 simple fields:

* **userName:** <br>A (unique) string representing the user's login/user name 
* **password:** <br>The user's password
* **fullName:** <br>Ths user's full name
* **role:** <br>The user's role, ie "manager", "data-entry", "maintenance", etc. (the user's role will define exactly what, in the API the user has access to.  For our example we will not be using this field, as every user will have access to all vehicles)

Below this, you should note that there are 4 exported functions:
* **connect():** <br>This function simply ensures that we can connect to the DB and if successful, assign the "User" object as a "User" model, using the "users" collection (specified by userSchema).
* **registerUser(userData):** <br>Ensures that the provided passwords match and that the user name is not already taken.  If this is so, add the user to the system. 
* **checkUser(userData):** <br>This function ensures that the user specified by "userData" is in the system and has the correct password (used for logging in)

Lastly, before we can move on to test the application (below), we must update our "server.js" to "connect" to our user service, before we start the server, ie:

```
dataService.connect().then(()=>{
    app.listen(HTTP_PORT, ()=>{console.log("API listening on: " + HTTP_PORT)});
})
.catch((err)=>{
    console.log("unable to start the server: " + err);
    process.exit();
});
```

<br>

#### Hashed Passwords with bcrypt

Up to this point, our user service is storing passwords as plain text.  This is a serious security concern and as a result, passwords must **always** be encrypted.  In WEB422, we learned how to accomplish this using bcrypt...

<br>

#### Adding & Testing Authentication Routes

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
