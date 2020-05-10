import React from "react";

class PresenceItem extends React.Component {
  state = {
    user: null,
    presenceData: this.props.presenceData,
  };

  componentDidMount() {
    this.getUserImageAndName(this.props.presenceData.user_id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.user) {
      this.setState({ user: prevProps.presenceData });
    }
  }

  getUserImageAndName = (id) => {
    fetch("http://localhost:3000/users/" + id)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ user: data.message[0] });
      });
  };

  actionTime = (actionTime) => {
    let dateTime = actionTime.split("+")[0];
    dateTime = dateTime.split("T");
    return dateTime;
  };

  getImage = (imageData) => {
    if (!imageData) {
      return null;
    }

    var imageList = imageData.split(",");

    return imageList[0];
  };

  actionFormat = (action) => {
    if (action === "in") {
      return (
        <span className="Todays-Presence-Info-ActionTime-Action Action-In">
          In
        </span>
      );
    } else if (action === "out") {
      return (
        <span className="Todays-Presence-Info-ActionTime-Action Action-Out">
          Out
        </span>
      );
    } else {
      return (
        <span className="Todays-Presence-Info-ActionTime-Action Action-Unknown">
          Unknown
        </span>
      );
    }
  };

  render() {
    return (
      <div className="Todays-Presence-Info d-flex flex-row justify-content-start">
        <div className="Todays-Presence-Info-Image-Holder">
          {this.state.user && this.getImage(this.state.user.images) ? (
            <img src={this.getImage(this.state.user.images)} alt="thumb" />
          ) : (
            <span>No Image</span>
          )}
        </div>

        <div className="Todays-Presence-Info-Name">
          {this.state.user
            ? this.state.user.first_name
            : this.state.presenceData.user_id}
        </div>
        <div className="Todays-Presence-Info-ActionTime-Holder d-flex flex-row flex-wrap justify-content-start">
          {this.state.presenceData.actions.map((action) => (
            <div
              key={action.date_time}
              className="Todays-Presence-Info-ActionTime p-0"
            >
              <span className="Todays-Presence-Info-ActionTime-Time">
                {this.actionTime(action.date_time)[1]}
              </span>
              {this.actionFormat(action.action)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PresenceItem;
