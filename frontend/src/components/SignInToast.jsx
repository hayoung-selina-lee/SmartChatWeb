import React, { useContext } from "react";
import SignIn from "../pages/SignIn";
import { ContinueToastContext } from "../contexts/ContinueToastContext";
import ContinueToast from "./ContinueToast";
import "../App.css"; // Ensure this CSS file contains the necessary styles

const SignInToast = ({ show, onClose }) => {
  const { continueToastVisible } = useContext(ContinueToastContext);

  return (
    <>
      {show && <div className="blur-background"></div>}
      <div className={`toast-container ${show ? "show" : ""}`}>
        <div className="toast-content">
          <button className="close-button" onClick={onClose}>
            X
          </button>

          <div className="toast-inner">
            {/* Render SignIn component */}
            <SignIn />
          </div>

          {/* Render ContinueToast only if continueToastVisible is true */}
          {continueToastVisible && <ContinueToast />}
        </div>
      </div>
    </>
  );
};

export default SignInToast;
