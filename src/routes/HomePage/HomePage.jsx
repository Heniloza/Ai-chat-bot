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
                "Human: We produce food for Mice",
                2000,
                "Bot: We produce food for Hamsters",
                2000,
                "Human2 :We produce food for Guinea Pigs",
                2000,
                "Bot: We produce food for Chinchillas",
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
