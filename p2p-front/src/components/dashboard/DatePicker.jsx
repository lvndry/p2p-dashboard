import React from 'react';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(2019, 7, 1),
            endDate: new Date(2019, 7, 17),
        };
    }

    render() {
        return (
            <div>
                <ReactDatePicker
                    selected={this.state.startDate}
                />
                <div>
                    Zoom
                </div>
                <ReactDatePicker
                    selected={this.state.endDate}
                />
            </div>
        );
    }
}
