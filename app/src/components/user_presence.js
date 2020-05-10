import React from "react";
import PresenceItem from "./presence_item";

class UserPresence extends React.Component {
  state = {
    presence: [],
  };

  componentDidMount() {
    fetch("http://localhost:3000/presence/today")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ presence: data.message });
      });
  }

  render() {
    const userPresenceList = this.state.presence.map((p) => (
      <PresenceItem key={p.user_id} presenceData={p} />
    ));
    return (
      <div>
        <h3>Today's Presence</h3>
        {userPresenceList}
      </div>
    );
  }
}

export default UserPresence;
