import React from "react";
import "./Warning.css"; 
const Malicious =() => {
    return (
    <div className="warning-container">
      <div className="warning-box">
        <div className="icon">!</div>

        <h1>The site ahead contains harmful programs</h1>

        <p>
          Attackers on <strong>Naxtrotradeplus.com</strong> might attempt to trick you
          into installing programs that harm your browsing experience (for example, 
          by changing your homepage or showing extra ads on sites you visit).
        </p>

        <div className="buttons">
          <button
            className="details-btn"
            onClick={() => {
              window.location.href = "/details"; 
              // (You create /details meaning your own safe page)
            }}
          >
            Details
          </button>

          <button
            className="safe-btn"
            onClick={() => {
              window.location.href = "https://www.google.com";
            }}
          >
            Back to safety
          </button>
        </div>

        <div className="checkbox">
          <input type="checkbox" id="improve" />
          <label htmlFor="improve">Help improve Safe Browsing</label>
        </div>
      </div>
    </div>
  );
}
export default Malicious;



