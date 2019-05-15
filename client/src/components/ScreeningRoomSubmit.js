import React from 'react';
import { Button, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import basePath from '../api/basePath';
import { set } from 'mongoose';


class ScreeningRoomSubmit extends React.Component {
    state = { success: '', open: true }

    close = () => this.setState({ open: false })

    postReservation = async () => {

        const reservationResponse = await basePath({
            method: 'put',
            url: '/api/screenings/'+this.props.screeningId,
            data: {
                selectedSeats: this.props.selectedSeats,
                isOccupied: true
            },
            withCredentials: true
        });

        this.props.resetSeats(reservationResponse.data.seats)
        if (reservationResponse.status === 200) {
            this.setState({ success: true })
        } else {
            this.setState({ success: false})
        }
        }
    
    confirmation() {
        if (this.state.success === true) {
        return (
            <>
            <Modal size={'tiny'} open={this.state.open} onClose={this.close}>
          <Modal.Header>Reservation successful!</Modal.Header>
          <Modal.Content>
            <p>Thank you for using our website.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive icon='checkmark' labelPosition='right' content='OK' onClick={this.close}/>
          </Modal.Actions>
        </Modal>
        </>
        )
        } else if (this.state.success === false) {
            return (
            <>
            <Modal size={'tiny'} open={this.state.open} onClose={this.close}>
          <Modal.Header>Reservation successful!</Modal.Header>
          <Modal.Content>
            <p>Thank you for using our website.</p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive icon='checkmark' labelPosition='right' content='OK' onClick={this.close}/>
          </Modal.Actions>
        </Modal>
        </>
        )
        }
    }
        
    render() {
        return (
        <>
            <Button onClick={this.postReservation} fluid size='large'>Make reservation</Button>
            <div>{this.confirmation()}</div>
        </>
        )
    }

}
export default ScreeningRoomSubmit;


