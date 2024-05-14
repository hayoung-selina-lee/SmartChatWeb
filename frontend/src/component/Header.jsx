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
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" onClick={toMainPage} />
      <h1 className="App-title">Smart Chat App </h1>
    </div>
  );
};
export default Header;
