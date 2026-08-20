import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  console.log("hello integration");

  // FETCH NOTES
  function Fetch_notes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.note);
    });
  }

  useEffect(() => {
    Fetch_notes();
  }, []);

  // CREATE NOTE
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

        e.target.reset();
      });
  }

  // DELETE NOTE
  function dlt_note(id) {
    axios.delete("http://localhost:3000/api/notes/" + id).then((res) => {
      console.log(res.data);

      Fetch_notes();
    });
  }

  // UPDATE NOTE
  function update_note(id) {
    const title = prompt("Enter new title");

    if (title === null) return;

    const description = prompt("Enter new description");

    if (description === null) return;

    axios
      .patch("http://localhost:3000/api/notes/" + id, {
        title: title,
        description: description,
      })
      .then((res) => {
        console.log(res.data);

        Fetch_notes();
      });
  }

  return (
    <>
      {/* CREATE NOTE FORM */}

      <form action="" className="note-create-form" onSubmit={handle_submit}>
        <input type="text" placeholder="Enter title" name="title" />

        <input type="text" placeholder="Enter description" name="description" />

        <button type="submit">Create Note</button>
      </form>

      {/* DISPLAY NOTES */}

      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note" key={note._id}>
              <h1>{note.title}</h1>

              <p>{note.description}</p>

              {/* DELETE */}

              <button
                className="delete-note"
                onClick={() => {
                  dlt_note(note._id);
                }}
              >
                Delete
              </button>

              {/* UPDATE */}

              <button
                className="update-note"
                onClick={() => {
                  update_note(note._id);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
  