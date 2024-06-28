import React, { createContext, useState } from "react";

export const ContinueToastContext = createContext();

export const ContinueToastProvider = ({ children }) => {
  const [continueToastVisible, setContinueToastVisible] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);

  const showContinueToast = (showBack) => {
    setContinueToastVisible(true);
    setShowBackButton(showBack);
  };

  const hideContinueToast = () => {
    setContinueToastVisible(false);
    setShowBackButton(false);
  };

  return (
    <ContinueToastContext.Provider value={{ continueToastVisible, showContinueToast, hideContinueToast, showBackButton }}>
      {children}
    </ContinueToastContext.Provider>
  );
};
