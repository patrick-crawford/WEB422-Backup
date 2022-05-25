---
title: React get started
layout: default
---

## Getting started with React

The next part of our learning journey will depend almost completely on the excellent content that the React development team has published. 

Get ready by visiting the [React home page](https://reactjs.org/), and read/scan the content.

<!-- On the top navigation menu, notice the [Docs](https://reactjs.org/docs/installation.html) (documentation) and [Tutorial](https://reactjs.org/tutorial/tutorial.html) items. 

![React web site](/media/react-web-site.png) -->
<br>

### Create an app

At its heart, react is really a "JavaScript library for building user interfaces" and as such, it can be added to your site [in one minute](https://reactjs.org/docs/add-react-to-a-website.html#add-react-in-one-minute) by including some &lt;script&gt; tags.  However, we will leverage the popular [create-react-app](https://github.com/facebook/create-react-app#readme) command line tool.

Begin by creating a new folder on your machine and open it using Visual Studio Code.  Next, open the Integrated Terminal and (assuming that you want to create a new app (and folder) named "my-app") execute the command:

```text
npx create-react-app my-app
```

The process will create a new folder called "my-app", with the code needed to get started.

<br>


### Files and folders in a new generated React app

The `create-react-app` generator creates a folder with many code assets included.

The `node_modules` folder has code used by the development, packaging, and deployment phases of your work. 

The `public` folder has the very important "root" or start page of your app, `index.html`. Other assets can be added here that can be referenced directly by the code in the index page. 

The `src` folder has your app's initial source code. Edit and add, to build up your app. 

<br>

### Contents of `index.html`

Typical of React (and Angular) apps, the "root" or starting point of an app is or appears to be almost empty. Notice the single `<div>` in the body element.

As it states in the code comments, "The build step will place the bundled scripts into the `<body>` tag". Then, the scripts - the app itself - will replace the content of the div element with the components in the app. 

<br>

### Run the app

A React app is a client-side front-end app. It does NOT have a server part to it. A browser user "pulls" a React app, by visiting a URL that is the "root" of the app. As you will learn later, the packaging and deployment process creates a bundle of files that are sent to the browser when the root of the app is requested for the first time. 

That being said, all React developers - you included now - will [start](https://docs.npmjs.com/cli/start) an on-demand per-instance Node.js server, and listen on the app's URL. Then, from a browser, the app is pulled to the browser's memory, and is ready for use. 

Therefore, start the server listener (NOTE: if you are not currently within the "my-app" folder, execute the command `cd my-app` to move there now):

```text
npm start
```

The server begins listening on HTTP port 3000. Depending on your computer's configuration, it may automatically open a browser to the [localhost port 3000 URL](http://localhost:3000/). 

<br>

### Edit the app

An easy edit, just to prove that you can do so, is to edit the `App.js` file in the `src` folder. Change the text "Learn React" to anything else (ie: your name). After you save your changes, switch over to the browser window. It should show the new content. Behind the scenes, the Terminal process will regenerate the content, making changes where necessary to the deployment assets. As part of the process, the browser will refresh the visible content.

<br>

### What's next?

So far, we have a single *component:* **App**.  This is our high-level component that we will place all of our other components inside.  If you open the "index.js" file, beneath the "import" statements (discussed later) at line 7, you should see the lines:

```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

The above code is responsible for rendering our "App" component (in ["Strict Mode"](https://reactjs.org/docs/strict-mode.html)) within the: `<div id="root"></div>` element in the "public/index.html" file.  

To continue our learning and begin to develop apps using React, keep reading the Week 3 notes with: [Introduction to React Components](react-components-1).

Happy Coding!

