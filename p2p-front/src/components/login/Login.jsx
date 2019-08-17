import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import users from '../../mocks/users';
import { request } from '../../lib/http';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identifiant: users[0].identifiant,
            password: users[0].password,
            session_token: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const session_token = localStorage.getItem('session_token');
        this.setState({ session_token });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { identifiant, password } = this.state;
        const { data } = await request('POST', '/auth', { identifiant, password });
        localStorage.setItem('session_token', data.session_token);
        this.props.history.push('/dashboard');
    }

    handleChange(event) {
        const index = event.target.options.selectedIndex;
        this.setState({
            identifiant: users[index].identifiant,
            password: users[index].password,
        });
    }

    render() {
        if (this.state.session_token) {
            this.props.history.push('/dashboard');
        }
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            as='select'
                            value={this.state.identifiant}
                            onChange={this.handleChange}
                        >
                        {
                            users.map((user) => <option key={user.id}>{user.identifiant}</option>)
                        }
                        </Form.Control>
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
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}

export default withRouter(Login);
