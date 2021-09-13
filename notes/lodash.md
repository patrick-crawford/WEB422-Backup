---
title: Lodash
layout: default
---

## Introduction to Lodash

> "Lodash is a toolkit of Javascript functions that provides clean, performant methods for manipulating objects and collections. It is a "fork" of the Underscore library and provides additional functionality as well as some serious performance improvements. If you aren't using Lodash, you should be." ~John Lindquist

As John puts it, Lodash is a toolkit or library of functions that extend some of the current working JavaScript core functionaltiy.  Even with new versions of JavaScript (ie: [ES6 and Beyond)](https://en.wikipedia.org/wiki/ECMAScript#Versions) starting to catch up to all of the libraries and toolkits developed over the last decade or so, Lodash still proves itself as something many JS developers still can't live without.

<br>

### Downloading Lodash

Like most JavaScript libraries, Lodash exists as a single, minified .js file that you can either [download (Full build)](https://lodash.com/) and include in your local solution, or [reference the CDN](https://www.jsdelivr.com/package/npm/lodash) in your pages/views, ie:

```js
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js"></script>
```

If you're thinking that you might want to use it in your Node.js server applications, you can do that as well [via NPM](https://www.npmjs.com/package/lodash).

<br>

### The Full Documentation

Lodash is a very large, comprehensive library and covering it in its entirety is well beyond the scope of this class.  Instead, we will introduce some of the more interesting pieces of functionality that we're likely to come across during this semester.  

However, you should absolutely [**Bookmark the Documentation Page**](https://lodash.com/docs/) and always check it before you start working with Objects, Collections, Strings, Dates, etc.  The chances are very good that there's ***something*** in there that will help optomize your code and make your life easier.

<br>

### Sample Data

For the following code examples, we will assume that we have a Flintstones-inspired **users** collection that contains the following data:

```js
let users = [
    { 'user': 'fred',    'active': false, 'age': 40 },
    { 'user': 'pebbles', 'active': false, 'age': 1  },
    { 'user': 'barney',  'active': true,  'age': 36 }
];
```

<br>

## Array Methods

<br>

### \_.chunk(array, [size=1])

Creates an array of elements split into groups the length of size. If array can't be split evenly, the final chunk will be the remaining elements. See: [https://lodash.com/docs/4.17.15#chunk](https://lodash.com/docs/4.17.15#chunk)

```js
let chunk1 = _.chunk(['a', 'b', 'c', 'd'], 2); // => [['a', 'b'], ['c', 'd']] 
let chunk2 = _.chunk(['a', 'b', 'c', 'd'], 3); // => [['a', 'b', 'c'], ['d']]
let chunk3 = _.chunk(users, 2); // objects for [['fred', 'pebbles'], 'barney']
```

<br>

### \_.findIndex(array, [predicate=_.identity], [fromIndex=0])

Returns the index of the first element **predicate** returns truthy for, instead of the element itself. 

See: [https://lodash.com/docs/4.17.15#findIndex](https://lodash.com/docs/4.17.15#findIndex) and also [https://lodash.com/docs/4.17.15#findLastIndex](https://lodash.com/docs/4.17.15#findLastIndex) and [https://lodash.com/docs/4.17.15#find](https://lodash.com/docs/4.17.15#find)

> **NOTE:** findIndex is also available on the global Array Object - see: [Array.prototype.findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

```js
let findIndex1 = _.findIndex(users, function(user) { 
    return user.user == 'fred'; 
}); // => 0
```

<br>

### \_.take(array, [n=1])

Creates a slice of array with n elements taken from the beginning.

See: [https://lodash.com/docs/4.17.15#take](https://lodash.com/docs/4.17.15#take)

```js
let take1 = _.take(users,2) // => objects for ['fred, pebbles']
```

<br>

## Collection Methods

<br>

### \_.filter(collection, [predicate=_.identity])

Iterates over elements of **collection**, returning an array of all elements **predicate** returns truthy for. The predicate is invoked with three arguments: \(value, index \| key, collection\).
 
See: [https://lodash.com/docs/4.17.15#filter](https://lodash.com/docs/4.17.15#filter) and also: [https://lodash.com/docs/4.17.15#find](https://lodash.com/docs/4.17.15#find)

> **NOTE:** filter is also available on the global Array Object - see: [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

```js
let filter1 = _.filter(users, function(user) {
    return user.active == true;
}); // => objects for ['barney']
```

<br>

### \_.sortBy(collection, [iteratees=[_.identity]])

Creates an array of elements, sorted in ascending order by the results of running each element in a collection thru each iteratee. This method performs a stable sort, that is, it preserves the original sort order of equal elements. The iteratees are invoked with one argument: (value). 

See: [https://lodash.com/docs/4.17.15#sortBy](https://lodash.com/docs/4.17.15#sortBy)

> **NOTE:** a similar "sort" method is also available on the global Array Object - see: [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

```js
let sortBy1 = _.sortBy(users, [
    function(user) { 
        return user.user; 
    }
]); // => objects for ['barney', 'fred', 'pebbles']
```

<br>

### \_.forEachRight(collection, [iteratee=_.identity])

This method is like \_.forEach except that it iterates over elements of collection from right to left.

See: [https://lodash.com/docs/4.17.15#forEachRight](https://lodash.com/docs/4.17.15#forEachRight) and also: [https://lodash.com/docs/4.17.15#forEach](https://lodash.com/docs/4.17.15#forEach)

```js
let forEachRight1 = [];

_.forEachRight(users, function(user) {
    forEachRight1.push(user);
}); // iterates as ['barney', 'pebbles', 'fred']
```

<br>

## Number Methods

<br>

### \_.random([lower=0], [upper=1], [floating])

Produces a random number between the inclusive lower and upper bounds. If only one argument is provided, a number between 0 and the given number is returned. If floating is true, or either lower or upper are floats, a floating-point number is returned instead of an integer.

See: [https://lodash.com/docs/4.17.15#random](https://lodash.com/docs/4.17.15#random)

```js
let random1 = _.random(0, 5); // => an integer between 0 and 5
let random2 = _.random(5); // => also an integer between 0 and 5
let random3 = _.random(5, true); // => a floating-point number between 0 and 5
let random4 = _.random(1.2, 5.2);// => a floating-point number between 1.2 and 5.2
```

<br>

## Object Methods

<br>

### \_.cloneDeep(value)

This method is like \_.clone except that it recursively clones value.

See: [https://lodash.com/docs/4.17.15#cloneDeep](https://lodash.com/docs/4.17.15#cloneDeep) and also: [https://lodash.com/docs/4.17.15#clone](https://lodash.com/docs/4.17.15#clone)

```js
let cloneDeep1 = _.cloneDeep(users); // cloneDeep1[0] !== users[0]
```

<br>

### \_.pick(object, [paths])

Creates an object composed of the picked object properties.

See: [https://lodash.com/docs/4.17.15#pick](https://lodash.com/docs/4.17.15#pick)

> **NOTE:** properties can be "picked" in a similar way using object "destructuring" &amp; "object initializer" syntax - see: [Object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring) &amp; [Object initializer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)

```js
let pick1 = _.pick(users[0], ['user', 'age']); // => { 'user': 'fred', 'age': 40 } // note: pick1 !== users[0]
```

<br>

## String Methods

<br>

### \_.escape([string=''])

Converts the characters "&", "<", ">", '"', and "'" in string to their corresponding HTML entities.

See: [https://lodash.com/docs/4.17.15#escape](https://lodash.com/docs/4.17.15#escape) and also: [https://lodash.com/docs/4.17.15#unescape](https://lodash.com/docs/4.17.15#unescape)

```js
let escape1 = _.escape('fred, barney, & pebbles'); // => 'fred, barney, &amp; pebbles'
```

<br>

### \_.template([string=''], [options={}])

Creates a compiled template function that can interpolate data properties in "interpolate" delimiters, HTML-escape interpolated data properties in "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data properties may be accessed as free variables in the template. If a setting object is given, it takes precedence over [\_.templateSettings](https://lodash.com/docs/4.17.15#templateSettings) values.

See: [https://lodash.com/docs/4.17.15#template](https://lodash.com/docs/4.17.15#template)

```js
// Use the "interpolate" delimiter to create a compiled template.
let template1 = _.template('hello <%= user %>!');
let template1Result = template1({ 'user': users[0].user });  // => 'hello fred!'

// Use the HTML "escape" delimiter to escape data property values.
let template2 = _.template('<b><%- value %></b>');
let template2Result = template2({ 'value': '<script>' }); // => '<b>&lt;script&gt;</b>'

// Use the "evaluate" delimiter to execute JavaScript and generate HTML.
let template3 = _.template(`<ul> 
                                <% _.forEach(users, function(user) { %>
                                    <li><%- user %></li>
                                <% }); %>
                            </ul>`);

let template3Result = template3({ 'users': ['fred', 'barney'] }); // => '<ul><li>fred</li><li>barney</li></ul>'

// Use the "evaluate" delimiter to execute JavaScript and generate HTML from our "users" collection.
let template4 = _.template(`<ul> 
                                <% _.forEach(users, function(user) { %> 
                                    <li><%- user.user %></li> 
                                <% }); %>
                            </ul>`);

let template4Result = template4({ 'users': users }); // => '<ul><li>fred</li><li>pebbles</li><li>barney</li></ul>'
```

<br>

## Leveraging Templates to Render Data 

As you can see from above, lodash templates will certainly come in handy when rendering data.  We can declare the template anywhere and use it to "render" our data.  To see how this can apply to a more complex dataset (ie: the "theaters" data from last week), please view the [Week 2 Code Example](https://github.com/sictweb/WEB422/tree/master/Code%20Examples/week2) under "Data-Rendering".  

We will be walking through this example if we have time during the lecture, otherwise we will cover it during the lab period.

<br>
