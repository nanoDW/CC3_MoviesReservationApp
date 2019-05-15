import React from "react";
import {} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Schedule from "./Schedule";
import basePath from "../api/basePath";
import "./MovieDetail.css";

class MovieDetail extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        _id: "",
        title: "",
        genre: "",
        duration: "",
        age: "",
        image: "",
        shortDescription: "",
        fullDescription: "",
        screenings: []
      };
    }

  componentDidMount() {
    this.getMovie("5cd2f32458e6681ba0294bf0");
  }

  componentWillReceiveProps(nextProps) {
    this.getMovie(nextProps.movieID);
  }

  getMovie = async (id) => {
     await basePath({
      method: "get",
      url: `/api/movies/${id}`
    })
      .then(movie => {
        this.setState({
          _id: movie.data._id,
          title: movie.data.title,
          genre: movie.data.genre,
          duration: movie.data.durationInMinutes,
          age: movie.data.ageGroup,
          image: movie.data.imageLarge,
          shortDescription: movie.data.shortDescription,
          fullDescription: movie.data.fullDescription,
          screenings: movie.data.screenings
        });
      });
    }

  render() {
    return (
      <>
        <h2 className="movie-title">{this.state.title}</h2>
        <div className="movie-details">
          <img
            src={this.state.image}
            alt="poster"
            className="movie-details__poster"
          />
          <div className="movie-details__main">
            <p className="movie-parameter">
              <span>Genre: </span>
              {this.state.genre}
            </p>
            <p className="movie-parameter">
              <span>Duration: </span>
              {this.state.duration} min
            </p>
            <p className="movie-parameter">
              <span>Age: </span>
              {this.state.age}
            </p>
            <p className="movie-short-description">
              {this.state.shortDescription}
            </p>
          </div>
          <Schedule
            screenings={this.state.screenings}
            loggedIn={this.props.loggedIn}
            handleLogin={this.props.handleLogin}
          />
          <p className="movie-full-description">{this.state.fullDescription}</p>
        </div>
      </>
    );
  }
}

export default MovieDetail;
