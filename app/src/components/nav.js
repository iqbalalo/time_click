import React from "react";
import { Link } from "react-router-dom";

class Nav extends React.Component {
  render() {
    return (
      <div className="Nav" style={{ background: "#fff" }}>
        <Link to="/">
          <li>
            <i className="fas fa-home"></i>Home
          </li>
        </Link>
        <Link to="/users">
          <li>
            <i className="fas fa-users"></i> User List
          </li>
        </Link>
        <Link to="/presense/today">
          <li>
            <i className="fas fa-user-check"></i>
            Today's Presence
          </li>
        </Link>
      </div>
    );
  }
}

export default Nav;
