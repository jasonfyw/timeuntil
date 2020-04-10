import React, { Component } from 'react';
import IosAddCircleOutline from 'react-ionicons/lib/IosAddCircleOutline';

import Countdown from './Countdown';
import Clock from './Clock';
import AddCountdown from './AddCountdown';

import './OverlayNav.css';  



class OverlayNav extends Component {
    state = {
        showNewCountdown: false
    }

    handleClose = (e) => {
        e.preventDefault();
        this.props.hideOverlay();
    }

    showCountdown = () => {
        this.setState({ showNewCountdown: true })
    }
    hideNewCountdown = () => {
        this.setState({ showNewCountdown: false })
    }

    addCountdown = (date, label) => {
        this.props.addCountdown(date, label);
    }

    render() {
        let overlayClass = this.props.overlayClass;
        let dates = this.props.countdownDates;
        let addCountdownOverlayClass = this.state.showNewCountdown ? 'show-addcountdown' : 'hide-addcountdown';

        const countdownComponents = [];
        
        // Parses each date entry and creates a new countdown instance
        for (let i = 0; i < dates.length; i++) {
            let countdownInstance = <Countdown date={dates[i][0]} label={dates[i][1]}></Countdown>
            countdownComponents.push(
                <div className="overlay-countdown-wrapper" onClick={(e) => this.props.selectCountdown([dates[i][0], dates[i][1]], e)}>
                    {countdownInstance}
                </div>
            );
        }



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
                    <div className="overlay-add-countdown">
                        <div className="add-countdown-wrapper">
                            <IosAddCircleOutline fontSize="2rem" color="#fff" onClick={this.showCountdown} />
                        </div>
                    </div>
                </div>

                <AddCountdown 
                    overlayClass={addCountdownOverlayClass} 
                    hideOverlay={this.hideNewCountdown}
                    addCountdown={this.addCountdown}
                />
            </div>
        );
    }
}

export default OverlayNav;
