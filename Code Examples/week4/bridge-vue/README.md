# Bridge Vue

This week we'll build a small Vue web app using real data, third-party libraries,
and the [Vue CLI](https://cli.vuejs.org/).

The data we'll use is based on a freely available dataset on [bridges in the province](https://www.ontario.ca/data/bridge-conditions), from the Government of Ontario.  We'll
use this data under the [Open Government Licence - Ontario](https://www.ontario.ca/page/open-government-licence-ontario).

Our goal will be to create an app like the following:

![Screencast of final app](bridge-vue.gif)

## Project Data

Before we look at code, let's begin with our data.  Creating modern web frontends
often starts with data, and uses that to direct our code.  For this app, we'll be
using a simple JSON API endpoint:

https://api.myjson.com/bins/17fpo0

This API allows us to `GET` a processed version of the [bridge dataset](https://www.ontario.ca/data/bridge-conditions) as JSON.  We're using the `http://myjson.com/`
service to host our data for free as a [CORS enabled API](http://myjson.com/api).

You can view the data in a *pretty* format at https://api.myjson.com/bins/17fpo0?pretty=1.
Its an `Array` of `Object`s, each having the following format:

```json
{
  "id": 0,
  "name": "Highway 24 Underpass at Highway 403",
  "lat": 43.167233,
  "lng": -80.275567,
  "year": 1965,
  "length": 65,
  "width": 25.4
}
```

We'll need to write code to *use* this API, process the data a bit so we can
work with it on the web, and then display it in interesting ways to our users.

## Project Creation with Vue CLI

We'll use the [Vue CLI](https://cli.vuejs.org/) to create our app.

> NOTE: this folder already contains a pre-created Vue app, using the steps above.
> You can use it, or make your own.  If you're using the pre-built version in this
> repo, you should install all dependencies using `npm install` and skip this section.

Install the Vue CLI using the [steps defined in the guide](https://cli.vuejs.org/guide/installation.html):

```
npm install -g @vue/cli
```

Now use the `vue create` command to [create a new Vue project](https://cli.vuejs.org/guide/creating-a-project.html):

```
vue create bridge-vue
```

You can use the **default** project settings when prompted:

![Vue CLI default settings](https://cli.vuejs.org/cli-new-project.png)

This will create a `bridge-vue/` directory, with all necessary dependencies installed,
and a basic project created.  We can run the project using the following:

```
cd bridge-vue
npm run serve
```

We can leave the web server running while we write the rest of our code, and it
will automatically reload as we update our files.

NOTE: this folder already contains a pre-created Vue app, using the steps above.
You can use it, or make your own.

## Project Layout

Our project is broken up into the following files and directories:

```
/bridge-vue
    /public
        favicon.ico      <-- our project's icon
        index.html       <-- main html file
    /src
        assets/          <-- any static assets we need (e.g., images)
        components/      <-- our custom Vue components go here
        App.vue          <-- our application's main component
        main.js          <-- our project's entry point (main JavaScript file)
```

### `public/index.html`

Let's start with our main HTML page, which can be very simple: just enough
to get host our Vue application and components.  Our Vue app will get *mounted*
in the `<div id="app"></div>` element.  Notice too that this `<div>` is itself
contained with a `<main></main>` element, which we'll use to create our layout.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">

    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <title>Ontario Bridges</title>
  </head>
  <body>
    <main>
        <div id="app"></div>
        <!-- built files will be auto injected -->
    </main>
  </body>
</html>
```

One notable thing here is the use of `<%= BASE_URL %>` for the favicon path.  This project
uses [webpack](https://webpack.js.org/) to build and bundle our code.  The
use of `<%= BASE_URL %>` tells webpack to substitute the value of `BASE_URL`
when building.  You can [read more about why we use this here](https://cli.vuejs.org/guide/html-and-static-assets.html).

Finally, notice how there is no JavaScript here at all.  When webpack builds our
code, it will inject it automatically for us.

### `src/main.js`

Next we look at our application's main entry point, `src/main.js`:

```js
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

const vm = new Vue({
  render: h => h(App),
}).$mount('#app');
```

Our project `import`s both `Vue` and our main `App.vue` component.  The third
line gives a hint to Vue that we are going to be working in development mode,
and [don't need production warnings](https://vuejs.org/v2/guide/deployment.html).

Next we create an instance of our Vue view-model.  The format is slightly different
from what we've done in the past.  Instead of defining a `template` to use, this
uses a so-called `render` function.  The name [`h` is shorthand
for `createElement`](https://vuejs.org/v2/guide/render-function.html#The-Virtual-DOM),
and Vue gives us a function to use which can create our component.  You can
read a [good discussion of this here](https://css-tricks.com/what-does-the-h-stand-for-in-vues-render-method/).

Finally, it takes the *virtual node* created by `h()` and calls `$mount()` on
it, to place it into the DOM, in this case using the element with `id="app"`.

### App.vue

The bulk of our code begins in our `App.vue` component.  Here we define the top-level
layout of our application, and its main logic.  We could put everything here; that is,
we could include all JS, CSS, and HTML for all aspects of our page in this one file.
However, we'll break it up (decompose it) into a set of components, each of which
will manage different parts of the page. 

Here's what it looks like at first:

```html
<template>
  <div id="app">

    <nav id="menu">
      Menu goes here...
    </nav>

    <div id="bridge-info">
      Bridge info goes here...
    </div>

  </div>
</template>

<style>
/* All CSS for this component will go here */
</style>

<script>
export default {
  name: "App",
  data: function() {
    return {
    };
  }
};
</script>

```

Our `template` defines the top-level UI to be a main container (`#app`) with
two children: a `#menu` and some `#bridge-info`.

We don't have any CSS in the `style` block yet, but we'll add that below.

Our `script` exports an `Object` for our component, which includes its `name`,
as well as `data`.  Because this is a component, and it's possible for there
to be more than one instance of a component, we use a `function` to return
our `data` vs. an `Object`.  Each instance of a component can then have its
own `data`.

#### CSS Style

Let's begin with our UI's layout and general styles.  We need our Vue app
to fill the window (i.e., 100% `width` and `height`, no `margin`).  We also
need to divide the window into one thirds: one-third for the menu, two-thirds
for the bridge info pane.

We'll start with the top-level elements:

```css
html,
body,
main {
  height: 100%;
  max-height: 100%;
  margin: 0;
  font-family: Helvetica, Arial, sans-serif;
}
```

Now our `html`, `body`, and `main` elements all use 100% of the window's `height`,
but no more than that (i.e., `max-height` is also 100%).  By default they will
all use 100% of the `width` automatically (i.e., we could include `width: 100%`
but it's not necessary).  We've also added a `font-family` to improve the look.

Next we need to stretch our `#app` container `div` to fill the entire window.
There are various ways to do this in CSS, but we'll use [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) in this app. With
Flexbox we can stretch (or shrink) child contents evenly in a parent container.
If you're new to Flexbox, [this guide is also really well done](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

To use Flexbox, we specify `display: flex` on a parent container.  This tells
the browser to use Flexbox when laying out the container's child elements.
Flexbox allows us to specify the [`flex-direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) to use, which will affect how items are placed in the container.
By default this will be `row` (i.e., left to right), but we can also specify
`column` for a top to bottom layout.

Using these techniques, we can combine Flexbox on a number of containers to
achieve our desired layout.  On large screens, our `main` element will *flex* from
top to bottom, and our `#app` will *flex* from left to right.  When the available
screen size shrinks (e.g., mobile), we'll use a [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) to stack our layout
(i.e., use top-down vs. left-to-right).  In both cases, we don't want our `#app`
to scroll, so we'll set the [`overflow` to `hidden`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow):

```css
main {
  display: flex;
  flex-direction: column;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

@media screen and (max-width: 400px) {
  #app {
    flex-direction: column;
  }
}
```

Last, we need to divide our `#app` into a two column layout, with the `#menu`
taking one-third of the space, and the rest (two-thirds) for the `#bridge-info`.
We won't specify an exact width, but let the browser figure it out.  To do this,
we'll specify that we have 3 units total in our `#app` flex container: 1 unit
for the `#menu`, and 2 units for the `#bridge-info`. Because our menu will be
really long, we'll tell the browser to add scrollbars as
necessary with [`overflow: auto`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow):

```css
#menu {
  flex: 1;
  overflow: auto;
}

#bridge-info {
  flex: 2;
}
```


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
