import React from 'react';
import axios from 'axios';

class MovieList extends React.Component {

    state = {
        images: []
    }

    componentDidMount() {
            axios.get(`http://localhost:3000/api/movies/?size=compact&limit=10`)
                .then(res => {
                    console.log(res);
                    const photoSmall = res.data[0].imageSmall;
                    this.setState({
                        images: photoSmall
                    });
                    console.log(photoSmall);
                });
            }

    render() {
        return (
            <div className="movieList">
                <div className="movieList_release">
                    <div>Release</div>
                </div>
                <div className="movieList_today">
                    <div>Today</div>
                </div>
                <img src = {this.state.images} alt = "movie poster"/>
            </div>
        );
    }
}

export default MovieList;