import React from 'react';
import { Button, Form, Container, Header, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import basePath from '../api/basePath';
import "./LoginForm.css";


class LoginForm extends React.Component {
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
    
    onFormSubmit = (event) => {
        event.preventDefault();
        this.onSubmit(this.state.email, this.state.password);
    };

    render() {
        return (
            <Modal trigger={<Button>Login</Button>} closeIcon>
                <Header as='h2' textAlign='center'>
                    Log in
                    <Header.Subheader>Only logged in users can make reservations</Header.Subheader>
                </Header>
                <Modal.Content>
                <Container text>
                    <Form size='large' onSubmit={this.onFormSubmit}>
                        <Form.Field required>
                            <label>Email</label>
                            <input placeholder='Email' value={this.state.email} onChange={ (e) => this.setState({ email: e.target.value })} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Password</label>
                            <input placeholder='Password' value={this.state.password} onChange={ (e) => this.setState({ password: e.target.value })} />
                        </Form.Field>
                        <Button type='submit' fluid size='large'>Sign in</Button>
                    </Form>
                    <Header as='h3' textAlign='center'>Don't have an account yet?</Header>
                    <Button type='submit' fluid size='large' style={{ marginBottom: '3%' }}>Sign up</Button>
                </Container>
                </Modal.Content>
            </Modal>
        )
    }
}

export default LoginForm;

