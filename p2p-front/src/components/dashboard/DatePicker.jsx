import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import { Range, getTrackBackground } from 'react-range';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './DatePicker.css';

export default class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: [this.props.from, this.props.to],
        };
        this.onRangeChange = this.onRangeChange.bind(this);
    }

    onRangeChange(values) {
      if (values[0] !== this.state.values[0]) {
        this.props.onDateChange(values[0], 'start');
      } else if (values[1] !== this.state.values[1]) {
        this.props.onDateChange(values[1], 'end');
      }
    }

    render() {
      const MIN = new Date(2019, 7, 1).getTime();
      const MAX = new Date(2019, 7, 17).getTime();
      return (
        <Row>
            <Col>
              <ReactDatePicker
                    selected={this.props.from}
                    dateFormat='dd MMMM yyyy'
                    onChange={(date) => this.props.onDateChange(date.getTime(), 'start')}
                    dropdownMode='select'
              />
            </Col>
            <Col>
              <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  }}
              >
                <Range
                  values={this.state.values}
                  step={1000}
                  min={MIN}
                  max={MAX}
                  onChange={(values) => {
                    setTimeout(() => this.onRangeChange(values), 1000);
                    this.setState({ values });
                  }}
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      role='slider'
                      style={{
                        ...props.style,
                        height: '36px',
                        display: 'flex',
                        width: '100%',
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: '5px',
                          width: '100%',
                          borderRadius: '4px',
                          background: getTrackBackground({
                            values: this.state.values,
                            colors: ['#ccc', '#548BF4', '#ccc'],
                            min: MIN,
                            max: MAX,
                          }),
                          alignSelf: 'center',
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ props, isDragged }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '42px',
                        width: '42px',
                        borderRadius: '4px',
                        backgroundColor: '#FFF',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 2px 6px #AAA',
                      }}
                    >
                      <div
                        style={{
                          height: '16px',
                          width: '5px',
                          backgroundColor: isDragged ? '#548BF4' : '#CCC',
                        }}
                      />
                    </div>
                  )}
                />
              </div>
            </Col>
            <Col>
              <ReactDatePicker
                style={{ backgroundColor: 'blue' }}
                className='datepicker center'
                selected={this.props.to}
                dateFormat='d MMMM yyyy'
                onChange={(date) => this.props.onDateChange(date.getTime(), 'end')}
                minDate={this.props.from}
                dropdownMode='select'
              />
            </Col>
        </Row>
      );
    }
}
