import React, { useState } from "react";
import axios from "axios"


const App = () => {
  const [notes, setNotes] = useState([]);

  axios.get(`http://localhost:3000/api/notes`)
    .then((res) => {
    setNotes(res.data.note)
  })



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
