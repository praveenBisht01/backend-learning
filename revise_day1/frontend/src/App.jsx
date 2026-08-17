import React, { useState } from "react";

const App = () => {
  const [notes, setNotes] = useState([
    {
      title: "test title 1",
      description: "test description 1",
    },
    {
      title: "test title 2",
      description: "test description 2",
    },
    {
      title: "test title 3",
      description: "test description 3",
    },
    {
      title: "test title 4",
      description: "test description 4",
    },
    {
      title: "test title 5",
      description: "test description 5",
    },
    {
      title: "test title 6",
      description: "test description 6",
    },
    {
      title: "test title 7",
      description: "test description 7",
    },
  ]);

  return (
    <>
      <div className="notes">
        {notes.map(note => {
         return  <div className="note">
           <h1>{note.title}</h1>
            <p>{note.description}</p>
          </div>;
        })}
      </div>
    </>
  );
};

export default App;
