import React, { useState } from "react";
import "../App.css";
import { ContinueToastContext } from "../contexts/ContinueToastContext";

function SignIn() {
  const { showContinueToast } = React.useContext(ContinueToastContext);

  const navigateToSignUp = () => {
    window.location.href = "/signup"; // Replace with your desired URL
  };

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
    const { id, value } = e.target;
    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  // check whether the signin information is available when the button clicked
  const onClickLogin = (e) => {
    e.preventDefault();

    fetch("/signin/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Login successful");
          setSigninCheck(false);
          return response.json();
        } else if (response.status === 401) {
          console.log("Invalid username or password");
          setSigninCheck(true);
        }
      })
      .then((data) => {
        console.log("Success:", data);

        console.log("Login successful");
        setSigninCheck(false);

        // Store token in local storage
        /*
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("email", data.email);
          */
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleContinueWithoutAccount = () => {
    showContinueToast(true); // Ensure showContinueToast function works as expected
  };

  return (
    <div className="background">
      <div className="description-body">Log in to chat with your smart partner.</div>
      <div className="description-title">Welcome</div>

      <form className="signin-body" onSubmit={onClickLogin}>
        <label className="input-label">Email</label>
        <input id="email" className="inputWrap" type="email" value={email} onChange={onChange} />

        <label className="input-label">Password</label>
        <input id="password" className="inputWrap" type="password" value={password} onChange={onChange} />
        <br />

        {signinCheck && <label style={{ color: "red" }}>Invalid username or password. Please try again.</label>}
        <button className="custom-button" type="submit">
          <span> Login </span>
        </button>
      </form>

      <p>
        <label className="signin-helper">Forgot your password?</label>
        <br />
        <label className="signin-helper">Don't have an account ?</label>
        <label className="link-text" onClick={navigateToSignUp}>
          {" "}
          Sign Up
        </label>
        <br />
        <label className="signin-helper">Would you like to use this service without creating an account?</label>
        <label className="link-text" onClick={handleContinueWithoutAccount}>
          Continue without account.
        </label>
      </p>
    </div>
  );
}

export default SignIn;
