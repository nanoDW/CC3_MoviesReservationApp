import React from "react";
import { Image, Button, Modal, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./AppHeader.css";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

class AppHeader extends React.Component {

  constructor(props) {
    super(props)

    this.state = { loginModalOpen: false, signUpModalOpen: false }
    this.handleLoginOpen = this.handleLoginOpen.bind(this)
    this.handleLoginClose = this.handleLoginClose.bind(this)
    this.handleSignUpOpen = this.handleSignUpOpen.bind(this)
    this.handleSignUpClose = this.handleSignUpClose.bind(this)

  }

  handleLoginOpen = () => this.setState({ loginModalOpen: true })
  handleLoginClose = () => this.setState({ loginModalOpen: false })
  handleSignUpOpen = () => this.setState({ signUpModalOpen: true })
  handleSignUpClose = () => this.setState({ signUpModalOpen: false })

  
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
        <Modal trigger={
           <Button className="btn" animated onClick={this.handleLoginOpen}>
            <Button.Content visible>Log in</Button.Content>
            <Button.Content hidden>
              <Icon name="sign-in" />
            </Button.Content>
            </Button>
         } open={this.state.loginModalOpen}
         onClose={this.handleLoginClose} closeIcon>
            <LoginForm handleOpen = {this.handleLoginOpen} handleClose = {this.handleLoginClose}/>
        </Modal>
        <Modal trigger={
          <Button className="btn" animated onClick={this.handleSignUpOpen}>
            <Button.Content visible>Register</Button.Content>
            <Button.Content hidden>
              <Icon name="address card" />
            </Button.Content>
          </Button>
        } open={this.state.signUpModalOpen}
         onClose={this.handleSignUpClose} closeIcon>
            <SignUpForm handleOpen = {this.handleSignUpOpen} handleClose = {this.handleSignUpClose} />
        </Modal>
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
