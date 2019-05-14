import React from "react";
import {} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import Schedule from "./Schedule";
// import basePath from "../api/basePath";
import "./MovieDetail.css";

class MovieDetail extends React.Component {
  state = {
    title: "",
    genre: "",
    duration: "",
    age: "",
    image: "",
    shortDescription: "",
    fullDescription: "",
    screenings: []
  };

  componentDidMount() {
    axios
      .get(`http://localhost:3000/api/movies/${this.props.movieID}`)
      .then(movie => {
        this.setState({
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
          <Schedule screenings={this.state.screenings} />
          <p className="movie-full-description">{this.state.fullDescription}</p>
        </div>
      </>
    );
  }
}

export default MovieDetail;
