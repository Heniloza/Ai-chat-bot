import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const HomePage = () => {

  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>Henil Dev</h1>
        <h2>SuperCharge your activity and productivity.</h2>
        <h3>
          Ask your question and get better result with personalised experienced.
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />
          <div className="chat">
            <TypeAnimation
              sequence={[
                "User: How can you help me?",
                2000,
                "Bot: I can answer questions, provide suggestions, and assist with tasks.",
                2000,
                "User: Can you summarize articles?",
                2000,
                "Bot: Absolutely! Just share the text or link, and I'll create a summary.",
                2000,
                "User: Can you help me learn something new?",
                2000,
                "Bot: Of course! Let me know the topic, and I'll guide you step by step.",
                2000,
                "User: What makes you unique?",
                2000,
                "Bot: I'm designed to offer personalized, real-time assistance for your needs!",
                2000,
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
