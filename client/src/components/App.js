import React from "react";
import "semantic-ui-css/semantic.min.css";
import LoginForm from "./LoginForm";
import AppHeader from "./AppHeader";
import MovieList from "./MovieList";
import ScreeningRoom from "./ScreeningRoom";
import MovieDetail from "./MovieDetail";

class App extends React.Component {
  state = {};

  render() {
    return (
      <>
        <AppHeader loggedIn={false} username="Janusz Kowalski" />
        <LoginForm />
        <MovieList />
        <MovieDetail />
        <ScreeningRoom />
      </>
    );
  }
}

export default App;
