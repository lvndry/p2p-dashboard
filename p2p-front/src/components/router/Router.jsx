import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from '../login/Login';
import Dashboard from '../dashboard/Dashboard';

export default function AppRouter() {
    return (
        <div>
            <Router>
                <Route exact path='/' component={Login} />
                <Route exact path='/login' component={Login} />
                <Route exact path ='/dashboard' component={Dashboard} />
            </Router>
        </div>
    )
}
