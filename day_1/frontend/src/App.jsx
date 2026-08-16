import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  console.log("hello integration");

  function Fetch_notes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }
  useEffect(() => {
    Fetch_notes();
  }, []);

  function handle_submit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;
    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        Fetch_notes();
      });
  }

  function handle_delete(note_id) {
    axios.delete("http://localhost:3000/api/notes/" + note_id).then((res) => {
      console.log(res.data);
      Fetch_notes();
    });
  }

  return (
    <>
      <form onSubmit={handle_submit} className="note_create_form ">
        <input type="text" name="title" id="" placeholder="Enter Title" />
        <input
          type="text"
          name="description"
          id=""
          placeholder="Enter Descrption"
        />
        <button className="button"> Create Note</button>
        
      </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button
                className="delete"
                onClick={() => {
                  handle_delete(note._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
