---
title: WEB422 Week 11
layout: default
---

## WEB422 Week 11 Notes

This week, we will discuss how we can handle the **security** of a Web API and by extension, in an Angular application.  This will involve adding routes to a Node/Express server for **logging in** and **registering** users, connecting to a MongoDB database and hashing passwords.   We will also look at how we can modify the server to generate a special type of secure token, ie: a JSON Web Token (JWT) that contains a signed payload that can be sent to the client once they've been authenticated.  Client apps can use this token as an identifier to be sent with all requests to prove the identity of a logged in user. 

Next, once we have secured a Web API, we will discuss how we can work with the new features in an Angular application.  This will involve automatically storing and retrieving the JWT, as well as protecting routes within the application from unauthorized access.

For more information: 

* [Introduction to Securing a Web API with JWT](intro-web-api-security.md)
* [Incorporating JWT in an Angular Application](intro-angular-jwt.md)

Remember to frequently use the [learning resources](/web422/resources).
