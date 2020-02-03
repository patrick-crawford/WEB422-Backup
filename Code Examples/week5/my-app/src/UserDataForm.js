import React from 'react';

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
                fullName: "Jason Borne",
                programName: "Computer Programming and Analysis",
                campus: "newnham",
                enrolled: true,
                housing: "off campus"   
            }
        });        
    }
  
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
  
    handleSubmit(e) {
      e.preventDefault();
      console.log('The Form Was Submitted: ' + JSON.stringify(this.state.userData));
    }
  
    render() {
        if(!this.state.userData){
            return null;
        }else{
            return (
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Full Name:
                    <input type="text" name="fullName" value={this.state.userData.fullName} onChange={this.handleChange} />
                  </label><br />
                  <label>Full Program Name:
                      <textarea name="programName" value={this.state.userData.programName} onChange={this.handleChange}></textarea>
                  </label><br />
                  <label>
                  Campus:
                  <select name="campus" value={this.state.userData.campus} onChange={this.handleChange}>
                    <option value="">- Select -</option>
                    <option value="king">King</option>
                    <option value="markham">Markham</option>
                    <option value="newnham">Newnham</option>
                    <option value="downtown">Downtown</option>
                  </select>
                </label><br />
                <label>Enrolled: <input name="enrolled" type="checkbox" checked={this.state.userData.enrolled} onChange={this.handleChange}></input></label><br />
                <label>Housing:</label><br />
                <label>
                    Residence <input name="housing" type="radio" checked={this.state.userData.housing === "residence"} value="residence" onChange={this.handleChange} />
                </label>
                <label>
                    Off Campus <input name="housing" type="radio" checked={this.state.userData.housing === "off campus"} value="off campus" onChange={this.handleChange} />
                </label>
                <br />
                  <button type="submit">Submit</button>
                
                </form>
              );
        }
      
    }
  }

  export default UserDataForm;