import React from 'react';
import { withRouter } from 'react-router-dom';

import { Button } from 'react-bootstrap';
import { request } from '../../lib/http';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onLogout = this.onLogout.bind(this);
    }

    async onLogout() {
        await request('POST', '/logout', { session_token: localStorage.getItem('session_token') });
        localStorage.removeItem('session_token');
        this.props.history.push('/');
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
        );
    }
}

export default withRouter(Header);
