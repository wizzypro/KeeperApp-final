import React from "react";
import LoginCard from "./LoginCard";

function Login(props) {
  return (
    <div style={props.style} className="login-block">
      <h1>Please login to access your notes</h1>
      <div className="col-sm-4 card-grp">
        <div className="card">
          <LoginCard
            href={props.gHref}
            type="google"
            value="Sign In with Google"
          />
          <LoginCard
            href={props.FHref}
            type="facebook"
            value="Sign In with Facebook"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
