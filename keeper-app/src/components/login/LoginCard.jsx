import React from "react";

function LoginCard(props) {
  return (
    <div className="card-body">
      <a
        className={`btn btn-block btn-social btn-${props.type}`}
        href="#"
        role="button"
        onClick={props.href}
      >
        <i className={`fab fa-${props.type}`}></i>
        {props.value}
      </a>
    </div>
  );
}

export default LoginCard;
