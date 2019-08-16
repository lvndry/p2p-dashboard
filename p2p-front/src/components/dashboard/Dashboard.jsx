import React from 'react';
import { Line } from 'react-chartjs-2';

import { request } from '../../lib/http';
import { getDates } from '../../lib/date';

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
        const resp = await request('POST', '/bandwidth', { session_token, from, to })
        console.log(resp);
        const { data } = resp;
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
        console.log(this.state.cdn, this.state.p2p);
    }

    render() {
        const labels = getDates(new Date(this.state.from), new Date(this.state.to))
        console.log(labels);
        
        const data = {
            labels,
            datasets: [
                {
                    label: 'CDN',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.cdn
                },
                {
                    label: 'P2P',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(163,29,45,0.4)',
                    borderColor: 'rgba(117,20 31,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(117,20,31,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(117,20,31,1)',
                    pointHoverBorderColor: 'rgba(89,75,77,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.p2p
                }
            ]
        };

        const options = {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'day',
                    }
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        };

        return (
            <div>
                <h2>Dashboard</h2>
                <Line
                    data={data}
                    options={options}
                />
            </div>
        );
    }
} 
