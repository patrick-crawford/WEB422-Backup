---
title: Angular getting started
layout: default
---

## Getting started with Angular

> **Quick Note:** Some of the below code examples and explanations have been reproduced from sections of the [official online documentation](https://angular.io/) for Angular. 

### Installation

During the React topic coverage, you learned to use and perhaps install the *React app generator*. As you experienced, it adds a good amount of value to the dev process.

Angular has an app generator too, the [Angular CLI](https://cli.angular.io/). It adds the `ng` command to your shell. 

![Angular CLI web site](/media/angular-cli-web-site.png)

<br>

Install Angular CLI on your computer:

```bash
npm install -g @angular/cli
```

<br>

### Create an app

Next, create a new app. Assuming that you want to create a new app (and folder) named "my-dream-app", execute the following command:

```bash
# upper and lower case use for the options is important
ng new my-app --routing -S -g
```

Next, you will be presented with the following options:

```bash
Do you want to enforce stricter type checking and stricter bundle budgets in the workspace?
This setting helps improve maintainability and catch bugs ahead of time.
For more information, see https://angular.io/strict y/N)
```

Hit **Enter** to accept the default "N"

```bash
Which stylesheet format would you like to use? (Use arrow keys)
```

Hit **Enter** to accept the default "CSS"


The process will create a new folder, with the code needed to get started.

> Notes:  
> The `--routing` option adds the code we need for "routing", which is a topic that will be covered soon. Adding routing now (when the new project is created) is a *best practice*.  
> The `-S` option avoids adding "testing" code. We don't need that in the near future.  
> The `-g` option does not create a Git repository for the project. We don't need a repo in the near future.

<br>

### Run the app

Similar to a React app, an Angular app is a client-side front-end app. It does NOT have a server part to it. A browser user "pulls" an Angular app, by visiting a URL that is the "root" of the app. As you will learn later, the build, packaging, and deployment process creates a bundle of files that are sent to the browser when the root of the app is requested for the first time. 

That being said, during development on your computer, will start an on-demand per-instance Node.js server, and listen on the app's URL. Then, from a browser, the app is pulled to the browser's memory, and is ready for use. 

Therefore, start the server listener:

```bash
cd my-app
ng serve --open
```

> Note: The `--open` option opens a browser tab and loads the app. 

The server begins listening on HTTP port 4200. 

![Server is running](/media/angular-server-process.png)

<br>

A browser tab/window should open, loading the resource [localhost port 4200 URL](http://localhost:4200/). 

<br>

### Edit the app

Edit the app, using Visual Studio Code.

An easy edit, just to prove that you can do so, is to edit the `app.component.ts` file in the `src/app` folder. Change the text in the value of the "title" property. 

After you save your changes, switch over to the browser window. It should show the new content. Behind the scenes, the Terminal process will regenerate the content, making changes where necessary to the deployment assets. As part of the process, the browser will refresh the visible content.


<br>

### "my-app" Folder Structure

The Angular CLI has included many files and folders for us to begin our development effort. At the moment, we will be primarily focusing on:  

* The `src` folder: This is where all the code for your app will reside
* The `src/app` folder:  This folder contains the code assets for the "app" component (every new component that we create will be in its own folder within `src`)

![New app folder structure](/media/angular-cli-project-structure-2.png)

<br>

### What's next?

Now that we have our development environment all set up to start working with Angular, why don't we dive in and start building our own components?  The next section of notes for this week covers a quick introdution to Angular Components:

[Angular Components Introduction](angular-components-1)

Happy coding!

<br>
