import React from 'react';
import axios from 'axios';
import { Button, Container, Header, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import moment from 'moment';

class ScreeningRoom extends React.Component {
    state = {
        id: "",
        screeningRoomId: "",
        movieId: "",
        date: "",
        movieTitle: "",
        seats: []
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/screenings/5cd6d2921d7bb41d608f5c0a`)
            .then(res => {
                this.setState({
                    id: res.data._id,
                    screeningRoomId: res.data.screeningRoomId,
                    movieId: res.data.movieId,
                    date: moment(res.data.date).format('MMMM Do YYYY, h:mm:ss').toString(),
                    seats: res.data.seats }
                )})
            .then( () => {
                axios.get(`http://localhost:3000/api/movies/${this.state.movieId}`)
                    .then(movie => {
                        this.setState({
                            movieTitle: movie.data.title
                        })
                    })
            })
    }

    render() {
        return (
            <Modal trigger={<Button>What's on:</Button>} closeIcon>
                <Header as='h2' textAlign='center'>
                    {this.state.movieTitle}
                    <Header.Subheader>{this.state.date}</Header.Subheader>
                </Header>
                <Modal.Content>
                <Container text>
                    
                </Container>
                </Modal.Content>
            </Modal>
        );
    }

}

export default ScreeningRoom;