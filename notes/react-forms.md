---
title: React Forms
layout: default
---

## React Forms

> **Quick Note:** Some of the below code examples and explanations have been reproduced from sections of the [official online documentation](https://reactjs.org/docs/getting-started.html) for React. 

In HTML, form elements such as `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input. In React however, state is typically kept in the **state** property of components, and only updated with setState().

We can combine the two by making the React **state** be the “single source of truth”. Then the React component that renders a form also controls what happens in that form during user input. An input form element whose value is controlled by React in this way is called a “controlled component”.

<br>

### The input Tag

If we want to synchronize an "input" tag with the state of our compnent, we can write a form as a "controlled component".  In the below example, we will use a form to collect information on a user (stored in the state as "userData"):

```jsx
class UserDataForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {userData: null}; // initialize userData as null for now (populated on componentDidMount)
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){ // Load the data (Usually from an API endpoint)
        this.setState({
            userData: {
                fullName: "Jason Borne"
            }
        });
    }
  
    handleChange(e) {
        let target = e.target; // the element that initiated the event
        let value = target.value; // its value
        let name = target.name; // its name
    
        this.setState((state,prop)=>{ // use the "name" to set the matching property in the state
            state.userData[name] = value;
            return{ userData: state.userData}
        });
    }
  
    handleSubmit(e) {
      e.preventDefault();
      console.log('The Form Was Submitted: ' + JSON.stringify(this.state.userData));
    }
  
    render() {
        if(!this.state.userData){
            return null; // render nothing until the form data is loaded
        }else{
            return (
                <form onSubmit={this.handleSubmit}>
                <label>
                    Full Name:
                    <input type="text" name="fullName" value={this.state.userData.fullName} onChange={this.handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
            );
        }
    }
  }
```

In the above "render" method of our UserDataForm component, we have included a simple form that has a single "input" statement. However, we have made a number of changes to ensure that the **state** of the component is the "single source of truth".

To begin, our "input" control has two important properties: **value** and **onChange**:

* The **"value"** property simply exists to set the "value" of the input control to match the "fullName" property of our "userData" object in the **state** of the component.  This is the intended purpose of the [value property](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue) on HTML elements (to set the input control's "value").  **Note:** The **name** of our component should match the property name that we wish to set in the **state**.  This will simplify things in our **handleChange(e)** event.

* The **"onChange"** event has been wired up to an internal "handleChange" property:

  ```js
    handleChange(e) {
        let target = e.target; // the element that initiated the event
        let value = target.value; // its value
        let name = target.name; // its name

        this.setState((state,prop)=>{  // use the "name" to set the matching property in the state
            state.userData[name] = value;
            return{ userData: state.userData}
        });
    }
    ```

    We have implemented the **handleChange(e)** method to be as *generic* as possible. Here, we can determine which form element initiated the event (using **e.target**) and once we have access to the form element, we can pull it's value and name using the properties (**value** ane **name** respectfully).  Finally, using those values, we can set the matching peroperty in the state using the syntax: **`{[name]:value}`**.

By matching up the **value** and **onChange** methods on components in our form with functionality internal to our component, we can ensure that whenever the value of "state" changes, the corresponding form control changes as well.  Similairly, whenever our form control changes, the corresponding property in the "state" should also change.

Next, you will notice that we have wired up our component to handle the "submit" event of the `<form>`.  This is similar to what we did back in Week 2 with jQuery, ie: prevent the form from submitting using the expected behaviour and instead, submit the data ourselves using AJAX (ie: to an API endpoint using **PUT** or **POST**)

<br>

### The textarea Tag

The textarea tag can be controlled in exactly the same way as a simple "input" tag.  This involves ensuring that the **name** property matches the associated property in our "userData" object within the state as well as wiring up "handleChange" to the "onChange" event.

```jsx
<label>Full Program Name:
    <textarea name="programName" value={this.state.userData.programName} onChange={this.handleChange}></textarea>
</label>
```

<br>

### The select Tag

If we wish to add a &lt;select&gt; element, we can follow the same pattern. 

```jsx
<select name="campus" value={this.state.userData.campus} onChange={this.handleChange}>
    <option value="">- Select -</option>
    <option value="king">King</option>
    <option value="markham">Markham</option>
    <option value="newnham">Newnham</option>
    <option value="downtown">Downtown</option>
</select>
```

<br>

### The select Tag (multiple)

If we wish to work with a &lt;select multiple&gt; element, things are a little more complicated.  For example, we must set the "multiple" attribute using `{true}`, ie:

```jsx
<select multiple={true} name="campus" value={this.state.userData.campus} onChange={this.handleChange}>
```

Next, we must ensure that we correctly manage the "handleChange" event to handle multiple values.  This involves first checking if the "type" of the target is "select-multiple".  If it is, then we must loop through all of the options and add any "selected" ones to the "value", ie:

```js
handleChange(e) {
    let target = e.target; // the element that initiated the 
    let value = null; // set value to null until we can figure out the type
    let name = target.name; // its name
    
    if(target.type === 'select-multiple'){
        value = [];
        for(let i = 0; i < target.options.length; i++){
            if(target.options[i].selected){
                value.push(target.options[i].value);
            }
        }
    }else{
        value = target.value;
    }

    this.setState((state,prop)=>{ // use the "name" to set the matching property in the state
        state.userData[name] = value;
        return{ userData: state.userData}
    });
}
```

<br>

### Input type Checkbox

If we also wish to handle "checkbox" elements, we can once again wire up our component and state using the same pattern, only instead of **value**, we use **checked**:

```jsx
<label>Enrolled: <input name="enrolled" type="checkbox" checked={this.state.userData.enrolled} onChange={this.handleChange}></input></label>
```

We must also update our **handleChange(e)** method to accomodate the "checkbox" type: 

```js
handleChange(e) {
    let target = e.target; // the element that initiated the event
    let value = null; // its value
    let name = target.name; // its name

    if(target.type === 'checkbox'){
        value = target.checked
    }else if(target.type === 'select-multiple'){
        value = [];
        for(let i = 0; i < target.options.length; i++){
            if(target.options[i].selected){
                value.push(target.options[i].value);
            }
        }
    }
    else{
        value = target.value
    }

    this.setState((state,prop)=>{ // use the "name" to set the matching property in the state
        state.userData[name] = value;
        return{ userData: state.userData}
    });
}
```

<br>

### Radio Buttons

The final input type that we will discuss is the "radio button".  It's similar to the "checkbox" in that we must used the "checked" property (instead of "value") to indicate whether or not the control should be checked.  However a "value" must control this, ie:

```jsx
<label>
    Residence <input name="housing" type="radio" checked={this.state.userData.housing === "residence"} value="residence" onChange={this.handleChange} />
</label>
<label>
    Off Campus <input name="housing" type="radio" checked={this.state.userData.housing === "off campus"} value="off campus" onChange={this.handleChange} />
</label>
```

<br>

### (Special Consideration: The file input Tag)

In HTML, an `<input type="file">` lets the user choose one or more files from their device storage to be uploaded to a server or manipulated by JavaScript via the [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications).

```html
<input type="file" />
```

In React, an `<input type="file" />` is always an uncontrolled component because its value can only be set by a user, and not programmatically.  In the below example, [React.createRef()](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) is used to retrieve the underlying DOM elmement as its "current" property.

Addditionally, you should use the [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) to interact with the files. The following example shows how to create a ref to the DOM node to access file(s) in a submit handler:

```jsx
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(e) {
    e.preventDefault();
    if(this.fileInput.current.files.length > 0){
        console.log(`Selected file - ${this.fileInput.current.files[0].name}`);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

<br>

### Fully-Fledged Solutions

Lastly, from the React Documentation:

> If you’re looking for a complete solution including validation, keeping track of the visited fields, and handling form submission, [Formik](https://jaredpalmer.com/formik) is one of the popular choices. However, it is built on the same principles of controlled components and managing state — so don’t neglect to learn them.