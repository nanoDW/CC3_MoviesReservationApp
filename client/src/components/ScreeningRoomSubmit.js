import React from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import basePath from '../api/basePath';


class ScreeningRoomSubmit extends React.Component {
    state = { loggedIn: false, email: '', password: '' };

    onSubmit = async (email, password) => {
        const loginResponse = await basePath({
            method: 'post',
            url: '/login',
            data: {
                email: email,
                password: password
            }
        });
        console.log(loginResponse);
        if (loginResponse.status === 200) {
            console.log('Logged in successfully')
            this.setState({ loggedIn: true })
        }
    }
    
    postReservation = (e) => {
        e.preventDefault();
        this.onSubmit(this.state.email, this.state.password);
    };

    render() {
        return <Button onClick={this.postReservation} fluid size='large'>Make reservation</Button>
    }
}

export default ScreeningRoomSubmit;


