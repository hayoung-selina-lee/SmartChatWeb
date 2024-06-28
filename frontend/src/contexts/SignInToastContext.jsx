import React, { createContext, useState } from "react";

export const SignInToastContext = createContext();

export const SignInToastProvider = ({ children }) => {
  const [signInToastVisible, setSignInToastVisible] = useState(false);
  const [signInSuccessToastVisible, setSignInSuccessToastVisible] = useState(false);

  const showSignInToast = () => {
    setSignInToastVisible(true);
  };

  const hideSignInToast = () => {
    setSignInToastVisible(false);
  };

  const showSignInSuccessToast = () => {
    setSignInSuccessToastVisible(true);
  };

  const hideSignInSuccessToast = () => {
    setSignInSuccessToastVisible(false);
  };

  return (
    <SignInToastContext.Provider
      value={{
        signInToastVisible,
        showSignInToast,
        hideSignInToast,
        signInSuccessToastVisible,
        showSignInSuccessToast,
        hideSignInSuccessToast,
      }}
    >
      {children}
    </SignInToastContext.Provider>
  );
};
