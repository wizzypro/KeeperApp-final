import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Note from "../components/body/Note";
import CreateArea from "./body/CreateArea";
import axios from "axios";
import Login from "./login/Login";

function App() {
  const [noteArray, setNoteArray] = useState([]);
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [data, setData] = useState(null);

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
  useEffect(() => {
    axios
      .get("/api")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, []);

  return (
    <div>
      <Header user={isloggedIn} />
      <CreateArea
        add={addNoteHandler}
        style={{ display: !isloggedIn && "none" }}
      />
      <Login style={{ display: isloggedIn && "none" }} />
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
