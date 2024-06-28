// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { SignInToastProvider, SignInToastContext } from "./contexts/SignInToastContext";
import SignInToast from "./components/SignInToast";
import { ContinueToastProvider, ContinueToastContext } from "./contexts/ContinueToastContext";
import ContinueToast from "./components/ContinueToast";
import Header from "./components/Header"; // Ensure this is correctly imported if using Header component

function App() {
  return (
    <SignInToastProvider>
      <ContinueToastProvider>
        <BrowserRouter>
          <div className="header-layout">
            <Header />
          </div>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <ToastConsumer />
          <ContinueToastConsumer />
        </BrowserRouter>
      </ContinueToastProvider>
    </SignInToastProvider>
  );
}

const ToastConsumer = () => {
  const { signInToastVisible, hideSignInToast } = React.useContext(SignInToastContext);
  return <SignInToast show={signInToastVisible} onClose={hideSignInToast} />;
};

const ContinueToastConsumer = () => {
  const { continueToastVisible, hideContinueToast } = React.useContext(ContinueToastContext);
  return <ContinueToast show={continueToastVisible} onClose={hideContinueToast} />;
};

export default App;
