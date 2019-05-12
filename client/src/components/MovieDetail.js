import React from "react";
import {} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
// import basePath from '../api/basePath';
import "./MovieDetail.css";

class MovieDetail extends React.Component {
  state = {
    movieInfo: {}
  };

  componentDidMount() {
    axios.get("/mockupResponses/movie.json").then(res => {
      console.log(res);
      this.setState({
        movieInfo: res.data
      });
      console.log(this.state.movieInfo);
    });
  }
  render() {
    return (
      <>
        <h2>{this.state.movieInfo.title}</h2>
        <div className="movie-details">
          <div className="movie-details__poster" />
          <div className="movie-details__main">
            <p className="movie-parameter">
              <span>Genre: </span>
              {this.state.movieInfo.genre}
            </p>
            <p className="movie-parameter">
              <span>Duration: </span>
              {this.state.movieInfo.durationInMinutes} min
            </p>
            <p className="movie-parameter">
              <span>Age: </span>
              {this.state.movieInfo.ageGroup}
            </p>
            <p className="movie-short-description">
              {this.state.movieInfo.shortDescription}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default MovieDetail;

// async () => {
//    const movieResponse = await basePath({
//       method: 'get',
//       url: '/movies',
//       data: this.props.movieID
//    });
//    console.log(movieResponse);
//    if (movieResponse.status === 200) {
//       this.setState({ movieInfo: movieResponse.data })
//    }
// }
