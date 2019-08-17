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
            values: [25, 75],
        };
    }

    render() {
        return (
            <Row>
              <Col>
                <ReactDatePicker
                      selected={this.props.from}
                      dateFormat='dd MMMM yyyy'
                      onChange={this.handleStartChange}
                      dropdownMode='select'
                      style={{ BackgroundCOlor: 'blue' }}
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
                    step={0.1}
                    min={0}
                    max={100}
                    onChange={(values) => {
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
                              min: 0,
                              max: 100,
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
                  <output style={{ marginTop: '30px' }} id="output">
                      {`${this.state.values[0].toFixed(1)} - ${this.state.values[1].toFixed(1)}`}
                  </output>
                </div>
              </Col>
              <Col>
                <ReactDatePicker
                  style={{ backgroundColor: 'blue' }}
                  className='datepicker center'
                  selected={this.props.to}
                  dateFormat='d MMMM yyyy'
                  onChange={this.handleEndChange}
                  minDate={this.props.from}
                  dropdownMode='select'
                />
              </Col>
            </Row>
        );
    }
}
