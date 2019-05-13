import React from 'react';
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import basePath from '../api/basePath';


class ScreeningRoomSubmit extends React.Component {

    postReservation = async () => {

        const reservationResponse = await basePath({
            method: 'put',
            url: '/api/screenings/'+this.props.screeningId,
            data: {
                selectedSeats: this.props.selectedSeats,
                isOccupied: true,
                user: "5cd07475dd29be1754398730"//this.props.userId
            }
        });

        console.log(reservationResponse);
    }

    render() {
        return <Button onClick={this.postReservation} fluid size='large'>Make reservation</Button>
    }
}

export default ScreeningRoomSubmit;


