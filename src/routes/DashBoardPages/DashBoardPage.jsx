import React from "react";
import "./dashboardpage.css";

const DashBoardPage = () => {
  return (
    <div className="dashboardpage">
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="" />
          <h1>Henil dev</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Create & Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help me with my code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form action="">
          <input type="text" placeholder="Ask Me Anything......"/>
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>

      </div>
    </div>
  );
};

export default DashBoardPage;