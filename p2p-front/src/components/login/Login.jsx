import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import users from '../../mocks/users';
import { request } from '../../lib/http';

class Login extends React.Component {

    constructor(props) {
        super(props);
        const [swagtv] = users;
        this.state = {
            identifiant: swagtv.identifiant,
            password: swagtv.password,
            session_token: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const session_token = localStorage.getItem('session_token');
        this.setState({ session_token });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { identifiant, password } = this.state;
        console.log(identifiant, password);
        const { data } = await request('POST', '/auth', { identifiant, password });
        localStorage.setItem('session_token', data.session_token);
        this.props.history.push('/dashboard')
    };

    render() {
        if (this.state.session_token) {
            this.props.history.push('/dashboard')
        }
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type='text'
                            value={this.state.identifiant}
                            onChange={() => {}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='text'
                            value={this.state.password}
                            onChange={() => {}}
                            disabled
                        />
                    </Form.Group>
                    <Button
                    type='submit'
                    variant='primary'
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(Login);
