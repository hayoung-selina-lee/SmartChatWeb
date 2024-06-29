import React from "react";
import "../../App.css";
import "./Main.css";

import AIIcon from "../../resources/AI_Icon";
import OtherUser_Icon from "../../resources/OtherUser_Icon";

import { PiChatCenteredDotsFill } from "react-icons/pi";

import { SignInToastContext } from "../../contexts/SignInToastContext";

const Main = () => {
  const { showSignInToast } = React.useContext(SignInToastContext);

  const handleClick = () => {
    showSignInToast();
  };

  return (
    <div className="background">
      <section className="plan-section">
        <h2 className="plan-description-title">Chat type for Your Need</h2>
        <p className="plan-description-body">
          Discover the best way to interact with our platform. Choose to chat with our advanced AI for instant, accurate responses, or connect with other users
          to share experiences and perspectives.
        </p>

        <div className="plans">
          <div className="plan-card">
            <div className="plan-header">
              <h3 className="plan-title">With Smart AI</h3>
              <p className="plan-description">You can chat with AI.</p>
              <AIIcon className="plan-ai-icon" />
            </div>

            <button className="button-get-started" onClick={handleClick}>
              Get Started
            </button>

            <hr className="line" />

            <ul className="plan-features">
              <p className="plan-features-title">Features</p>
              <li className="plan-features-line">
                <PiChatCenteredDotsFill className="plan-features-icon" />
                Instant responses
              </li>
              <li>
                <PiChatCenteredDotsFill className="plan-features-icon" />
                24/7 availability
              </li>
              <li>
                <PiChatCenteredDotsFill className="plan-features-icon" />
                Wide knowledge base
              </li>
              <li>
                <PiChatCenteredDotsFill className="plan-features-icon" />
                Learning capabilities
              </li>
              <li>
                <PiChatCenteredDotsFill className="plan-features-icon" />
                Consistent personality
              </li>
              <li>
                <PiChatCenteredDotsFill className="plan-features-icon" />
                Privacy-focused
              </li>
            </ul>
          </div>

          <div className="plan-card">
            <div className="plan-header">
              <h3 className="plan-title">With Other Users</h3>
              <p className="plan-description">You can chat with other users.</p>
              <OtherUser_Icon className="plan-others-icon" />
            </div>

            <button className="button-get-started" onClick={handleClick}>
              Get Started
            </button>

            <hr className="line" />

            <ul className="plan-features">
              <p className="plan-features-title">Features</p>
              <li>
                <PiChatCenteredDotsFill className="plan-features-icon" />
                Real-time communication
              </li>
              <li>
                <PiChatCenteredDotsFill className="plan-features-icon" />
                Diverse perspectives
              </li>
              <li>
                <PiChatCenteredDotsFill className="plan-features-icon" />
                Community support
              </li>
              <li>
                <PiChatCenteredDotsFill className="plan-features-icon" />
                Networking opportunities
              </li>
              <li>
                <PiChatCenteredDotsFill className="plan-features-icon" />
                Emotional connections
              </li>
              <li>
                <PiChatCenteredDotsFill className="plan-features-icon" />
                Interactive experiences
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
