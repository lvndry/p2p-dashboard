import React from 'react';
import { Line } from 'react-chartjs-2';

import { getDates } from '../../lib/date';

export default class Viewers extends React.PureComponent {
    render() {
        if (!this.props.audience) {
            return null;
        }

        const labels = getDates(new Date(this.props.from), new Date(this.props.to));
        const data = {
            labels,
            datasets: [
                {
                    label: 'Audience',
                    fill: false,
                    lineTension: 0.1,
                    borderColor: 'rgba(222,11,36,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(222,11,36,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(222,11,36,1)',
                    pointHoverBorderColor: 'rgba(165,126,196,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.props.audience,
                },
            ],
        };

        const options = {
            title: {
                display: true,
                text: 'Capacity offload',
            },
            scales: {
                xAxes: [{
                    display: false,
                    type: 'time',
                    time: {
                        unit: 'day',
                    },
                }],
            },
        };

        return (
            <div>
                <Line data={data} options={options} />
            </div>
        );
    }
}
