import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../resources/SmartChatLogo.svg";
import "../App.css"; // CSS import

const Header = () => {
  const navigate = useNavigate();

  const toMainPage = () => {
    navigate("/");
  };

  return (
    <div className="header">
      <div className="header-left">
        <div className="header-title-logo">
          <img src={logo} className="header-icon" alt="Smart Chat App logo" onClick={toMainPage} />
          <h1 className="header-title" onClick={toMainPage}>
            Smart Chat App
          </h1>
        </div>
        <nav className="nav">
          <a href="#features">Features</a>
          <a href="#plans">Plans</a>
          <a href="#about">About Us</a>
        </nav>
      </div>
      <div className="header-right">
        <button className="sign-in">Sign In</button>
        <button className="sign-up">Sign Up</button>
      </div>
    </div>
  );
};

export default Header;
