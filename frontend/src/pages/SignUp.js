import React, { useState } from "react";
import Header from "../component/Header";
import "../App.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
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
    e.preventDefault();
    const value = e.target.value;
    const id = e.target.id;

    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  // check wheather every input is filled
  const checkInputCompleted = () => {
    let isCompleted = true;

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
  };

  // check email when the focus out from email input text
  const handleEmailBlur = async () => {
    if (email !== "") {
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
    }
  };

  // check wheather the signup inputs are filled and then send to backend
  const navigate = useNavigate();
  const onClickSignUp = (e) => {
    e.preventDefault();
    console.log("Click Sign up button");

    // wheather all inputs is filled
    if (!checkInputCompleted()) {
      console.log("check!");
      setsignUpUncomplete(true);
      return;
    } else {
      setsignUpUncomplete(false);
    }

    // check password and confirm password is same
    if (confirm !== password) {
      setpasswordSame(true);
    } else {
      setpasswordSame(false);
    }

    // send to backend all informations
    fetch("/signup/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => {
        if (response.ok) {
          console.log("create!!!");
          navigate("/SignIn");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="Background">
      <Header />

      <div className="Description-title">Get Started with Smart Chat</div>

      <form className="Signup-body">
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

        <button className="custom-button" onClick={onClickSignUp}>
          <span> Sign Up </span>
        </button>
        <br style={{ marginBottom: "50vh" }} />
      </form>
    </div>
  );
}

export default SignUp;
