import React from 'react';
import axios from 'axios';
import './MovieList.css';

class ScreeningRoom extends React.Component {
    state = {
        screeningRoom: []
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/screenings/5cd6d2921d7bb41d608f5c0a`)
            .then(res => {
                console.log(res)
            });
    }

    render() {
        return (
            <div>
                :(
            </div>
        );
    }

}

export default ScreeningRoom;