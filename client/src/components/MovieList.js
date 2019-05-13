import React from 'react';
import axios from 'axios';
import './MovieList.css'


class MovieList extends React.Component {

    state = {
        items: [],
        title: ""
    }
    
    componentDidMount() {
            axios.get(`http://localhost:3000/api/movies/?size=compact&limit=10`)
                .then(res => {
                    console.log(res);
                    this.setState({
                        items: res.data
                    });
                    console.log(res.data);
                });
            }
            
    render() {
        var {items} = this.state;
        return (
            <div className="movieList">
                <div className="movieList_release">
                    <div>Release</div>
                </div>
                <div>
                    {items.map(item => (
                        <div key={items.genre}>
                            <img src = {item.imageSmall} alt = "movie poster"/>
                            {item.title}
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

/*<ul>
                    {items.map(item => (
                        <li key={items.genre}>
                            <img src = {item.imageSmall} alt = "movie poster"/>
                            {item.title}
                        </li>
                    ))};
                </ul>*/