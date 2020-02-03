import React from 'react'

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

  export default FileInput;