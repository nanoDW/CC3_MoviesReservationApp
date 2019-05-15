import React from "react";
import "semantic-ui-css/semantic.min.css";
import AppHeader from "./AppHeader";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      loggedIn: false,
      movieID: "5cd2f32458e6681ba0294bf0",
      username: "Janusz Kowalski"
      };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.setMovieId = this.setMovieId.bind(this);
    this.setUser = this.setUser.bind(this)
  }

  handleLogin = () => this.setState({ loggedIn: true });
  handleLogout = () => {
    this.setState({ loggedIn: false });
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  };
  setUser = (user) => this.setState({ username: user })

  setMovieId = (_id) => this.setState({ movieID: _id });

  render() {
    return (
      <>
        <AppHeader
          loggedIn={this.state.loggedIn}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          setUser={this.setUser}
          username={this.state.username}
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
