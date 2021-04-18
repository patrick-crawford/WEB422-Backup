import { useRef } from 'react'

function FileInput() {

  const fileInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fileInput.current.files.length > 0) {
      console.log(`Selected file - ${fileInput.current.files[0].name}`);
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Upload file:
        <input type="file" ref={fileInput} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );

}

export default FileInput