import React, { Component } from 'react';
import Countdown from './Countdown';
import Clock from './Clock';
import './OverlayNav.css';  

class OverlayNav extends Component {

    handleClose = (e) => {
        e.preventDefault();
        this.props.hideOverlay();
    }

    render() {
        let overlayClass = this.props.overlayClass;
        let dates = this.props.countdownDates;

        const countdownComponents = [];
        
        // Parses each date entry and creates a new countdown instance
        // ! PROBABLY BROKEN FOR DUPLICATE DATES

        Object.keys(dates).forEach(date => {
            let countdownInstance = <Countdown date={date} label={dates[date]}></Countdown>
            countdownComponents.push(
                <div className="overlay-countdown-wrapper" onClick={(e) => this.props.selectCountdown([date, dates[date]], e)}>
                    {countdownInstance}
                </div>
            );
        })



        return (
            <div id="overlay-nav" className={overlayClass}>
                <div className="overlay-header">
                    {/* eslint-disable-next-line */}
                    <a href="javascript:void(0)" onClick={this.handleClose}>Close</a>
                </div>
                <div className="overlay-content">
                    <div className="overlay-clock-wrapper" onClick={(e) => this.props.selectCountdown('clock', e)}>
                        <Clock/>
                    </div>
                    {countdownComponents}
                </div>
            </div>
        );
    }
}

export default OverlayNav;
