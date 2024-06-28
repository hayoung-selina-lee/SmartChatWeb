import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import ToastPopUp from "../components/ToastPopUp";

function SignUp() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // for toast message after creating new account
  const [showToast, setShowToast] = useState(false);

  // check for finishing all input check
  const [signUpUncomplete, setsignUpUncomplete] = useState(false);

  // check which input is not vailable
  const [inputChecks, setSignUpCheck] = useState({
    emailCheck: false,
    passwordCheck: false,
    confirmCheck: false,
    nameCheck: false,
    genderCheck: false,
    birthCheck: false,
  });
  const { emailCheck, passwordCheck, confirmCheck, nameCheck, genderCheck, birthCheck } = inputChecks;

  // check wheather the password and confirm password is same
  const [passwordSameCheck, setpasswordSame] = useState(false);

  // signup information
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirm: "",
    name: "",
    gender: "",
    birth: 0,
  });
  const { email, password, confirm, name, gender, birth } = inputs;

  // check every input changed
  const onChange = (e) => {
    const { id, value } = e.target;

    setInputs({
      ...inputs,
      [id]: value,
    });

    if (id !== "email") {
      checkInputCompleted(id);
    }
  };

  // check wheather every input is filled
  const checkInputCompleted = (input) => {
    let isCompleted = true;
    if (!input || input === "email") {
      if (!email) {
        setSignUpCheck((prevState) => ({
          ...prevState,
          emailCheck: true,
        }));
        isCompleted = false;
      } else {
        setSignUpCheck((prevState) => ({
          ...prevState,
          emailCheck: false,
        }));
      }
    }

    if (!input || input === "password") {
      if (!password) {
        setSignUpCheck((prevState) => ({
          ...prevState,
          passwordCheck: true,
        }));
        isCompleted = false;
      } else {
        setSignUpCheck((prevState) => ({
          ...prevState,
          passwordCheck: false,
        }));
      }
    }

    if (!input || input === "confirm") {
      if (!confirm) {
        setSignUpCheck((prevState) => ({
          ...prevState,
          confirmCheck: true,
        }));
        isCompleted = false;
      } else {
        setSignUpCheck((prevState) => ({
          ...prevState,
          confirmCheck: false,
        }));
      }
    }

    if (!input || input === "name") {
      if (!name) {
        setSignUpCheck((prevState) => ({
          ...prevState,
          nameCheck: true,
        }));
        isCompleted = false;
      } else {
        setSignUpCheck((prevState) => ({
          ...prevState,
          nameCheck: false,
        }));
      }
    }

    if (!input || input === "gender") {
      if (!checkGender()) {
        setSignUpCheck((prevState) => ({
          ...prevState,
          genderCheck: true,
        }));
        isCompleted = false;
      } else {
        setSignUpCheck((prevState) => ({
          ...prevState,
          genderCheck: false,
        }));
      }
    }

    if (!input || input === "birth") {
      if (!checkDateOfBirth()) {
        setSignUpCheck((prevState) => ({
          ...prevState,
          birthCheck: true,
        }));
        isCompleted = false;
      } else {
        setSignUpCheck((prevState) => ({
          ...prevState,
          birthCheck: false,
        }));
      }
    }

    return isCompleted;
  };

  // check wheater the birth input is vaild
  const checkDateOfBirth = () => {
    if (birth) {
      const date = new Date(birth);
      return !isNaN(date.getTime());
    }
    return false;
  };

  // check wheater the gender input is checked
  const checkGender = () => {
    return !!gender;
  };

  // save gender information
  const onRadioChange = (e) => {
    setInputs({
      ...inputs,
      gender: e.target.value,
    });

    checkInputCompleted("gender");
  };

  // check validate Email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // check email when the focus out from email input text
  const handleEmailBlur = async () => {
    if (email !== "" && validateEmail(email)) {
      fetch("/signup/checkmail?email=" + encodeURIComponent(email), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            setSignUpCheck((prevState) => ({
              ...prevState,
              emailCheck: false,
            }));
            setsignUpUncomplete(false);
          } else if (response.status === 409) {
            setSignUpCheck((prevState) => ({
              ...prevState,
              emailCheck: true,
            }));
            setsignUpUncomplete(true);
          }
        })
        .catch((error) => {
          console.error("Error checking email:", error);
        });
    } else {
      setSignUpCheck((prevState) => ({
        ...prevState,
        emailCheck: true,
      }));
      setsignUpUncomplete(true);
    }
  };

  // check wheather the signup inputs are filled and then send to backend
  const navigate = useNavigate();

  const onClickSignUp = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
    console.log("Click Sign up button");

    // wheather all inputs is filled
    if (!checkInputCompleted()) {
      console.log("check!");
      setsignUpUncomplete(true);
      setIsButtonDisabled(false);
      return;
    } else {
      setsignUpUncomplete(false);
    }

    // check password and confirm password is same
    if (confirm !== password) {
      setIsButtonDisabled(false);
      setpasswordSame(true);
      return;
    } else {
      setpasswordSame(false);
    }
    // send to backend all informations
    try {
      const response = await fetch("/signup/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (response.ok) {
        setShowToast(true);
        console.log("Account created successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="background">
      <div className="description-title">Get Started with Smart Chat</div>

      <form className="signup-body">
        <label className="input-label">Email</label>
        <div className="input-button-wrapper">
          <input
            id="email"
            className={emailCheck ? "warning-inputWrap" : "inputWrap"}
            type="email"
            value={email}
            onChange={onChange}
            onBlur={handleEmailBlur}
          />
        </div>

        <label className="input-label">Password</label>
        <input
          id="password"
          className={passwordCheck || passwordSameCheck ? "warning-inputWrap" : "inputWrap"}
          type="password"
          value={password}
          onChange={onChange}
        />

        <label className="input-label">Confirm Password</label>
        <input
          id="confirm"
          className={confirmCheck || passwordSameCheck ? "warning-inputWrap" : "inputWrap"}
          type="password"
          value={confirm}
          onChange={onChange}
        />

        <label className="input-label">Name</label>
        <input id="name" className={nameCheck ? "warning-inputWrap" : "inputWrap"} type="text" value={name} onChange={onChange} />

        <label className="input-label">Gender</label>
        <div className={genderCheck ? "radio-inputs warning-radio-inputs" : "radio-inputs"}>
          <label class="radio">
            <input type="radio" name="radio" value="male" onChange={onRadioChange} />
            <span class="name">Male</span>
          </label>
          <label class="radio">
            <input type="radio" name="radio" value="female" onChange={onRadioChange} />
            <span class="name">Female</span>
          </label>

          <label class="radio">
            <input type="radio" name="radio" value="other" onChange={onRadioChange} />
            <span class="name">Other</span>
          </label>
        </div>

        <label className="input-label">Date of Birth</label>
        <input id="birth" className={birthCheck ? "warning-inputWrap" : "inputWrap"} type="date" value={birth} onChange={onChange} required />

        <br />

        {signUpUncomplete && <label className="warning-label">Please fill every part</label>}
        {passwordSameCheck && <label className="warning-label">Check Password</label>}

        <button disabled={isButtonDisabled} className="custom-button" onClick={onClickSignUp}>
          <span> Sign Up </span>
        </button>
        <br style={{ marginBottom: "50vh" }} />
      </form>
      {showToast && (
        <ToastPopUp
          setToast={setShowToast}
          text={
            <>
              Sign up completed. <br />
              Redirecting to the sign in page.
            </>
          }
          onFinishToast={() => navigate("/signin")}
        />
      )}
    </div>
  );
}

export default SignUp;
