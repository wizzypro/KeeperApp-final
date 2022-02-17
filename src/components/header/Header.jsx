import React from "react";
import NotesIcon from "@mui/icons-material/Notes";

let Header = (props) => {
  return (
    <header>
      <div>
        <h1>
          <NotesIcon />
          Keeper
        </h1>

        <a href={props.logout} style={{ display: !props.user && "none" }}>
          logout
        </a>
      </div>
    </header>
  );
};

export default Header;
