import React, { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Note from "../components/body/Note";
import CreateArea from "./body/CreateArea";

function App() {
  const [noteArray, setNoteArray] = useState([]);

  function addNoteHandler(item) {
    setNoteArray((prevValue) => {
      return [...prevValue, item];
    });
  }

  function deleteHandler(id) {
    setNoteArray((prevValue) => {
      return prevValue.filter((array, i) => {
        return id !== i;
      });
    });
  }
  return (
    <div>
      <Header />
      <CreateArea add={addNoteHandler} />
      {noteArray.map((note, i) => (
        <Note
          key={i}
          title={note.title}
          content={note.content}
          id={i}
          delete={deleteHandler}
        />
      ))}

      <Footer />
    </div>
  );
}

export default App;
