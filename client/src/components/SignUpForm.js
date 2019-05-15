import React from 'react';
import { Button, Form, Container, Header, Modal, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import basePath from '../api/basePath';


class SignUpForm extends React.Component {
    
    state = { email: '', password: '', name: '', surname: '', phone: '', error: ''};

    onSubmit = (email, password, name, surname, phone) => {
        basePath({
            method: 'post',
            url: '/register',
            data: {
                email: email,
                password: password,
                name: name,
                surname: surname,
                phone: phone
            },
            withCredentials: true
        }).then(response => {
            if (response.status === 201) {
                console.log('User registered')
                this.props.handleLogin();
                this.props.handleClose();
                this.props.setUser(response.data);
            }
        }).catch(error => {
            this.setState({ error: error.response.data })
        }); 
    }

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
    
    onFormSubmit = (event) => {
        event.preventDefault();
        this.onSubmit(this.state.email, this.state.password, this.state.name, this.state.surname, this.state.phone);
    };

    render() {
        return (
            <>
                <Header as='h2' textAlign='center'>
                    Sign Up
                    <Header.Subheader>Create an account</Header.Subheader>
                </Header>
                <Modal.Content>
                <Container text>
                    <Form size='large' onSubmit={this.onFormSubmit} error>
                        <div>{this.error()}</div>
                        <Form.Field required>
                            <label>Name</label>
                            <input placeholder='Name' value={this.state.name} onChange={ (e) => this.setState({ name: e.target.value })} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Surname</label>
                            <Form.Input placeholder='Surname' value={this.state.surname} onChange={ (e) => this.setState({ surname: e.target.value })} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Email</label>
                            <input placeholder='Email' value={this.state.email} onChange={ (e) => this.setState({ email: e.target.value })} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Phone</label>
                            <input placeholder='Phone' value={this.state.phone} onChange={ (e) => this.setState({ phone: e.target.value })} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Password</label>
                            <input placeholder='Password' value={this.state.password} onChange={ (e) => this.setState({ password: e.target.value })} style={{ marginBottom: '2%' }}/>
                        </Form.Field>
                        <Button type='submit' fluid size='large'>Sign up</Button>
                    </Form>
                </Container>
                </Modal.Content>
            </>
        )
    }
}

export default SignUpForm;


