import React from 'react';
import { Message, Button, Form, Container, Header, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import basePath from '../api/basePath';
import SignUpForm from "./SignUpForm";


class LoginForm extends React.Component {
    state = { email: '', password: '', error: '' };


    onSubmit = (email, password) => {
    
        basePath({
            method: 'post',
            url: '/login',
            data: {
                email: email,
                password: password
            },
            withCredentials: true
        }).then(response => {
            if (response.status === 200) {
                console.log('Logged in successfully')
                this.props.handleLogin();
                this.props.handleClose();
            }
        }).catch(error => {
            this.setState({ error: error.response.data })
            });
    }
    
    onFormSubmit = (event) => {
        event.preventDefault();
        this.onSubmit(this.state.email, this.state.password);
    };

    error() {
        console.log(this.state.error)
        if (this.state.error) {
            return (
                <Message error
                header = 'Error'
                content = {this.state.error} />
            )
        }
    }

    render() {
        return (
            <>
                <Header as='h2' textAlign='center'>
                    Log in
                    <Header.Subheader>Only logged in users can make reservations</Header.Subheader>
                </Header>
                <Modal.Content>
                <Container text>
                    <Form size='large' onSubmit={this.onFormSubmit} error>
                        <div>{this.error()}</div>
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
                    <Modal trigger={
                        <Button type='submit' fluid size='large' style={{ marginBottom: '3%' }}>Sign up</Button>
                    } closeIcon>
                        <SignUpForm />
                    </Modal>
                </Container>
                </Modal.Content>
            </>
        )
    }
}

export default LoginForm;


