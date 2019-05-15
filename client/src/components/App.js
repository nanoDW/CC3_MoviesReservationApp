import React from "react";
import "semantic-ui-css/semantic.min.css";
import LoginForm from "./LoginForm";
import AppHeader from "./AppHeader";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      loggedIn: false,
      movieID: "5cd2f32458e6681ba0294bf0"
      };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.setMovieId = this.setMovieId.bind(this);
  }

  handleLogin = () => this.setState({ loggedIn: true });
  handleLogout = () => {
    this.setState({ loggedIn: false });
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  };

  setMovieId = (_id) => this.setState({ movieID: _id });

  render() {
    return (
      <>
        <AppHeader
          loggedIn={this.state.loggedIn}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          username="Janusz Kowalski"
        />
        <div className="main-wrapper">
          <MovieList setMovieId={this.setMovieId} />
          <MovieDetail
            loggedIn={this.state.loggedIn}
            handleLogin={this.handleLogin}
            movieID={this.state.movieID}
          />
        </div>
      </>
    );
  }
}

export default App;
