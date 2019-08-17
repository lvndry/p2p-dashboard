import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';

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
            ? <Button className='nav-link alert-danger' href='#' onClick={this.onLogout}>Logout</Button> : null;
        return (
           <Row className='navbar navbar-expand'>
               <div className='nav-item'>
                {LogoutButton}
               </div>
           </Row>
        );
    }
}

export default withRouter(Header);
