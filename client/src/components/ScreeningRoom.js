import React from 'react';
import axios from 'axios';
import { Button, Container, Header, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import moment from 'moment';
import Rows from "./Rows";
import ScreeningRoomSubmit from "./ScreeningRoomSubmit";
import "./ScreeningRoom.css";

class ScreeningRoom extends React.Component {
	constructor(props) {
        super(props);
        
        this.seatElement = React.createRef();
		
		this.state = {
			id: this.props.screeningId,
			screeningRoomId: "",
			movieId: "",
			date: "",
			movieTitle: "",
			seats: [],
			selectedSeats: []
		}
		
        this.selectSeat = this.selectSeat.bind(this);
        this.resetSeats = this.resetSeats.bind(this);
	}
    
    resetSeats(seats) {
        this.setState({seats: seats});
        this.seatElement.current.setState({seats: seats})
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/api/screenings/${this.state.id}`)
            .then(res => {
                this.setState({
                    id: res.data._id,
                    screeningRoomId: res.data.screeningRoomId,
                    movieId: res.data.movieId,
                    date: moment(res.data.date).format('MMMM Do YYYY, h:mm:ss').toString(),
                    seats: res.data.seats
                }
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
	
	selectSeat(row, seat) {
		const seats = this.state.selectedSeats;
        let index = seats.findIndex(item => {
            return item.toString() === [row, seat].toString()});
        if (index !== -1) seats.splice(index, 1);
        else seats.push([row, seat]);
		
		this.setState({
			selectedSeats: seats
		});
		
        console.log(this.state.selectedSeats)
	}

    render() {
        console.log(this.seatElement.current)
        return (
            <Modal trigger={<Button onClick={() => {this.setState({selectedSeats: []})}}>What's on:</Button>} closeIcon>
                <Header as='h2' textAlign='center'>
                    {this.state.movieTitle}
                    <Header.Subheader>{this.state.date}</Header.Subheader>
                </Header>
                <Modal.Content>
                <Container text className="screeningRoom">
                    <Rows seats={this.state.seats} selectSeat={this.selectSeat} ref={this.seatElement} ></Rows>
					<ScreeningRoomSubmit 
                        screeningId={this.state.id} 
                        selectedSeats={this.state.selectedSeats} 
                        resetSeats={this.resetSeats}
                    />
                </Container>
                </Modal.Content>
            </Modal>
        );
    }

}

export default ScreeningRoom;