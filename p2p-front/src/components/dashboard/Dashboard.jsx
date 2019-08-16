import React from 'react';

import { request } from '../../lib/http';
import Offload from './Offload';
import Viewers from './Viewers';

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
            audidence: []
        }
    }

    async UNSAFE_componentWillMount() {
        const session_token = localStorage.getItem('session_token');
        const { from, to } = this.state;
        const { data: { cdn, p2p } } = await request('POST', '/bandwidth', { session_token, from, to })
        const { data: { audience } } = await request('POST', '/audience', { session_token, from, to });
        const cdnPoints = cdn.map((point, index) => {
            const [x ,y] = point;
            return { x, y };
        });
        const p2pPoints = p2p.map((point, index) => {
            const [x ,y] = point;
            return { x, y };
        });
        const audiencePoints = audience.map(point => {
            const [x,y] = point;
            return { x, y };
        })
        this.setState({
            cdn: cdnPoints,
            p2p: p2pPoints,
            audience: audiencePoints,
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
                <Viewers
                    from={this.state.from}
                    to={this.state.to}
                    audience={this.state.audience}
                />
            </div>
        )
    }
} 
