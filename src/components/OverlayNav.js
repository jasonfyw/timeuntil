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
        
        Object.keys(dates).forEach(date => {
            let countdownInstance = <Countdown date={date} label={dates[date]}></Countdown>
            countdownComponents.push(
                <div className="overlay-countdown-wrapper" onClick={(e) => this.props.selectCountdown(countdownInstance, e)}>
                    {countdownInstance}
                </div>
            );
        })



        return (
            <div id="overlay-nav" className={overlayClass}>
                <div className="overlay-header">
                    <a href="javascript:void(0)" onClick={this.handleClose}>Close</a>
                </div>
                <div className="overlay-content">
                    <div className="overlay-clock-wrapper" onClick={(e) => this.props.selectCountdown(<Clock/>, e)}>
                        <Clock/>
                    </div>
                    {countdownComponents}
                </div>
            </div>
        );
    }
}

export default OverlayNav;
