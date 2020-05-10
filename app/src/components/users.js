import React from "react";
import userData from "./data";
import EmailCompose from "./emailCompose";
import SmsCompose from "./smsCompose";
import CallCompose from "./callCompose";
import UserThumb from "./user_thumb";

class Users extends React.Component {
  state = {
    users: [],
    showEmailCompose: false,
    showSmsCompose: false,
    showCallCompose: false,
    selectedUser: null,
  };

  componentDidMount() {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        userData.message = data.message;
        this.setState({ users: userData.message });
      });
  }

  emailClick = (emailComposeShow, user) => {
    console.log("email clicked for selected user", user);

    this.setState({
      ...this.state,
      showEmailCompose: emailComposeShow,
      selectedUser: user,
    });
  };

  smsClick = (smsComposeShow, user) => {
    console.log("sms clicked for selected user", user);

    this.setState({
      ...this.state,
      showSmsCompose: smsComposeShow,
      selectedUser: user,
    });
  };

  phoneClick = (callComposeShow, user) => {
    console.log("phone clicked for selected user", user);

    this.setState({
      ...this.state,
      showCallCompose: callComposeShow,
      selectedUser: user,
    });
  };

  render() {
    // Make user list
    const userComponents = this.state.users.map((user) => (
      <UserThumb
        key={user.id}
        userData={user}
        emailClick={this.emailClick}
        smsClick={this.smsClick}
        phoneClick={this.phoneClick}
      />
    ));

    return (
      <div style={{ textAlign: "center" }}>
        <h2 style={{ margin: "1em" }}>
          ユーザ一覧 ({this.state.users.length})
        </h2>
        <div className="d-flex flex-row flex-wrap justify-content-center">
          {userComponents}{" "}
          {Array(7)
            .fill()
            .map((_, i) => (
              <i
                key={i}
                aria-hidden="true"
                style={{ width: 200, margin: "1em" }}
              ></i>
            ))}
        </div>
        <div>
          {this.state.showEmailCompose && (
            <EmailCompose
              emailClick={this.emailClick}
              user={this.state.selectedUser}
            />
          )}
          {this.state.showSmsCompose && (
            <SmsCompose
              smsClick={this.smsClick}
              user={this.state.selectedUser}
            />
          )}
          {this.state.showCallCompose && (
            <CallCompose
              phoneClick={this.phoneClick}
              user={this.state.selectedUser}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Users;
