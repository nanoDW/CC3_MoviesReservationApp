import React from 'react';
import axios from 'axios';
import basePath from '../api/basePath';
import { Button, Container, Header, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import moment from 'moment';
import Rows from "./Rows";
import ScreeningRoomSubmit from "./ScreeningRoomSubmit";
import "./ScreeningRoom.css";
import LoginForm from "./LoginForm";

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
        this.handleLogin = this.handleLogin.bind(this);
		this.handleLoginClose = this.handleLoginClose.bind(this);
		
	}
    
    resetSeats(seats) {
        this.setState({seats: seats});
        this.seatElement.current.setState({seats: seats})
    }

    componentDidMount() {
        this.getScreening()
        console.log(this.seatElement)
            
    }
        
    handleLogin = () => {
    this.props.handleLogin();
    }
	
	handleLoginClose = () => this.setState({ loginModalOpen: false });

    ifLogged() {
        if (this.props.loggedIn) {
            return (
                <>
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
                </>
            )
        } else {
            return (
                <LoginForm handleLogin={this.handleLogin} handleClose={this.handleLoginClose}/> 
            )
        }
    }
    render() {
        return (
        <Modal trigger={<Button onClick={() => {
				this.setState({selectedSeats: []}); 
				this.getScreening()
				}}>What's on:</Button>} closeIcon>
            <div>{this.ifLogged()}</div>
        </Modal>
        )}

    getScreening = async () => {

        const reservationResponse = await basePath({
                method: 'get',
                url: `/api/screenings/${this.state.id}`,
                withCredentials: true
            }).then(res => {
                this.setState({
                    id: res.data._id,
                    screeningRoomId: res.data.screeningRoomId,
                    movieId: res.data.movieId,
                    date: moment(res.data.date).format('MMMM Do YYYY, h:mm:ss').toString(),
                    seats: res.data.seats
                })
            })
            .then(() => {
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
            return item.toString() === [row, seat].toString()
        });
        if (index !== -1) seats.splice(index, 1);
        else seats.push([row, seat]);

        this.setState({
            selectedSeats: seats
        });

    }

}

export default ScreeningRoom;