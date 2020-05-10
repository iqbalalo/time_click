import React from "react";
import { Link } from "react-router-dom";

class UserThumbMini extends React.Component {
  state = {
    user: this.props.userData,
  };

  render() {
    return (
      <Link class="UserThumbLink" to={"/users/" + this.state.user.id}>
        <div
          className="UserThumb p-1 d-flex flex-column start"
          style={{ width: 200, margin: "1em", border: "1px solid #ccc" }}
        >
          <div
            style={{
              background: "rgb(109, 142, 158)",
              height: 150,
              minWidth: "100%",
            }}
          >
            {this.state.user.image ? (
              <img
                src={this.state.user.image}
                style={{ height: 72, width: "100%" }}
                alt="thumb"
              />
            ) : (
              <span
                style={{
                  color: "#fff",
                  lineHeight: "150px",
                  verticalAlign: "middle",
                }}
              >
                No Image
              </span>
            )}
          </div>
          <div className="p-1 d-flex flex-column start">
            <div
              className="p-0"
              style={{ fontWeight: "bold", textAlign: "left" }}
            >
              <span>{this.state.user.first_name}</span>{" "}
              <span>{this.state.user.last_name}</span>
            </div>
            <div
              className="p-0"
              style={{ fontSize: ".7rem", color: "#666", textAlign: "left" }}
            >
              ID: {this.state.user.id}
            </div>
            <div
              className="p-0 d-flex flex-row justify-content-between"
              style={{ marginTop: "1em" }}
            >
              <div>
                {/* <button className="btn btn-sm btn-link" title={this.state.user.presence}><i className="fas fa-check-circle" style={{color:this.state.user.presence === "online" ? "#00c200" : "#666"}}></i></button> */}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default UserThumbMini;
