import React from 'react';

import { request } from '../../lib/http';
import Offload from './Offload';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        const from = new Date(2019, 7, 1).getTime()
        const to = new Date(2019, 7, 17).getTime()
        this.state = {
            from,
            to,
            cdn: [],
            p2p: [],
        }
    }

    async UNSAFE_componentWillMount() {
        const session_token = localStorage.getItem('session_token');
        const { from, to } = this.state;
        const { data } = await request('POST', '/bandwidth', { session_token, from, to })
        const cdn = data.cdn.map((point, index) => {
            const [x ,y] = point
            return { x, y };
        });
        const p2p = data.p2p.map((point, index) => {
            const [x ,y] = point
            return { x, y };
        });
        this.setState({
            cdn,
            p2p,
        })
    }

    render() {
        return (
            <div>
                <h2>Dashboard</h2>
                <Offload
                    from={this.state.from}
                    to={this.state.to}
                    cdn={this.state.cdn}
                    p2p={this.state.p2p}
                />
            </div>
        )
    }
} 
