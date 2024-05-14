import React, { useState } from "react";
import Header from "../component/Header";
import "../App.css";
import Results from "../resources/Utils";
import signup from "./SignUp";
import { Link } from "react-router-dom";

function SignIn() {
  // signin status check - using signinCheck set default as false
  const [signinCheck, setSigninCheck] = useState(false);

  // signin information about (email and password -> input)
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  // check change event using email and password input
  const onChange = (e) => {
    e.preventDefault();

    const value = e.target.value;
    const id = e.target.id;

    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  // check wheather the signin information is available when the button clicked
  const onClickLogin = () => {
    console.log("Click Login button");
    console.log("Email : " + email + " // Password : " + password);

    fetch("/signin/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => {
        console.log("Success:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);

        const status = data.status;

        if (status === Results.SUCCESS) {
          console.log("Login successful");
          setSigninCheck(false);

          // Store token in local storage
          /*
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("email", data.email);
          */
        } else if (status === Results.FAIL) {
          console.log("Login failed");
          setSigninCheck(true);
        } else {
          console.log("Unknown status:", status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="Background">
      <Header />

      <div className="Description-body">Log in to chat your smart partner.</div>
      <div className="Description-title">Welcome</div>

      <form className="Signin-body">
        <label className="Signin-component-title">Email</label>
        <input id="email" className="inputWrap" type="email" value={email} onChange={onChange} />

        <label className="Signin-component-title">Password</label>
        <input id="password" className="inputWrap" type="password" value={password} onChange={onChange} />
        <br />

        {signinCheck && <label style={{ color: "red" }}>Please try again</label>}
        <button type="button" className="check-button" onClick={onClickLogin}>
          Login
        </button>
      </form>

      <p>
        <label>Forgot your password?</label>
        <br />
        <label>Don't have an account ?</label>
        <Link className="Signup-link" to="signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
export default SignIn;
