---
title: Angular Testing Introduction
layout: default
---

## Introduction to Angular Testing

Throughout our discussion of Angular, we have largely been ignoring the test features that have been made available to us.  For example, we have opted to ignore the spec files and "skip tests" using the "-S" command when creating a "new" application (skipping the creation the spec files altogether, as well as excluding the end-to-end (e2e) testing functionality).

However, running e2e tests & unit testing is an [extremely important](https://www.agilealliance.org/glossary/unit-test/) part of the Agile development cycle.  For example, unit / e2e testing:

* Guards against changes that break existing code (“regressions”).

* Clarifies what the code does both when used as intended and when faced with deviant conditions.

* Reveals mistakes in design and implementation. Tests shine a harsh light on the code from many angles. When a part of the application seems hard to test, the root cause is often a design flaw, something to cure now rather than later when it becomes expensive to fix.

So, to take full advantage of all the built in testing functionality that Angular provides, we will be primarily referring to the excellent [documentation](https://angular.io/guide/testing) (re-printed here with extra comments where applicable).

<br>

### Tools and technologies

You can write and run Angular tests with a variety of tools and technologies. This guide describes specific choices that are known to work well.

<table width="100%">
  <colgroup><col width="20%">
  
  <col width="80%">
  
  </colgroup><tbody><tr>
    <th>
      Technology
    </th>
    <th>
      Purpose
    </th>
  </tr>
  <tr style="top">
    <td style="vertical-align: top">
      Jasmine
    </td>
    <td>
<p>      The <a href="https://jasmine.github.io/index.html">Jasmine test framework</a>
provides everything needed to write basic tests.
It ships with an HTML test runner that executes tests in the browser.</p>
    </td>
  </tr>
  <tr style="top">
    <td style="vertical-align: top">
      Angular testing utilities
    </td>
    <td>
<p>      Angular testing utilities create a test environment
for the Angular application code under test.
Use them to condition and control parts of the application as they
interact <em>within</em> the Angular environment.</p>
    </td>
  </tr>
  <tr style="top">
    <td style="vertical-align: top">
      Karma
    </td>
    <td>
<p>      The <a href="https://karma-runner.github.io/1.0/index.html">karma test runner</a>
is ideal for writing and running unit tests while developing the application.
It can be an integral part of the project's development and continuous integration processes.
This guide describes how to set up and run tests with karma.</p>
    </td>
  </tr>
  <tr style="top">
    <td style="vertical-align: top">
      Protractor
    </td>
    <td>
<p>      Use protractor to write and run <em>end-to-end</em> (e2e) tests.
End-to-end tests explore the application <em>as users experience it</em>.
In e2e testing, one process runs the real application
and a second process runs protractor tests that simulate user behavior
and assert that the application responds in the browser as expected.</p>
    </td>
  </tr>
</tbody></table>

<br>

### Setup

Fortunately, since we have been making exclusive use of the Angular CLI to create "new" apps for us, everything we need to get started testing our software is already included.  

For example, if we create a "new" app with the following command:

```
ng new myApp --routing
```

We will get a new Angular application with "routing" enabled out of the box - this isn't anything new.  However, until now we haven't discussed a few of the key files that are added **outside** the src/app directory, including; karma.conf.js, protractor.conf.js, app.component.spec & the e2e folder (below).

For now, let's see how we can perform our first, simple unit test:

1. Open the file src/app/app.component.spec.ts & comment out all of the code (we will be coming back to this later).

2. Create a new file called `1st.spec.ts` in the application root folder, `src/app/`

    **NOTE**: Tests written in Jasmine are called specs. **The filename extension must be** .spec.ts, the convention adhered to by karma.conf.js and other tooling.
  
3. Open the file and enter the following code:
    
    ```js
   describe('1st tests', () => {
         it('true is true', () => {
           expect(true).toBe(true);
       });
   });
    ```

4. Run the command `npm run test` from the integrated terminal

    You should see some text output to the terminal, ie:

    ```
   Generating browser application bundles...:WARN [karma]: No captured browser, open http://localhost:9876/
   18 04 2021 21:11:47.341:INFO [karma-server]: Karma v6.1.2 server started at http://localhost:9876/
   18 04 2021 21:11:47.341:INFO [launcher]: Launching browsers Chrome with concurrency unlimited
   18 04 2021 21:11:47.346:INFO [launcher]: Starting browser Chrome
    ```

You may or may not see the "No captured browser" warning - if your default browser opens to a "Karma" page, then everything is working as expected and no further action is required.  If you see the warning, simply open the browser to the address identified, ie: `http://localhost:9876/`

We can now safely keep the "Karma" page running and every time we save a change to our code (as before), we will see the compiled results tested and our results shown.

For example:

If we make a quick change in our 1st.spec.ts by changing the expectation from **true** to **false**, ie:

```js
describe('1st tests', () => {
    it('true is true', () => {
        expect(false).toBe(true);
    });
});
```

We can see that it fails with "Expected false to be true".  Before moving on, change the expectation back to "true" so that we no longer see the error

<br>

### Test Debugging

Debug specs in the browser in the same way that you debug an application.

1. Reveal the karma browser window (hidden earlier).
2. Click the DEBUG button; it opens a new browser tab and re-runs the tests.
3. Open the browser's “Developer Tools” (Ctrl-Shift-I on windows; Command-Option-I in OSX).
4. Pick the "sources" section.
5. Open the 1st.spec.ts test file (Control/Command-P, then start typing the name of the file).
6. Set a breakpoint in the test.
7. Refresh the browser, and it stops at the breakpoint.

<br>

### Jasmine Syntax

Before we move on to test our first component, let's take a look at a couple of the functions that we used to perform our "1st tests" using Karma.  As we know from above, the functions

### describe()

A test suite begins with a call to the global Jasmine function **describe** with two parameters: a **string** and a **function**. The string is a name or title for a spec suite - usually what is being tested. The function is a block of code that implements the suite.

### it()

Calling the global Jasmine function **it** actually defines a "spec" which, like describe takes a **string** and a **function**. The string is the title of the spec and the function is the spec, or test. A spec contains **one or more** expectations that test the state of the code. An expectation in Jasmine is an assertion that is either true or false. A spec with all true expectations is a passing spec. A spec with one or more false expectations is a failing spec.

Note: "Describing" test suites and "specs" helps us to group tests and easily identify (or report on) 1 or more failing tests.

### expect()

The **expect** function is used to build "Expectations", by providing a value, called the actual. It is chained with a Matcher function (ie: `toBe()`), which takes the expected value.

<br>

### Matcher Functions

Jasmine comes with the series of "matcher functions" that we can use to test our code. Matcher functions are paired with an "expect" call in order to create a test, using the following syntax (as seen above in our "true is true" test):

```js
expect(someValue).someMatcherFunction(matcherParameters);
```

Generally speaking, expectations for tests follow the pattern **expect** *some value* **toBe** *something*.  If the expectation holds true, then the test passes, otherwise it fails.  If there is more than one expectation in a test, then the failure of a single expectation will cause the test to fail.  It's also important to note that when writing tests using **expect**, "*some value*" could be a primitive, array, object, etc. and "**toBe** *something*" can be as simple as checking if "*some value*" is truthy, or as complex as checking to see if it's *close to* another value given a certain precision, for example:

```js
it("compares pi against e with multiple precision values", function () {
    var pi = 3.1415926,
        e = 2.78;

    expect(pi).not.toBeCloseTo(e, 2); // rounding pi to 3.14 and e to 2.78 (2 decimal places)
    expect(pi).toBeCloseTo(e, 0); // rounding pi to 3 and e to 3 (0 decimal places)
});
```

**Important:** Before moving on to directly testing a component, you should reference the documentation (below) and familiarize yourself with some simple matchers and how they're used.

* Jasmine Matchers: [https://jasmine.github.io/api/edge/matchers.html](https://jasmine.github.io/api/edge/matchers.html)


#### Special Case: Manually failing a spec with 'fail'.

We can also write our tests to pass / fail by *conditionally* failing a test if a certain condition is met or our code ends up in a certain state.  This can be accomplished invoking the global ["fail()"](https://jasmine.github.io/api/edge/global.html#fail) method that will fail the test with a message.  For example:

```js
var foo = function (x:boolean, callBack:any) {
    if (x) {
        callBack();
    }
};

it("should not call the callBack", function () {
    expect(foo).toBeTruthy();
    foo(false, function () {
        fail("Callback has been called");
    });
});
```

<br>

### Creating a New Component & Examining the .spec File

Now that we're familiar with some of the key functions of the Jasmine testing syntax, we can begin to make sense of some of the testing logic that we see generated in those .spec files.

Let's create a new component, ie: `ng g c componentOne`

This should generate a "component-one" directory with the following files:

```
component-one.component.css
component-one.component.html
component-one.component.spec.ts
component-one.component.ts
```

The file that we're currently interested in looking at here is: **component-one.component.spec.ts**:

```js
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentOneComponent } from './component-one.component';

describe('ComponentOneComponent', () => {
  let component: ComponentOneComponent;
  let fixture: ComponentFixture<ComponentOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

The above code is "boilerplate" and the minimum required code to create the single 'should create' test to ensure that the component ("component") is indeed created.  We can see that this test passes by starting up the test server again `npm run test` (Note: we will no longer be working with 1st.spec.ts, so its code can be commented out / the file can be removed).

While this does work as expected, there's a lot of strange code in here.  Why don't we take a look at the pieces one-by-one:

### TestBed

"**TestBed** is the first and most important of the Angular testing utilities. It creates an Angular testing module — an `@NgModule` class—that you configure with the `configureTestingModule` method to produce the module environment for the class you want to test. In effect, you detach the tested component from its own application module and re-attach it to a dynamically-constructed Angular test module tailored specifically for this battery of tests."

Essentially, TestBed provides the functionality to enable the configuration of the testing module &amp; to compile components / create component "fixtures". 

### ComponentFixture

The createComponent method returns a **ComponentFixture**, a handle on the test environment surrounding the created component. The fixture provides access to the **component instance itself** and to the [**nativeElement**](https://angular.io/guide/testing-components-basics#nativeelement), which is a handle on the component's DOM element (to be used in testing - ie: `fixture.nativeElement`).

<br>

### Updating the Component & Writing Simple Tests

Finally - the testing environment is all configured.  Now we can begin to update "ComponentOne" and write a simple test.

<br>

### Test One - Checking for Elements in the Template

Say our specification requires there to be certain elements present in the template for ComponentOne (for example, the lone paragraph (&lt;p&gt;) element that currently exists in the `component-one.component.html` file.  

This would make a great test, but first we must learn how we can gain access to elements in the compiled template.

Fortunately, this can be accomplished through the combined use of the **nativeElement** (as mentioned above) and the familiar DOM [querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) / [querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) methods, ie:

```js
fixture.nativeElement.querySelector() // return one element (the first matching element)
fixture.nativeElement.querySelectorAll() // return a collection of elements
```

In our case, we wish to ensure that we have at least one &lt;p&gt; element (from above).  We can use the following syntax to get a collection of all &lt;p&gt; elements.

```js
fixture.nativeElement.querySelectorAll('p'));
```

This would allow us to write our test as follows:

```js
it('must have at least 1 paragraph', () => {
  let pElements = fixture.nativeElement.querySelectorAll('p')
  expect(pElements.length).toBeGreaterThan(0);
});
```

<br>

### Test Two - Verifying the "TextContent" of an Element

The above test works fine for "counting" elements, however what if we wish to test the element using a native DOM node method (ie, ["TextContent"](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent))?

Before we begin, let's update our paragraph element in our "component-one.component.html" file to include a "greeting" class, and update the "greeting" to Hello, ie:

```html
<p class="greeting">Hello</p>
```

For our test, we wish to use the "TextContent" method of our "greeting" paragraph element to determine whether or not the text is "Hello".  To accomplish this, we can use the following code:

```js
it('The "greeting" must read: "Hello"',()=>{
  let greetingElement = fixture.nativeElement.querySelector('p.greeting');
  expect(greetingElement.textContent).toEqual('Hello');
});
```

If we run the tests we should see that everything works as expected and our test is a **success**.  To verify that this does indeed work, try modifying the content from "Hello" to something else, we will see that the test **fails**.

<br>

### Test Three - Checking a User Event ("click")

Say we wish to check that a button behaves properly when clicked - ie: it updates the value of a property in the component.  How do we simulate a "click" event? How do we check the property value in the component once an event has completed?  To wire this test up, let's first create a "button" element in our `component-one.component.html` template:

```html
<button class="myButton" (click)="onClick()">Click Me</button>
```

Notice how it has a "click" event that invokes an "onClick()" method?  Our next step to set this test up, is to create the "onClick()" event in the "ComponentOneComponent" class (`component-one.component.ts`).  We should also create some value in the component to be modified when "onClick()" is invoked (we'll go with "x"):

```ts
export class ComponentOneComponent implements OnInit {

  constructor() { }

  public x:number = 0;

  ngOnInit(): void {
  }

  onClick(): void{
    this.x=1;
  }

};
```
As you can see, we've created a public property ("x") that is set to zero (0) when the component is initialized.  When the "onClick()" method is invoked, it will be increased to one (1).

To simulate the button click and check that the value of x is updated to one (1) in a test, we simply grab the "native" element for the button, manually invoke the click event (using `.click()`) and write our expectation once the component fixture "[becomes stable](https://angular.io/api/core/testing/ComponentFixture#whenStable)":

```js
it('Sets x to 1 when "myButton" is clicked', () => {
  let button = fixture.nativeElement.querySelector('button.myButton');
  expect(button).toBeTruthy();

  button.click();

  fixture.whenStable().then(() => {
    expect(component.x).toBe(1);
  });
});
```

<br>

### More Examples

Angular testing is an extremely complex topic and beyond the scope of this lecture.  However, the good news is that (as we have seen) the documentation is very clear and well written.  For the full documentation on testing in Angular using the techniques mentioned above as a starting point, check out:

[https://angular.io/guide/testing](https://angular.io/guide/testing)

Happy Coding!

<br />