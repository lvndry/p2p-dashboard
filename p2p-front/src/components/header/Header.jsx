import React from 'react';
import { withRouter } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import { request } from '../../lib/http';

async function onLogout() {
    await request('POST', '/logout', { session_token: localStorage.getItem('session_token') });
    localStorage.removeItem('session_token');
}

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        const LogoutButton = localStorage.getItem('session_token')
            ? <Button onClick={onLogout}>Logout</Button> : null;
        return (
           <div>
               <Button href='/login'>
                   Login
               </Button>
               {LogoutButton}
           </div>
        );
    }
}
