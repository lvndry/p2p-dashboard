import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

import { getDates } from '../../lib/date';
import { formatBytes } from '../../lib/math';

export default function Offload({
    cdn,
    p2p,
    maxCdn,
    maxP2p,
    from,
    to,
}) {
    if (!p2p || !cdn) {
        return null;
    }

    const labels = getDates(new Date(from), new Date(to));
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
                data: cdn,
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
                data: p2p,
            },
        ],
    };

    const options = {
        responsive: true,
        tooltips: {
            callbacks: {
                label: (tooltipItem, info) => {
                    const label = info.datasets[tooltipItem.datasetIndex].label || '';
                    return `${label}: ${formatBytes(tooltipItem.value)}`;
                },
            },
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
                },
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    callback: (value) => formatBytes(value),
                },
            }],
        },
        annotation: {
            annotations: [{
                drawTime: 'afterDatasetsDraw',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: maxP2p,
                borderColor: 'rgba(163,29,45,0.4)',
                borderWidth: 4,
                borderDash: [8, 2],
                label: {
                    content: `Maximum throughput  ${formatBytes(maxP2p)}`,
                    enabled: true,
                },
            }, {
                drawTime: 'afterDatasetsDraw',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                borderColor: 'rgba(25, 94, 52, 0.4)',
                value: maxCdn,
                borderWidth: 4,
                borderDash: [8, 2],
                label: {
                    content: `Maximum CDN: ${formatBytes(maxCdn)}`,
                    enabled: true,
                },
            }],
        },
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
