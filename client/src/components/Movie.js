import React from 'react';
import "semantic-ui-css/semantic.min.css";
import './Movie.css'

const Movie = (props) => {
    const movies = props.movieinfo.map((info) => {
    return (
        <div>
            <div key={info._id} onClick = () => {this.props.setMovieId(info._id)}>
                <img className = "movie_imagesmall" src={info.imageSmall} alt = "movie poster"/>
                <div className = "movie_title">{info.title}</div>
            </div>
        </div>
    )
    });

    return (
        <div className = "movie_movieInfo"> {movies}</div>  
    ) 
};

export default Movie;