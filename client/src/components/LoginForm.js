import React from 'react';
import { Button, Form, Container, Header, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import basePath from '../api/basePath';


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
            <Modal trigger={<Button>Login</Button>}>
                <Header as='h2' textAlign='center'>Log in</Header>
                <Modal.Content>
                <Container text>
                    <Form onSubmit={this.onFormSubmit}>
                        <Form.Field required>
                            <label>Email</label>
                            <input placeholder='Email' value={this.state.email} onChange={ (e) => this.setState({ email: e.target.value })} />
                        </Form.Field>
                        <Form.Field required>
                            <label>Password</label>
                            <input placeholder='Password' value={this.state.password} onChange={ (e) => this.setState({ password: e.target.value })} />
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                    </Container>
                </Modal.Content>
            </Modal>
        )
    }
}

export default LoginForm;


