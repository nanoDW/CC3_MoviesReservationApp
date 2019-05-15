import React from 'react';
import axios from 'axios';
import "semantic-ui-css/semantic.min.css";
import './MovieList.css';
import Movie from './Movie.js';



class MovieList extends React.Component {

    state = { movie_info: [] };
    
    componentDidMount() {
            axios.get(`http://localhost:3000/api/movies/?size=compact&limit=12`)
                .then(res => {
                    console.log(res);
                    this.setState({
                        movie_info: res.data
                    });
                    console.log(res.data);
                });
            }

    render() {
        return(
            <div className="movieList">
                <div className="movieList_release">
                    <div>Release</div>
                </div>
                <Movie setMovieId={this.props.setMovieId} movieinfo = {this.state.movie_info}/>
            </div>
        );
    }
}

export default MovieList;
