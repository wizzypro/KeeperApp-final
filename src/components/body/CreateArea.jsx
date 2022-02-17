import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [formValid, setFormValid] = useState(false);
  const [inputState, setInputState] = useState(false);

  function handleNote(event) {
    const { name, value } = event.target;
    setNote((prevValue) => {
      if (name === "title") {
        return {
          title: value,
          content: prevValue.content,
        };
      } else if (name === "content") {
        return {
          title: prevValue.title,
          content: value,
        };
      }
    });

    if (note.title !== "" && note.content !== "") {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }

  function inputStateHandler() {
    setInputState(true);
  }

  function mouseLeaveHandler() {
    if (note.title === "" && note.content === "") {
      setInputState(false);
    } else {
      setInputState(true);
    }
  }
  return (
    <div style={props.style}>
      <form className="create-note">
        <input
          name="title"
          placeholder="Title"
          onChange={handleNote}
          value={note.title}
          style={{ display: !inputState && "none" }}
          onBlur={mouseLeaveHandler}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows={inputState ? "3" : "1"}
          onChange={handleNote}
          value={note.content}
          onFocus={inputStateHandler}
          onBlur={mouseLeaveHandler}
        />

        <Zoom in={formValid}>
          <Fab
            onClick={(event) => {
              event.preventDefault();
              props.add(note);
              setNote({
                title: "",
                content: "",
              });
              setFormValid(false);
            }}
            disabled={!formValid}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
