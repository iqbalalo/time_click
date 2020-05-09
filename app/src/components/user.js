import React from "react";

class User extends React.Component {
  state = {
    user: this.props.userData,
  };

  render() {
    return (
      <div
        className="UserThumb p-1 d-flex flex-column start"
        style={{ width: 200, margin: "1em", border: "1px solid #ccc" }}
      >
        <div style={{ background: "#679292", height: 150, minWidth: "100%" }}>
          {this.state.user.image ? (
            <img
              src={this.state.user.image}
              style={{ height: 150, width: "100%" }}
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
              <button
                onClick={() => this.props.emailClick(true, this.state.user)}
                className="btn btn-sm btn-light"
                title="Send e-mail"
              >
                <i className="fas fa-at"></i>
              </button>
              <button
                onClick={() => this.props.smsClick(true, this.state.user)}
                className="btn btn-sm btn-light"
                title="Send sms"
              >
                <i className="far fa-comment-dots"></i>
              </button>
              <button
                onClick={() => this.props.phoneClick(true, this.state.user)}
                className="btn btn-sm btn-light"
                title="Call on phone"
              >
                <i className="fas fa-phone"></i>
              </button>
            </div>
            <div>
              {/* <button className="btn btn-sm btn-link" title={this.state.user.presence}><i className="fas fa-check-circle" style={{color:this.state.user.presence === "online" ? "#00c200" : "#666"}}></i></button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
