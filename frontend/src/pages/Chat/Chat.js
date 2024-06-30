import React from "react";
import "./Chat.css";
import "../../App.css";

import AIIcon from "../../resources/AI_Icon";

const Chat = () => {
  return (
    <div className="background">
      <div className="chat-container">
        <div className="chat-history-container">
          <div className="message-container sender">
            <span className="name">User</span>
            <div className="message">
              <span className="message-text">Hi! I'm Selina. How's it going? </span>
            </div>
          </div>

          <div className="message-container receiver">
            <span className="name">JOSEPH</span>
            <div className="message">
              <span className="message-text">Hi! I'm Joseph. I'm good so far. How about you?</span>
            </div>
          </div>
        </div>

        <div className="input-container">
          <input type="text" placeholder="Type a message..." className="chat-input" />
          <button className="send-button">➤</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
