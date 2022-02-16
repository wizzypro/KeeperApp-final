import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [formValid, setFormValid] = useState(false);

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
  return (
    <div>
      <form>
        <input
          name="title"
          placeholder="Title"
          onChange={handleNote}
          value={note.title}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          onChange={handleNote}
          value={note.content}
        />
        <button
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
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
