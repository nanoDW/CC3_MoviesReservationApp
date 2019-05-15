import React from 'react';
import axios from 'axios';
import "semantic-ui-css/semantic.min.css";
import './MovieList.css';
import Movie from './Movie.js';
import basePath from '../api/basePath';



class MovieList extends React.Component {

    state = { movie_info: [] };
    
    componentDidMount() {
    this.getMovieInfo();
    }

   getMovieInfo = async () => {
        const movieresponse = await basePath({
            method: "get",
            url: `/api/movies`,
            withCredentials: true
        })
        .then(() => {
           axios
           .get(`http://localhost:3000/api/movies/?size=compact&limit=12`)
                .then(res => {
                   this.setState({
                       movie_info: res.data
                   });
               });
        
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
