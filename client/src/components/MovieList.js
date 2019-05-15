import React from 'react';
import axios from 'axios';
import "semantic-ui-css/semantic.min.css";
import './MovieList.css';
import Movie from './Movie.js';
import basePath from '../api/basePath';



class MovieList extends React.Component {

    state = { movie_info: [],
            movie_info2: [],
    };
    
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
           basePath({
               method: "get",
               url: `api/movies/?size=compact&limit=12`
           })
            .then(res => {
                const movies1 = res.data.slice(0, 6)
                const movies2 = res.data.slice(6, 12)
                this.setState({
                    movie_info: movies1,
                    movie_info2: movies2
                });
            });
        });
    }

    render() {
        return(
            <div className="movieList">
                <div className="movieList_release">
                    <img className="movieList_icon" src="../assets/img/star.svg" alt="icon - star" />
                    <div className="movieList_release_text"> Release </div>
                    <img className="movieList_icon" src="../assets/img/star.svg" alt="icon - star" />
                </div>
                <Movie setMovieId={this.props.setMovieId} movieinfo = {this.state.movie_info}/>
                <div className="movieList_today">
                    <div>Today</div>
                </div>
                <Movie setMovieId={this.props.setMovieId} movieinfo = {this.state.movie_info2}/>
            </div>   
        );
    }
}

export default MovieList;
