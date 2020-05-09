import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="p-2" style={{ background: "#16588a" }}>
        <span
          id="logo"
          style={{
            fontSize: "1.3rem",
            fontWeight: "500",
            color: "#fff",
            padding: 4,
          }}
        >
          Time Click
        </span>
      </div>
    );
  }
}

export default Header;
