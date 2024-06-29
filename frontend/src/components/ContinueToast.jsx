import React, { useContext } from "react";
import { ContinueToastContext } from "../contexts/ContinueToastContext";
import "../App.css"; // Ensure this CSS file contains the necessary styles

const ContinueToast = () => {
  const { continueToastVisible, hideContinueToast } = useContext(ContinueToastContext);

  const handleClose = () => {
    hideContinueToast();
  };

  const handleContinue = () => {
    // Implement your continue functionality here
    // Example: navigate to a specific route
  };

  return (
    <div className={`toast-container ${continueToastVisible ? "show" : ""}`}>
      <div className="toast-content">
        <button className="close-button" onClick={handleClose}>
          X
        </button>
        <div className="back-button" onClick={handleClose}>
          ←
        </div>
        <p className="toast-message">If you start without an account, you won’t save your chat information.</p>
        <div className="continue-button">
          <button className="arrow-button" onClick={handleContinue}>
            <span className="arrow-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContinueToast;
