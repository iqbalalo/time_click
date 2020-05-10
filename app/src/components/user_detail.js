import React from "react";

class UserDetail extends React.Component {
  state = {
    user: this.props.userData,
  };

  render() {
    return (
      <div>
        <h3>User Detail</h3>
      </div>
    );
  }
}

export default UserDetail;
