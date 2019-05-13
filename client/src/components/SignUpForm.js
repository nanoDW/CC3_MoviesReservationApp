import React from 'react';
import { Button, Form, Container, Header, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import basePath from '../api/basePath';



class SignUpForm extends React.Component {
    state = { loggedIn: false, email: '', password: '', name: '', surname: '', phone: ''};

    onSubmit = async (email, password, name, surname, phone) => {
        const signUpResponse = await basePath({
            method: 'post',
            url: '/register',
            data: {
                email: email,
                password: password,
                name: name,
                surname: surname,
                phone: phone
            }
        });
        console.log(signUpResponse);
        if (signUpResponse.status === 201) {
            console.log('User registered')
            this.setState({ loggedIn: true })
            this.props.handleClose();
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
                    <Form size='large' onSubmit={this.onFormSubmit}>
                        <Form.Field required>
                            <label>Name</label>
                            <input placeholder='Name' value={this.state.name} onChange={ (e) => this.setState({ name: e.target.value })} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Surname</label>
                            <input placeholder='Surname' value={this.state.surname} onChange={ (e) => this.setState({ surname: e.target.value })} />
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


