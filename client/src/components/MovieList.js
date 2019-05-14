import React from 'react';
import axios from 'axios';
import './MovieList.css'


class MovieList extends React.Component {

    state = {
        movie_info: [],
    }
    
    componentDidMount() {
            axios.get(`http://localhost:3000/api/movies/?size=compact&limit=10`)
                .then(res => {
                    console.log(res);
                    this.setState({
                        movie_info: res.data
                    });
                    console.log(res.data);
                });
            }
            
    render() {
        var {movie_info} = this.state;
        return (
            <div className="movieList">
                <div className="movieList_release">
                    <div>Release</div>
                </div>
                <div className = "movieList_movieImage">
                    {movie_info.map(item => (
                        <div key={movie_info.genre}>
                            <img className = "movieList_imagesmall" src = {item.imageSmall} alt = "movieList_movie poster"/>
                            <p>{item.title}</p>
                        </div>
                    ))};
                </div>
                <div className="movieList_today">
                    <div>Today</div>
                </div>
            </div>
        );
    }
}

export default MovieList;
