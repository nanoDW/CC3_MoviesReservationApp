import React from "react";
import "semantic-ui-css/semantic.min.css";
import LoginForm from "./LoginForm";
import AppHeader from "./AppHeader";
import MovieList from "./MovieList";
import ScreeningRoom from "./ScreeningRoom";

class App extends React.Component {
  state = {};

  render() {
    return (
      <>
        <AppHeader loggedIn="true" username="Janusz Kowalski" />
        <LoginForm />
        <MovieList/>
        <ScreeningRoom />
      </>
    );
  }
}

export default App;