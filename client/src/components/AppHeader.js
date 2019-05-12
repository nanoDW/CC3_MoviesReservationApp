import React from "react";
import { Image, Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./AppHeader.css";

class AppHeader extends React.Component {
  userInfo() {
    if (this.props.loggedIn) {
      return (
        <>
          <img className="user-avatar" src="../assets/img/avatar.png" />
          <span className="user-name">{this.props.username}</span>
          <Button className="btn" animated>
            <Button.Content visible>Log out</Button.Content>
            <Button.Content hidden>
              <Icon name="sign-out" />
            </Button.Content>
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button className="btn" animated>
            <Button.Content visible>Log in</Button.Content>
            <Button.Content hidden>
              <Icon name="sign-in" />
            </Button.Content>
          </Button>
          <Button className="btn" animated>
            <Button.Content visible>Register</Button.Content>
            <Button.Content hidden>
              <Icon name="address card" />
            </Button.Content>
          </Button>
        </>
      );
    }
  }

  render() {
    return (
      <div className="app-header">
        <div className="logo">
          <img src="../assets/img/logo.svg" alt="logo" />
          <h1 className="cinema-name">Cinema East</h1>
        </div>

        <div className="user-info">{this.userInfo()}</div>
      </div>
    );
  }
}

export default AppHeader;
