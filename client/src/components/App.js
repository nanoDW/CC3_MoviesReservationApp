import React from "react";
import "semantic-ui-css/semantic.min.css";
import LoginForm from "./LoginForm";
import AppHeader from "./AppHeader";
import MovieList from "./MovieList";
import ScreeningRoom from "./ScreeningRoom";
import MovieDetail from "./MovieDetail";
import "./App.css";

class App extends React.Component {
  state = {};

  render() {
    return (
      <>
        <AppHeader loggedIn={false} username="Janusz Kowalski" />
        <div className="main-wrapper">
          <LoginForm />
          <MovieList />
          <MovieDetail movieID="5cd2f32458e6681ba0294bf0" />
          <ScreeningRoom />
        </div>
      </>
    );
  }
}

export default App;
