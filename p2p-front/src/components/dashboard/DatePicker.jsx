import React from 'react';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(2019, 7, 1),
            endDate: new Date(2019, 7, 17),
        };
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
    }

    handleStartChange(date) {
        this.setState({ startDate: date });
    }

    handleEndChange(date) {
        this.setState({ endDate: date });
    }

    render() {
        return (
            <div>
                <ReactDatePicker
                    selected={this.state.startDate}
                    dateFormat='dd/MM/yyyy'
                    onChange={this.handleStartChange}
                />
                <div>
                    Zoom
                </div>
                <ReactDatePicker
                    selected={this.state.endDate}
                    dateFormat='dd/MM/yyyy'
                    onChange={this.handleEndChange}
                    minDate={this.state.startDate}
                />
            </div>
        );
    }
}
