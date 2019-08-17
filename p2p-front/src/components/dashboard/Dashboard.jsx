import React from 'react';

import { request } from '../../lib/http';

import DatePicker from './DatePicker';
import Offload from './Offload';
import Viewers from './Viewers';

import './Dashboard.css';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        const from = new Date(2019, 7, 1).getTime();
        const to = new Date(2019, 7, 17).getTime();
        this.state = {
            from,
            to,
            maxCdn: 0,
            maxP2p: 0,
            cdn: [],
            p2p: [],
            audience: [],
        };
        this.OnDateChange = this.OnDateChange.bind(this);
    }

    async UNSAFE_componentWillMount() {
        await this.getData();
    }

    async getData() {
        const session_token = localStorage.getItem('session_token');
        const { from, to } = this.state;
        const { data: { cdn, p2p } } = await request('POST', '/bandwidth', { session_token, from, to });
        const { data: { cdn: maxCdn, p2p: maxP2p } } = await request('POST', '/bandwidth', {
            session_token,
            from,
            to,
            aggregate: 'max',
        });

        const { data: { audience } } = await request('POST', '/audience', { session_token, from, to });
        const cdnPoints = cdn.map((point) => {
            const [x, y] = point;
            return { x, y };
        });

        const p2pPoints = p2p.map((point) => {
            const [x, y] = point;
            return { x, y };
        });

        const audiencePoints = audience.map((point) => {
            const [x, y] = point;
            return { x, y };
        });

        this.setState({
            cdn: cdnPoints,
            maxCdn,
            maxP2p,
            p2p: p2pPoints,
            audience: audiencePoints,
        });
    }

    // Date: timestamp, type: 'start' | 'end
    async OnDateChange(date, type) {
        if (type === 'start') {
            this.setState({
                from: date,
            });
        }
        if (type === 'end') {
            this.setState({
                to: date,
            });
        }
        await this.getData();
    }

    render() {
        const {
            from,
            to,
            cdn,
            p2p,
            audience,
            maxCdn,
            maxP2p,
        } = this.state;

        return (
            <div className='container'>
                <h2>Dashboard</h2>
                <article>
                    <Offload
                        from={from}
                        to={to}
                        cdn={cdn}
                        p2p={p2p}
                        maxCdn={maxCdn}
                        maxP2p={maxP2p}
                    />
                </article>
                <article>
                    <Viewers
                        from={from}
                        to={to}
                        audience={audience}
                    />
                </article>
                <article>
                    <DatePicker
                        from={from}
                        to={to}
                        onDateChange={this.OnDateChange}
                    />
                </article>
            </div>
        );
    }
}
