---
title: Introduction to Securing a Web API with JWT
layout: default
---

## Introduction to Securing a Web API with JWT

Before we can begin learning about how to secure a Web API, we will need to create a simple Node.js server to handle our API requests.  To speed this along, we have included a simple Web API in the Code Examples for this week (See the "simple-API" folder from the [Week 11 example code](https://github.com/sictweb/WEB422/tree/master/Code%20Examples/week11)).  Currently, the primary function of this Web API is to return a hard-coded, static list of vehicles from its data-service.js module, using the route "/api/vehicles".  

Once you have grabbed the "simple-API" folder from gitHub, open it in Visual Studio and execute the command:

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

At this point, you may be asking "What is 'cors' and why do we need this module?".  CORS stands for "Cross-Origin Resource Sharing" and it is essentially a way to enable JavaScript to make an AJAX call from one origin (domain) to a server on a **different** domain.  This is not permitted by default, as browsers restrict these types of requests for security reasons. If we did not enable CORS, we could not use AJAX to make requests from our localhost to our API, if our API is placed online (ie: Heroku).

In addition to simply allowing all AJAX requests from outside domains, the CORS module also allows you to "whitelist" certain domains, thereby allowing access for specific domains, while restricting access from all others.

More details can be found on MDN under "[Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)" and the ["cors" module on NPM](https://www.npmjs.com/package/cors)

<br>

### Review User Account Management & Security

With our extremely simple "vehicles" API in place and producing data, we can now move on to discuss how we might *protect* this data from unwanted (unauthorized) access. 

Back in WEB322, we discussed a number of [security considerations](https://sictweb.github.io/web322/notes/week12) that are vital to a modern web application.  This primarily included coverage of HTTPS, Certificates / Certificate Authorities and password encryption (hashing). In today's example, we will focus on bcrypt, as well as a refresher on setting up a MongoDB Atlas DB to store our user information & credentials.

<br>

#### MongoDB Atlas & MongoDB

You should be familiar with MongoDB Atlas from our [experience in WEB322](https://sictweb.github.io/web322/notes/week08) as well as from your first WEB422 Assignment.  MongoDB Atlas will be responsible for hosting our separate (MongoDB) "simple-API-users" database.

To begin, set up a new "simple-API-users" database with a "users" collection for the simple API.  Once this is done, get a copy of the connection string - this should look something like: 

```
mongodb+srv://user:<password>@cluster0-abc1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

**Note:** You will have to change **myFirstDatabase** in the above connection string to **simple-API-users**, as well as the values for **user** and **&lt;password&gt;** to match the credentials that you created for a user of the cluster.

Be sure to keep track of your connection string, as we will be using it in the next piece:

#### Updating the "user-service"

To keep our DB authentication piece clean, we will be making use of the promise-based "user-service" module, defined in the "user-service.js" file.  If you open this file, you will see a space for your MongoDB connection string - enter it now before proceeding.

Next, you will notice a definition for a "user" Schema (userSchema).  In this case, it consists of 4 simple fields:

* **userName:** <br>A (unique) string representing the user's login/user name<br><br> 
* **password:** <br>The user's password<br><br>
* **fullName:** <br>Ths user's full name<br><br>
* **role:** <br>The user's role, ie "administrator", "data-entry", "maintenance", etc. (the user's role will define exactly what in the API the user has access to.  For our example we will not be using this field, as every user will have access to all vehicles)

Below this, you should note that there are 3 exported functions:

* **connect():** <br>This function simply ensures that we can connect to the DB and if successful, assign the "User" object as a "User" model, using the "users" collection (specified by userSchema).<br><br>
* **registerUser(userData):** <br>Ensures that the provided passwords match and that the user name is not already taken.  If the userData provided meets this criteria, add the user to the system.<br><br> 
* **checkUser(userData):** <br>This function ensures that the user specified by "userData" is in the system and has the correct password (used for logging in)

Lastly, before we can move on to test the application (below) we must update our "server.js" to "connect" to our user service before we start the server, ie:

```js
userService.connect().then(()=>{
    app.listen(HTTP_PORT, ()=>{console.log("API listening on: " + HTTP_PORT)});
})
.catch((err)=>{
    console.log("unable to start the server: " + err);
    process.exit();
});
```

<br>

#### Hashed Passwords with bcrypt (bcryptjs)

Up to this point, our user service has been designed to store passwords as plain text.  This is a serious security concern as passwords must **always** be encrypted.  In WEB322, we learned how to accomplish this using bcrypt.

Recall: To include bcrypt, we must install bcryptjs it using **npm** and "require" the module at the top of our user-service.js:

```
const bcrypt = require('bcryptjs');
```

Once we have the module, we can use the following logic to **hash** a password using bcrypt's **hash()** method, ie:

```javascript
// Encrypt the plain text: "myPassword123"
 bcrypt.hash("myPassword123", 10).then(hash=>{ // Hash the password using a Salt that was generated using 10 rounds
    // TODO: Store the resulting "hash" value in the DB
});
```

If we apply this process to our "registerUser" function (thereby *hashing* the provided password when registering the user), our code will look like this:

```javascript
module.exports.registerUser =  function (userData) {
    return new Promise(function (resolve, reject) {

        if (userData.password != userData.password2) {
            reject("Passwords do not match");
        } else {

            bcrypt.hash(userData.password, 10).then(hash=>{ // Hash the password using a Salt that was generated using 10 rounds
                
                userData.password = hash;

                let newUser = new User(userData);

                newUser.save((err) => {
                    if (err) {
                        if (err.code == 11000) {
                            reject("User Name already taken");
                        } else {
                            reject("There was an error creating the user: " + err);
                        }

                    } else {
                        resolve("User " + userData.userName + " successfully registered");
                    }
                });
            })
            .catch(err=>reject(err));
        }
    });      
};
```

This makes the code a little longer and harder to follow, but we are really only adding the **bcrypt.hash()** method to our existing function.

If we wish to **compare** a plain text password to a **hashed** password, we can use bcrypt's **compare()** method with the following logic:

```javascript
// Pull the password "hash" value from the DB and compare it to "myPassword123" (match)
bcrypt.compare("myPassword123", hash).then((res) => {
   // if res === true, the passwords match
});
```

If we apply this to our "checkUser" function (thereby comparing the DB's *hashed* password with the provided password), our code will look like this:

```javascript
module.exports.checkUser = function (userData) {
    return new Promise(function (resolve, reject) {

        User.find({ userName: userData.userName })
        .limit(1)
        .exec()
        .then((users) => {

            if (users.length == 0) {
                reject("Unable to find user " + userData.userName);
            } else {
                bcrypt.compare(userData.password, users[0].password).then((res) => {
                    if (res === true) {
                        resolve(users[0]);
                    } else {
                        reject("Incorrect password for user " + userData.userName);
                    }
                });
            }
        }).catch((err) => {
            reject("Unable to find user " + userData.userName);
        });
    });
};
```

Not much has changed here.  Instead of simply comaring userData.password with users\[0\].password directly, we use the **bcrypt.compare()** method.

<br>

#### Adding & Testing Authentication Routes

Now that we have a working "user" service that will handle registering and validating user information, we should add some new "/api/" authentication routes to add the functionality to our API.  

Since our new routes will be accepting input (via JSON, posted to the route), we will need to configure our server to correctly parse "JSON" formatted data.  As you will recall from WEB322, this can be accomplished by adding the line:

```javascript
app.use(express.json());
```

With the middleware correctly configured, we can reliably assume that the "body" property of the request (req) will contain the properties and values of the data sent from the AJAX request.

**NOTE:** We do not yet have a UI to gather user information for registration and validation, so we must make use of an API testing tool such as the [Thunder Client Extension](https://www.thunderclient.io/) to make requests and provide POST data when testing our new routes.

<br>

**New Route: /api/register**

This route simply collects user registration information sent using POST to the API in the form of a JSON-formatted string, ie: 

```json
{
    "userName": "bob",
    "password": "myPassword",
    "password2": "myPassword",
    "fullName": "Robert Wiley",
    "role": "administrator"
}
```

Fortunately, our **userService.registerUser()** function is perfectly set up to handle this type of data.  It will validate whether password & password2 match and check that the user name "bob" is not taken.  If the data meets these requirements, the provided password will be hashed and the user will be entered into the system.  Therefore, our new /api/register route is very simple; it must simply pass the posted data to the userService for processing and report back when it has completed, ie:

```javascript
app.post("/api/register", (req, res) => {
    userService.registerUser(req.body)
        .then((msg) => {
            res.json({ "message": msg });
        }).catch((msg) => {
            res.status(422).json({ "message": msg });
        });
});
```

**NOTE:** The 422 error code communicates back to the client that the server understands the content type of the request  and the syntax is correct but was unable to process the data ([https://httpstatuses.com/422](https://httpstatuses.com/422)).

To test this new route, stop and start your API (server.js) again and proceed to make the following request:

* Make sure **POST** is selected in the request type dropdown
* In the address bar, type: "http://localhost:8080/api/register"
* In the **Headers** tab, ensure that "Content-Type" is selected with a value of "application/json"
* In the **Body** tab, copy and paste our information for user "bob" in the provided text area:

```json
{
    "userName": "bob",
    "password": "myPassword",
    "password2": "myPassword",
    "fullName": "Robert Wiley",
    "role": "administrator"
}
```

Once the request is processed, it should return with a status 200 and the JSON: 

```json
{
    "message": "User bob successfully registered"
}
```

<br>

**New Route: /api/login**

In addition to **adding** users to the system, we must also be able to **authenticate** users and allow them to "login" before being granted access to the data.  In this case, all of the work required for authenticating user data is done in the "dataAuth.checkUser()" method.  So (like "/api/register"), our "/api/login" route, will once again pass the posted data to the userService for processing and report back when it has completed, ie: 

```javascript
app.post("/api/login", (req, res) => {
    userService.checkUser(req.body)
        .then((user) => {
            res.json({ "message": "login successful" });
        }).catch((msg) => {
            res.status(422).json({ "message": msg });
        });
});
```

To test this new route, once again stop and start your API (server.js) and make another request.  We will keep most of the values the same, with the following exceptions:

* In the address bar, type: "http://localhost:8080/api/login"
* In the **Body** tab, copy and paste our information for user "bob" in the provided text area:

```json
{
    "userName": "bob",
    "password": "myPassword"
}
```


Again, when you're sure you've entered everything correctly and your server is running, hit the blue **Send** button to send the POST data to the API.

Once the request is processed, it should return with a status 200 and the JSON: 

```json
{
    "message": "login successful"
}
```

You can also try entering incorrect credentials in the request body (ie: a different "userName", or an incorrect "password") to validate that our service is indeed functioning properly and will not send the "login successful" message to unauthorized users. 

<br>

### Introduction to JSON Web Tokens (JWT)

With our new authentication routes tested and working correctly, we can now concentrate on leveraging this logic to actually **secure** the vehicle data in our simple API.  Currently, the /api/vehicles route is available to anyone, regardless of whether they've been authenticated or not.  You can see this by executing a POST request to "/api/login" with an incorrect password for "bob", followed by GET request for "/api/vehicles".  The fact that we did not provide correct credentials during the "login" phase, had no affect on whether or not we can access the data on the "/api/vehicles" route.  

So, how can we solve this problem?  In WEB322, we would send a [cookie](https://sictweb.github.io/web322/notes/week10) back to the client, once they're logged in, to be used for subsequent requests. Unfortunately, we cannot rely on cookies to solve this problem, as we cannot guarantee that the client accessing the data is a web browser.  Our API simply takes individual JSON-formatted requests, sent over HTTP and returns JSON-formatted responses.  

Instead, what we need is some kind of secure "logged in" identifier that we can **send** back to the client that can then be stored and used for subsequent requests.  The philosophy is similar, however we will not rely on cookies or make any assumptions about how the client will store this identifier.  

The client must then send the identifier as part of each request and the server will have to know that it originally sent the identifier and it has not been tampered with.<br><br>  

**JSON Web Token (JWT) to the rescue**

> JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

This is perfect for our purposes.  We can generate a JWT on the server (only) once the user has been **successfully authenticated** and send it back to the client along with the "login successful" message.  It will contain digitally-signed information about the authenticated user such as their "userName", "fullName" & "role" (but **never** their password).  The client can then read this information and **send the JWT back to the server** in an "Authorization" header with every subsequent request to be verified on the server. Since it is digitally signed on the server using a "secret", we can verify that the data has not been tampered with and that the JWT did indeed come from our simple API server.

> **When should you use JSON Web Tokens?**<br>Here are some scenarios where JSON Web Tokens are useful:<br><br>**Authorization:** This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. Single Sign On is a feature that widely uses JWT nowadays, because of its small overhead and its ability to be easily used across different domains.<br><br>**Information Exchange:** JSON Web Tokens are a good way of securely transmitting information between parties. Because JWTs can be signed—for example, using public/private key pairs—you can be sure the senders are who they say they are. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't been tampered with.

For more information about JWT, including the signature &amp; structure of the payload, see the excellent documentation at [https://jwt.io/introduction/](https://jwt.io/introduction/)

<br>

### Securing routes with JWT

We have now identified that we would like to work with JWT to secure our routes.  However, how do we go about implementing JWT generation and verification in our server.js?  This will involve 3 key modules, obtained from NPM:

<br>

#### jsonwebtoken

The ["jsonwebtoken" module](https://www.npmjs.com/package/jsonwebtoken) (available using `npm install jsonwebtoken --save` &amp; added to server.js using: `var jwt = require('jsonwebtoken');`).  In our application, this module is used primarily to **"sign"** our JSON payload with a 'secret' and generate the token, ie:

```javascript
var token = jwt.sign({ userName: 'bob' }, 'secret');
```

We can also use a 3rd parameter to specify options such as **expiresIn** (A numeric value is interpreted as a seconds count):

```javascript
jwt.sign({
  userName: 'bob'
}, 'secret', { expiresIn: 60 * 60 });
```

For more information on the usage of this function including additional options, methods and errors/codes see [the documentaiton for jsonwebtoken on npm](https://www.npmjs.com/package/jsonwebtoken)

<br>

#### passport

The ["passport" module](https://www.npmjs.com/package/passport) (available using `npm install passport --save` &amp; added to server.js using `var passport = require("passport");`) is described as the following:

> Passport is Express-compatible authentication middleware for Node.js.<br><br>Passport's sole purpose is to authenticate requests, which it does through an extensible set of plugins known as strategies. Passport does not mount routes or assume any particular database schema, which maximizes flexibility and allows application-level decisions to be made by the developer. The API is simple: you provide Passport a request to authenticate, and Passport provides hooks for controlling what occurs when authentication succeeds or fails.

In our application, we will be using the following methods: 

* **"initialize"**: This method is invoked when we add the passport middleware using the familiar **app.use()** method, ie: 

```javascript
app.use(passport.initialize());
```

* **"authenticate"**: The "authenticate" method is used as a middleware function that can be used for each of our routes that we wish to secure.  For example: 

```javascript
app.get("/api/vehicles", passport.authenticate('jwt', { session: false }), (req, res) => {
    // ... 
}
```

* **"use"**: The "use" method is where we specify our "strategy" for authenticating our routes.  This is done near the top of server.js after the "strategy" is configured (see: "passport-jwt" below), ie: 

```javascript
passport.use(strategy);
```

<br>

#### passport-jwt

The ["passport-jwt" module](https://www.npmjs.com/package/passport-jwt) (available using `npm install passport-jwt --save` &amp; added to server.js using `var passportJWT = require("passport-jwt");`) is the "strategy" that the "passport" module (above) requires to authenticate our routes using JWT.  Using "passportJWT", we can specify the "strategy" using a set of **options** (defined in our server as an object called **jwtOptions**: `var jwtOptions = {};`), such as the "secretOrKey", as well as specifying how to read the jwt from the authentication header.

For example, once we have a reference to the "passport-jwt" module (ie: "passwordJWT", from above), we can use the following code to configure our strategy:

```javascript
// JSON Web Token Setup
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

// Configure its options
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

// IMPORTANT - this secret should be a long, unguessable string 
// (ideally stored in a "protected storage" area on the web server).
// We suggest that you generate a random 50-character string
// using the following online tool:
// https://lastpass.com/generatepassword.php 

jwtOptions.secretOrKey = '&0y7$noP#5rt99&GB%Pz7j2b1vkzaB0RKs%^N^0zOP89NT04mPuaM!&G8cbNZOtH';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);

    if (jwt_payload) {
        // The following will ensure that all routes using 
        // passport.authenticate have a req.user._id, req.user.userName, req.user.fullName & req.user.role values  
        // that matches the request payload data
        next(null, { _id: jwt_payload._id, 
            userName: jwt_payload.userName, 
            fullName: jwt_payload.fullName, 
            role: jwt_payload.role }); 
    } else {
        next(null, false);
    }
});
```

There's a lot going on in the above code, but the key pieces involve first defining the **jwtOptions** (using the **jwtFromRequest** and **secretOrKey** properties) and then defining the "strategy" as a (JwtStrategy) middleware function using the jwtOptions and providing a callback function.  The callback function simply checks that there is indeed a valid jwt_payload and if so, invoke the **next()** method with the payload data as it's second parameter.  If the jwt_payload is invalid, the **next()** method will be called without the payload data, which will cause our server to return a **401 (Unauthorized)** error.

<br>

### Adding the code to server.js

With all of the individual pieces of our JWT solution identified, it's now time to update server.js:

#### Step 1: Requiring the Modules

As you will recall (from above), our JWT enabled server.js will require 3 modules: "jwt", "passport" &amp; "passport-jwt" to function correctly.  Once these modules are installed via NPM (ie: "npm install ..."), we can add them to our list of imports at the top of server js:

```javascript
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
```

<br>

#### Step 2: Configuring the "Strategy"

With our modules added, we can now add the code to configure the JWT "strategy".  Recall, this involves creating a **jwtOptions** object that we can pass to the **jwtStrategy** constructor, along with a callback function that looks at the "jwt_payload" parameter. For our purposes, we can use the code exactly as it has been identified above, placed before our first "app.use()" statement.  However, a **new** "secretOrKey" property should be generated (optionally using the ["Generate Password" Tool](https://www.lastpass.com/password-generator) from LastPass). 

**NOTE:** If the "user" has different properties (ie, something *other* than, "\_id", "userName", "fullName" and "role"), the data passed in the **next()** function should be modified to reflect the correct properties.

```javascript
// JSON Web Token Setup
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

// Configure its options
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");

// IMPORTANT - this secret should be a long, unguessable string 
// (ideally stored in a "protected storage" area on the web server).
// We suggest that you generate a random 50-character string
// using the following online tool:
// https://lastpass.com/generatepassword.php 

jwtOptions.secretOrKey = '&0y7$noP#5rt99&GB%Pz7j2b1vkzaB0RKs%^N^0zOP89NT04mPuaM!&G8cbNZOtH';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);

    if (jwt_payload) {
        // The following will ensure that all routes using 
        // passport.authenticate have a req.user._id, req.user.userName, req.user.fullName & req.user.role values 
        // that matches the request payload data
        next(null, { _id: jwt_payload._id, 
            userName: jwt_payload.userName, 
            fullName: jwt_payload.fullName, 
            role: jwt_payload.role }); 
    } else {
        next(null, false);
    }
});
```

<br>

#### Step 3 Set the Strategy &amp; Add the Middleware

The last step needed to tell our server that we wish to use Passport (with the "JWT" strategy), by adding the function as middleware to our server using **app.use()**:

```javascript
// tell passport to use our "strategy"
passport.use(strategy);

// add passport as application-level middleware
app.use(passport.initialize());
```

<br>

#### Step 4 Generating &amp; Sending the JWT 

At this point, we're all set to work with JWT.  We have the correct modules added and the Passsport middleware is configured and added to our application.  However, before we can *protect* our routes (see below), we need to first **send** the token back to the client.  Currently, our api/login route simply sends the data:

```json
{ 
    "message": "login successful" 
}
```

along with a 200 status code, to indicate that the login was indeed successful.  If we wish to grant this user access to our (soon to be) protected routes, we will have to also provide the JWT as a means of identification.  Using the **sign()** method of the included **jsonwebtoken** module, we can generate it and send it back to the client alongside the "message".  

To accomplish this, we need to add the following code to our "/api/login" route at the top of our **userService.checkUser(req.body).then( ... )** callback:

```javascript
 var payload = { 
    _id: user._id,
    userName: user.userName,
    fullName: user.fullName,
    role: user.role
};

var token = jwt.sign(payload, jwtOptions.secretOrKey);
```

This will generate a JWT for us using the user's "\_id", "userName", "fullName" and "role" properties, encrypted with our "secretOrKey" (identified when we configured our passport strategy in jwtOptions).

Once we have the token, we can send it back along with the message to the user using **res.json()** (typically using the property: "token"):

```javascript
res.json({ "message": "login successful", "token": token });
```

<br>

#### Step 5 Protecting Route(s) using the Passport Middleware

In order to restrict access to our /api/vehicles route, we need to employ the Passport middleware "authenticate" function (identified above in our **authenticate()** example).

This simply involves adding the code: 

```javascript
passport.authenticate('jwt', { session: false })
```

as a middleware function to any routes that we wish to protecet (ie: our /api/vehicles route):

```javascript
app.get("/api/vehicles", passport.authenticate('jwt', { session: false }), (req, res) => {
    // ... 
}
```

You will notice that we provide the option "session: false".  This is because we require credentials to be supplied with each request, rather than set up a session.  For more information and configuration options, see the Passport.js documentation, under ["Authenticate"](http://www.passportjs.org/docs/authenticate/).


### Testing the New Functionality

We have now completed all of the changes that are required on our server.js and are ready to test our Simple API and see if this technology really works to protect our routes.

To test this, we must insure the following series of actions yields the expected results (listed below):


- **Action**: Attempt to access the route /api/vehicles as before (without supplying a JWT).<br><br>
- **Expected Result:** Server returns a 401 error code and the text "unauthorized".

![Unauthorized](/media/API-test-1.png)


- **Action**: Log in as user "bob" (as above) and copy the value of the returned "token" property.

![Login Token](/media/API-test-2.png)


- **Action**: Attempt to access the route /api/vehicles as before, only this time add the header "Authorization" with the value "JWT" followed by a *space*, followed by the returned "token" that was sent when "bob" logged in (above)<br><br>
- **Expected Result:** Vehicle data is returned

![Vehicle Data](/media/API-test-3.png)


- **Action**: Attempt to access the route /api/vehicles again, only this time slightly modify the JWT (ie: remove/add a character).<br><br>
- **Expected Result**: Server returns a 401 error code and the text "unauthorized".

![Unauthorized](/media/API-test-4.png)

<br>



