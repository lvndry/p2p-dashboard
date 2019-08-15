import React from 'react';
import { Button } from 'react-bootstrap';
import { request } from '../../lib/http';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
        }
        this.onLogout = this.onLogout.bind(this);
    }

    async onLogout() {
        await request('POST', '/logout', { session_token: localStorage.getItem('session_token') })
        localStorage.removeItem('session_token')
        this.props.history.push('/login')
    }

    render() {
        const LogoutButton = localStorage.getItem('session_token')
            ? <Button onClick={this.onLogout}>Logout</Button> : null;
        return (
           <div>
               <Button href='/login'>
                   Login
               </Button>
               {LogoutButton}
           </div> 
        )
    }
}
