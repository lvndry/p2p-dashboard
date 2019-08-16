import React from 'react';
import { Line } from 'react-chartjs-2';

import { getDates } from '../../lib/date';
import { formatBytes } from '../../lib/math';

export default function Offload(props) {
    const labels = getDates(new Date(props.from), new Date(props.to))
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
                data: props.cdn
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
                data: props.p2p
            }
        ]
    };

    const options = {
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    const label = data.datasets[tooltipItem.datasetIndex].label || '';
                    return `${label}: ${formatBytes(tooltipItem.value)}`;                       
                }
            }
        },
        title: {
            display: true,
            text: 'Capacity offload',
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day',
                }
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    callback: function(value, index) {
                        return formatBytes(value)
                    }
                }
            }]
        }
    };

    return (
        <div>
            <Line
                data={data}
                options={options}
            />
        </div>
    );
}
