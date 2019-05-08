import React from "react";
import { Placeholder, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";
import "./AppHeader.css";
// import moment = require("moment");

class AppHeader extends React.Component {
  userInfo() {
    if (this.props.loggedIn === "true") {
      return (
        <div className="user-info">
          <Image
            src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
            avatar
            className="user-avatar"
          />
          <span className="user-name">{this.props.username}</span>
        </div>
      );
    }
  }
  dateInfo = moment().format("DD.MM.YYYY");

  render() {
    return (
      <div className="app-header">
        <div className="logo">
          <Placeholder inverted style={{ height: 60, width: 200 }}>
            <Placeholder.Image />
          </Placeholder>
        </div>
        {this.userInfo()}
        <div className="location">
          <div className="cityname">Wrocław</div>
          <div className="date">{this.dateInfo}</div>
        </div>
      </div>
    );
  }
}

export default AppHeader;
