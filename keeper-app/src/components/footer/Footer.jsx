import React from "react";

let date = new Date();

let Footer = () => {
  return (
    <footer>
      <p>Built by Paul with Love. Copyright {date.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
