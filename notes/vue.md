---
title: Introduction to Vue.js
layout: default
---

## Introduction to Vue.js

[Vue.js](https://vuejs.org/) (often abbreviated to "Vue") is a JavaScript library
that helps you to create rich, responsive user interfaces with a clean underlying data model.

Any time you have sections of UI that update dynamically (e.g., changing depending on the user’s actions or when an external data source changes), Vue can help you implement it more simply and maintainability.

Vue was started by [Evan You](https://evanyou.me/) in 2014, while working at Google. Today, Evan is [supported by the community](https://www.patreon.com/evanyou) to focus on Vue fulltime. Vue is focused on being small, approachable, and implementing some of the best ideas from other popular frameworks (e.g., Angular and React).  Vue has been popular worldwide, but especially in Asia, where some of the largest companies (Alibaba, Baidu, Nintendo) have adopted it.

Vue has a smaller learning curve than React or Angular, but gives developers much of the same feature set.  As such, it's a good first framework, and will help us get started with many of the important concepts in modern front-end web development.

<br>

### Learning and Readings

One of the nice features of Vue is that you can learn the basics in a day or two,
and then, because the documentation is so good, you can look things up as you progress.

To begin learning Vue, read the official [Vue Guide](https://vuejs.org/v2/guide/).

As a Seneca student, you also have access to
[many online, video courses about Vue through Lynda.com](https://www.lynda.com/search?q=vue&f=meta_software_facet%3aVue.js).  This are an excellent way to supplement the official documentation and guide.

<br>

### Installation

Vue is a **client-side** library, and can be included in a number of ways.  We'll focus on the first two in our examples
below, and you can experiment with the third when you've become more comfortable:

1. Include it as a script: `<script src="https://unpkg.com/vue"></script>`
1. `import` it as a module: `import Vue from 'vue'`, and [bundle it with Parcel](https://parceljs.org/vue.html).
1. Use the [Vue CLI](https://cli.vuejs.org/) to generate, develop, and build our Vue web apps.

<br>

### Headline features

* **Progressive** - Vue is a progressive framework that builds on exiting HTML, CSS, and JS.  You can incrementally adopt aspects of it over time vs. having to start with everything.  However, you can also scale it to do everything a complex web app requires.
* **Reactivity** - Data is kept separate from its presentation.  Vue creates a Virtual DOM that links the real DOM and data for us, and when things change, it *reacts* and updates the app. Vue automatically changes only what is necessary to reflect the app's new state.  We don't have to worry about managing the DOM.
* **Composable Components** - Vue breaks a web page or app down into a tree of components, each responsible for its own data, logic, and presentation.  Being able to compose larger web UIs out of our own, or third-party components, is very powerful.
Vue uses a simple, declarative templating system to define a component's UI.  These can be combined with powerful one- and two-way data binding, events, and other programmatic features.
* **Large and Growing Ecosystem** - Vue is incredibly popular, and the ecosystem of docs, tools, components, and supporting libraries around it is extensive.

<br>

### Data Model? Introducing the "MVVM" design pattern

Vue uses the "MVVM" ("Model - View - View Model") design pattern:

Essentially, MVVM describes how you can keep a potentially sophisticated UI simple by splitting it into three parts:
1. Model
2. View model
3. View

<br>

#### A model (the first "M" in the initialism): 

The model is your application’s persisted (stored) data. 

This data represents objects and operations in your business domain (e.g., bank accounts that can perform money transfers) and is independent of any UI. We may begin our app by requesting data from a REST API, then manage it as pure JS data within our model.

> For example, we will use the Teams API

![MVVM](https://upload.wikimedia.org/wikipedia/commons/8/87/MVVMPattern.png)

<br>

#### A view model (the last "VM"): 

A view model is a code-only representation of the data model *and* any supported operations.

For example, if you’re implementing a list editor, your view model would be an object holding a list of items, and would expose methods to add and remove items.

Note that this is not the UI itself, as it doesn’t have any concept of buttons or display styles. It’s not the persisted data model either. It holds the unsaved data the user is working with. 

The view model makes data binding easier, by abstracting logic and other dynamic
properties of the model, and allowing the view to simply consume them.  Instead
of placing logic and state handling in our UI view layer, we can instead layer
dynamic behaviour onto our data model in the view model, and allow the view to
stay focused on presentation.

In Vue it is common to name our application instance variable `vm` to signify
that it is a view model.  

<br>

#### A view (the middle "V"): 

A view is a visible, interactive UI area, representing the current state of the view model.

It displays information from the view model, sends commands to the view model (e.g., when the user clicks buttons), and updates whenever the state of the view model changes.

In Vue this will be our `<template>...</template>` markup.

<br>

### Example 1. Creating a Vue "View Model"

Let's create a simple Vue app, which demonstrates some of its features, and shows
the MVVM pattern.  Our first example will include Vue via a simple `<script>`
element, and not use a build step.  Here's the `index.html`:

```html
<div id="app">
  {% raw  %}
  <h2>Welcome! This page uses {{ frameworkName }}.</h2>
  {% endraw %}
</div>

<script src="https://unpkg.com/vue"></script>
<script>
  const vm = new Vue({
    el: '#app',
    data: {
      frameworkName: 'Vue.js'
    }
  });
</script>
```

For simplicity, we've omitted the rest of the page's boilerplate (`<head>`, `<body>`, etc.)
and are focusing only on the parts that are specific to Vue.  This style of development will
also come up again when we look at [Single File Vue Components](https://vuejs.org/v2/guide/single-file-components.html).

Notice that our app begins with a **root element**, in this case `<div id="app"></div>`.
Our app's UI (its View) is contained within this root element.  We've also given
our root element an `id` so we can identify it in code below.

Our first Vue application is simple, and only contains a single child within our root element,
an `<h2>`.  As we progress, the size and complexity of what we place here will grow as well. 

The markup for our `<h2>` will look familiar to anyone who has used server-side templating
languages like [Handlebars](https://handlebarsjs.com/).  Here {% raw  %}`{{ frameworkName }}`{% endraw  %} defines
a portion of our UI that needs to get rendered based on data in our application's view model.
At runtime, Vue will replace {% raw  %}`{{ frameworkName }}`{% endraw  %} with the value of the expression `frameworkName`, and keep it in sync, if and when it changes.

Below this we have two scripts.  The first loads Vue from a CDN.  The second defines
our app, and uses Vue via the global (i.e., we aren't using `require()` or `import` in this
example).

Our application creates a new `Vue` instance, and binds it to the variable `vm`, our view model.
The `Vue` constructor takes an [`options` Object](https://vuejs.org/v2/api/#Options-Data), which we're
using to pass the following properties:

* [`el`](https://vuejs.org/v2/api/#el): the root DOM node into which Vue should *mount* the view.  Vue will manage the DOM beneath this element.  We can either pass a selector as a `String`, as we've done here, or pass an `HTMLElement` we've obtained ourselves via `querySelector()` or the like.
* [`data`](https://vuejs.org/v2/api/#data): the data associated with our application.  All properties on this Object will become *reactive*, such that setting or getting their value will be managed by Vue, and trigger things like re-rendering the view. 

We'll discuss other properties we can include in the `options` below, but this is enough to get us started.
When our app is run, our Vue `vm` instance is created, and the contents of our root element get updated
to display:

`Welcome! This page uses Vue.js`.

The view has access to the `frameworkName` data property via the view model.

### Example 2. Different ways of using Data, `v-bind`

Let's update our previous code to create a UI that includes dynamic content in both
the element's contents, but also in attributes:

```html
<div id="app">
  <h2>Welcome! This page uses {% raw  %}<a v-bind:href="framework.url">{{ framework.name }}</a>{% endraw  %}.</h2>
</div>

<script src="https://unpkg.com/vue"></script>
<script>
  const vm = new Vue({
    el: '#app',
    data: {
      framework: {
        name: 'Vue.js',
        url: 'https://vuejs.org'
    }
  });
</script>
```

A few things have changed.  First, our data has been updated to include more information.
We've included multiple pieces of information on a nested Object.  Our `data` can contain
any valid JavaScript Object properties, including `Strings`, `Arrays`, `Objects`, etc. 

We've also introduced some new Vue specific markup, in the form of the [`v-bind`](https://vuejs.org/v2/api/#v-bind) [directive](https://vuejs.org/v2/guide/syntax.html#Directives), to allow us to do [data binding in element attributes](https://vuejs.org/v2/guide/syntax.html#Attributes).  Directives add special attributes to elements,
which Vue uses to apply reactivity to our UI, modifying our view in response to changes in our view model.

Directives like `v-bind` often take [arguments](https://vuejs.org/v2/guide/syntax.html#Arguments) in the form
`:argument`.  In the example above, we are asking Vue to bind the value `framework.name` to the `href` attribute
of our `<a>` element.

Much as we did with {% raw  %}`{{ ... }}`{% endraw  %}, the value we give a directive can be any valid JavaScript expression.
Consider the following:

```html
{% raw  %}<a v-bind:href="framework.url" v-bind:title="1 + 1">{{ framework.name }}</a>{% endraw  %}
```

Here we bind the *result* of the expression `1 + 1` to the `title` attribute of our element.
It might look like we're setting the text value `"1 + 1"`, but we aren't.  Instead, we're
asking Vue to *evaluate* our JavaScript *expression* `1 + 1` in order to produce the *value* `2`. 

The use of `v-bind:attributename="value"` is so common, that Vue provides a shortcut of `:attributename="value"`:

```html
<!-- Original -->
{% raw  %}<a v-bind:href="framework.url" v-bind:title="1 + 1">{{ framework.name }}</a>{% endraw  %}

<!-- With : Shortcut -->
{% raw  %}<a :href="framework.url" :title="1 + 1">{{ framework.name }}</a>{% endraw  %}
```

Here we've been able to shorten our template markup by eliminating the use of `v-bind` altogether.
The use of `:href="..."` is the same as `v-bind:href="..."`.

### Example 3. Working with Lists of Data, `v-for`

Another common pattern we'll often encounter is the need to work with lists (i.e., `Array`) of data
vs. single values. In our previous examples, we worked with a `String` or a single `Object` of `Strings`.
What if we needed to [render a list of items](https://vuejs.org/v2/guide/list.html), where the specific number of items is unknown?

In such cases we can use another directive, [`v-for`](https://vuejs.org/v2/api/#v-for).
The `v-for` directive allows us to declare to Vue that an element (or tree of elements) needs to
get repeatedly rendered based on some data value.

```html
<div id="app">
  <h2>Welcome! Here are some frameworks we'll be studying</h2>

  <ul>
    <li v-for="framework of frameworks" :key="framework.id">
      {% raw  %}<a :href="framework.url">{{ framework.name }}</a>{% endraw  %}
    </li>
  </ul>
</div>

<script src="https://unpkg.com/vue"></script>
<script>
  const vm = new Vue({
    el: '#app',
    data: {
      frameworks: [
        { id: 1, name: 'Vue.js', url: 'https://vuejs.org' },
        { id: 2, name: 'React', url: 'https://reactjs.org/' },
        { id: 3, name: 'Angular', url: 'https://angular.io/' }
      ]
    }
  });
</script>
```

The `v-for` directive is similar to [JavaScript's `for...of` loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of), which allows us to iterate over things like Arrays, Objects, Strings, etc.
The first argument defines a variable to bind each iteration, and the second defines the collection
over which we're iterating. `v-for="framework of frameworks"` says, "Loop across all elements in `frameworks`
and let me access each, one by one, as `framework`.

The use of `:key="framework.id"` is a hint to Vue, used to uniquely identify each element
created by our template.  This is important if/when the underlying data changes, and the
view has to be updated.  Instead of redrawing everything, Vue will only update the aspects
of each child element that have changed by using the `key` as a unique identifier to map
the view element(s) to the data in the list.

### Example 4. Conditional Rendering, `v-if`

Up to this point, all aspects of our template have been rendered.  There were no
conditional parts, and all data was used to create the final view UI.  Vue also
allows us to use [conditional rendering](https://vuejs.org/v2/guide/conditional.html), and
define certain portions of our template to skip based on JavaScript expressions.

```html
<div id="app">
  <h2>Welcome! Here are some frameworks we'll be studying</h2>

  <ul v-if="showFrameworks">
    <li v-for="framework of frameworks" v-if="framework.include" :key="framework.id">
      {% raw  %}<a :href="framework.url">{{ framework.name }}</a>{% endraw  %}
    </li>
  </ul>
</div>

<script src="https://unpkg.com/vue"></script>
<script>
  const vm = new Vue({
    el: '#app',
    data: {
      showFrameworks: true,
      frameworks: [
        { id: 1, name: 'Vue.js', url: 'https://vuejs.org', include: true },
        { id: 2, name: 'React', url: 'https://reactjs.org/', include: true },
        { id: 3, name: 'Angular', url: 'https://angular.io/' }
      ]
    }
  });
</script>
```

Here our example template has been modified to include two conditionals:

* `showFrameworks` has been added to our data, a `Boolean`
* `include` has been added to some of our framework Objects, also a `Boolean`

Our template also now includes the `v-if` directive.  We first place it on the parent
`<ul>` element.  Here we are asking Vue to only render this list if the `showFrameworks`
property is [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy).  If it isn't,
Vue will not render any of the child content (if it was already rendered, Vue will remove it).

The second use of `v-if` happens on each of our `<li>` elements.  We're using
[`v-for` and `v-if` together](https://vuejs.org/v2/guide/list.html#v-for-with-v-if) to allow
our UI to include only some of the data in our list (i.e., those who have a Truthy value
for `include`).

Vue also allows for more complex conditionals to be created using [`v-else`](https://vuejs.org/v2/guide/conditional.html#v-else), [`v-else-if`](https://vuejs.org/v2/guide/conditional.html#v-else-if),
and [`v-show`](https://vuejs.org/v2/guide/conditional.html#v-show)

### Example 5. Being Dynamic: Lifecycle Hooks, Methods, Computed Values, and Events

Our Vue object (and later, our Vue Components) can also include functionality.
For example, we can create [methods](https://vuejs.org/v2/guide/events.html#Method-Event-Handlers),
or we can write code to happen in response to [events](https://vuejs.org/v2/guide/events.html) or [lifecycle steps](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks).  We can also created
[computed properties](https://vuejs.org/v2/guide/computed.html) to go along with our data.

This is helpful when we start building web sites or applications that need to respond
to changes in data on the server, interact with a user, or dynamically adapt to changes
in our code.

```html
<div id="app">
  {% raw  %}<h2>Employee List ({{employees.length}})</h2>{% endraw  %}

  <button v-on:click="loadEmployees">Load Employees</button>

  <ol>
    <li v-for="employee of employees" :key="employee._id">
      {% raw  %}{{employee.FirstName}} {{employee.LastName}}{% endraw  %}
    </li>
  </ol>
</div>

<script src="https://unpkg.com/vue"></script>
<script>
  const teamsApiUrl = 'https://quiet-wave-16481.herokuapp.com';
  const vm = new Vue({
    el: '#app',
    data: {
      employees: []
    },
    methods: {
      loadEmployees: function() {
        fetch(`${teamsApiUrl}/employees`)
          .then(res => res.json())
          .then(employees => {
            this.employees = employees;
          });
      }
    },
    created: function() {
      this.loadEmployees();
    }
  });
</script>
```

In this example, we're incorporating our Teams API to get the full list of all employees
at the company.  We've created a `loadEmployees` method to do this, placing it within a `methods`
object.  We're then able to reference this `loadEmployees` method in a few other places:
first, in a click event handler we've placed on a `<button>` element using the [`v-on` directive](https://vuejs.org/v2/api/#v-on); second, in a [`created` lifecycle hook](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks), which will run after our Vue instance has been created.

We could expand this example slightly to allow the user to specify a city to filter our employees,
making the view more reactive. 

In this version, we'll add some more dynamic functionality in the form of a [computed property](https://vuejs.org/v2/guide/computed.html).  Instead of building our employee list based on our entire array from the Teams API, we can define a function to filter our list.

```html
<div id="app">
  <h2>Employee List</h2>

  <label for="city">City</label>
  <select id="city" @change="updateCity">
    <option selected>All</option>
    {% raw  %}<option v-for="city of cities" :key="city">{{city}}</option>{% endraw  %}
  </select>

  <ul>
    <li v-for="employee of filteredEmployees" :key="employee._id">
      {% raw  %}{{employee.FirstName}} {{employee.LastName}}{% endraw  %}
    </li>
  </ul>
</div>

<script src="https://unpkg.com/vue"></script>
<script>
  const teamsApiUrl = 'https://quiet-wave-16481.herokuapp.com';
  const vm = new Vue({
    el: '#app',
    data: {
      employees: [],
      cities: [],
      city: 'All'
    },
    computed: {
      filteredEmployees: function() {
        return this.employees.filter(employee => 
          this.city === 'All' || employee.AddressCity === this.city);
      }
    },
    methods: {
      loadEmployees: function() {
        fetch(`${teamsApiUrl}/employees`)
          .then(res => res.json())
          .then(employees => {
            // Create a sorted Array of Cities removing duplicates
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#Remove_duplicate_elements_from_the_array
            this.cities = [...new Set(employees.map(employee => employee.AddressCity))].sort();
            this.employees = employees;
          });
      },
      updateCity: function() {
        // Update our city to be whatever the user selected in the list
        this.city = this.$el.querySelector('#city').value;
      }
    },
    created: function() {
      this.loadEmployees();
    }
  });
</script>
```

Our computed property `filteredEmployees` is a function that returns an Array.  As such, it
functions in much the same way that `employees` did before, and we can use it as the basis
for our `v-for` to build the Employee list.  However, `filteredEmployees` is reactive, and
because it uses the `city` and `employees` data properties, if either changes, the value
will be re-computed, and our UI will update automatically.

We're managing the value of `city` by watching for a `change` event on our cites `<select>`
element.  NOTE: here I've used the shorthand `@change="..."` vs. the longer `v-on:change="..."`,
but both accomplish the same thing: call a function in response to a DOM event.

The function being called when our cities drop-down changes is `updateCity`, which
changes the value of `city` to be whatever the new value of our `city` drop-down has become.
NOTE: I've used `this.$el`, which is a way to get a reference to the root element in our
template.  I'm then searching within it for `#city`.  I could have used `document.querySelector()`
too, but it's often desirable to be able to query within the set of elements created for our template.

Whenever the `city` changes, it will affect the value of `filteredEmployees`, which will trigger
Vue to re-render some or all of our employee list.

### Example 5. Two-Way Data Binding, `v-model`

The code in our previous example worked, and allowed the user to select a city, then show
a filtered sub-set of employees for that city.  However, it required manual work on our part
to listen for the `change` event, find the `<select>` element in the DOM, and update the
value of `city` with this new value.

Because this is such a common pattern, Vue gives us a way to accomplish two-way data binding
using the [`v-model` directive](https://vuejs.org/v2/guide/forms.html#Basic-Usage).  With
`v-model` we can define a property to bind to the value of an input control.  If the user
changes the value (1-way), or if the value changes via code (2-way), we'll get the proper
value displayed.

```html
<div id="app">
  <h2>Employee List</h2>

  <label for="city">City</label>
  <select id="city" v-model="city">
    {% raw  %}<option v-for="city of cities" :key="city">{{city}}</option>{% endraw  %}
  </select>

  <ul>
    <li v-for="employee of filteredEmployees" :key="employee._id">
      {% raw  %}{{employee.FirstName}} {{employee.LastName}}{% endraw  %}
    </li>
  </ul>
</div>

<script src="https://unpkg.com/vue"></script>
<script>
  const teamsApiUrl = 'https://quiet-wave-16481.herokuapp.com';
  const vm = new Vue({
    el: '#app',
    data: {
      employees: [],
      cities: [],
      city: 'All'
    },
    computed: {
      filteredEmployees: function() {
        // Build a new list of employees, where All are included, or only
        // those for the chosen city
        return this.employees.filter(employee => 
          this.city === 'All' || employee.AddressCity === this.city);
      }
    },
    methods: {
      loadEmployees: function() {
        fetch(`${teamsApiUrl}/employees`)
          .then(res => res.json())
          .then(employees => {
            // Create unique list of cities, removing duplicates
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#Remove_duplicate_elements_from_the_array
            let cities = [...new Set(employees.map(employee => employee.AddressCity))];
            // Sort the list of cities in place
            cities.sort();
            // Prepend the value 'All' to the front of the list
            cities.unshift('All');

            // Update our instance's employees and cities arrays with the new ones
            this.cities = cities;
            this.employees = employees;
          });
      }
    },
    created: function() {
      this.loadEmployees();
    }
  });
</script>
```  

<br>

## Vue Components

Up to this point, all of our Vue examples have mapped very closely to a single HTML page.
All of our markup and scripts were written in the same file.  We've used this approach
to simplify our early discussion of Vue.  However, most Vue applications are built
as a series of Components using separate `.vue` files.

For the next part of our exploration, we'll require a build step in order to create
a bundle from all the various files we'll work within.  We'll also need to "compile"
our `.vue` files into functions.  To do all this, we'll use [Parcel with Vue](https://parceljs.org/vue.html) (note,
we could also use the [Vue CLI](https://cli.vuejs.org/), but we've been using Parcel, so hopefully this
will be familiar as we begin).

### Configure Vue and Parcel

First we need create a directory structure to hold our code:

```
/vue-project
  /components
  index.html
  index.js
```

Our `index.html` can be simple, with a `<div>` to hold our Vue application,
and a `<script>` to load our bundle:

```html
<div id="app"></div>
<script src="index.js"></script>
```

Our `index.js` file can also be small to begin, simply importing the Vue module:

```js
import Vue from 'vue';
```

Next we need to generate a `package.json` file to manage our dependencies and
build scripts.  To generate one, use `npm init`:

```
cd vue-project
npm init -y
```

This will allow us to install some dependencies:

```
npm install --save-dev parcel
npm install --save vue
```

Finally, edit your generated `package.json` file to include two things.  First,
add an `alias` for Parcel, to tell it which version of Vue to use when it builds
the bundle.  Vue ships with [different builds and module types](https://vuejs.org/v2/guide/installation.html#Explanation-of-Different-Builds) and we need to use the
`vue.esm.js` version, which is a full build vs. only the runtime files.  This is
what you need:

```json
"alias": {
  "vue": "./node_modules/vue/dist/vue.esm.js"
},
```

Second, add a `script` to run Parcel when we call `npm run dev`:

```json
"scripts": {
  "dev": "parcel index.html"
},
```

At this point you should be able to run `npm run dev` and leave the Parcel
hot-reload server running while we work on the code (i.e., Parcel will
automatically recompile and update our code as we save the files).  Your
development server will be available at `http://localhost:1234`.

### Creating Components

There are a number of ways to write components in Vue, but we'll focus on
using [single file `.vue` components](https://vuejs.org/v2/guide/single-file-components.html),
where our markup, script, and styles all live in a single file with a `.vue` extension.

Let's try refactoring our second example above, and split it into components.
Here's the original code:

```html
<div id="app">
  {% raw  %}<h2>Welcome! This page uses <a v-bind:href="framework.url">{{ framework.name }}</a>.</h2>{% endraw  %}
</div>

<script src="https://unpkg.com/vue"></script>
<script>
  const vm = new Vue({
    el: '#app',
    data: {
      framework: {
        name: 'Vue.js',
        url: 'https://vuejs.org'
    }
  });
</script>
```

Let's create a new file, `components/FrameworkLink.vue`.  This will will include
three sections:

1. a `<template>...</template>` where we'll put our component's markup
1. a `<style>...</style>` where we'll put any CSS for our component
1. a `<script>...</script>` where we'll put our component's code

```html
<template>
  <a :href="framework.url">
    {% raw  %}{{ framework.name }}{% endraw  %}
  </a>
</template>

<style scoped>
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
</style>

<script>
  export default {
    props: {
      framework: Object
    }
  }
</script>
```

Our `FrameworkLink` component takes a `framework` object, and formats it as
an `<a>` element, with the `url` and `name` converted to attributes and content.

Our opening `<style>` tag includes the word `scoped`, which tells Vue that we
want any styles we define here to *only* affect this component (i.e., other `a`
elements won't be changed in our page).  Without `scoped`, the styles would be
global to our page/application.

Finally, our `<script>` defines an `export` of a single Object, which is the
options for our component.  In this case, we define a single property:
[`props`](https://vuejs.org/v2/guide/components-props.html).  The `props` defines
properties we expect to get passed from a parent component or app.  Instead of
managing our own `data`, as we did previously, with a component we *use*
properties passed to us at runtime.

The `props` can be formatted as an Array of Strings (e.g., `props: ['framwork']`)
or you can specify the name and type as an Object: (e.g., `props: { framework: Object }).
The latter helps to avoid passing values of the incorrect type.  In our case,
we are specifying that we expect to `framework` to be an Object vs a Number or Boolean.

Now let's update our `index.js` to use the `FrameworkLink` component:

```js
// index.js
import Vue from 'vue';
import FrameworkLink from './components/FrameworkLink.vue';

const vm = new Vue({
  el: '#app',
  data: {
    frameworks: {
      vue: {
        name: 'Vue.js', url: 'https://vuejs.org'
      },
      react: {
        name: 'React', url: 'https://reactjs.org/'
      }  
    }
  },
  components: {
    FrameworkLink
  },
  template: `
    <ul>
      <li><FrameworkLink :framework="frameworks.vue" /></li>
      <li><FrameworkLink :framework="frameworks.react" /></li>
    </ul>`
});
```

First, we're importing Vue and also our `FrameworkLink.vue` file.
Next, notice how we've added a `components` property to our app.  This defines
any custom components we intend to use in our template.

Finally, our template has been defined inline as a string, since
it is so short, and uses the custom `<FrameworkLink>` element.  We're
passing our `props` data (i.e., each of the framework objects we want to render)
to the `FrameworkLink` components by using the `v-bind:framework="..."`
notation (note: I've used the shorthand `:framwork="..."`).  Each instance of
our component will receive its own framework object, and render it according
to the `FrameworkLink` template.

NOTE: in VS Code, the [Vetur extension](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
can do syntax highlighting for .vue files.
