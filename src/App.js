import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Countdown from './components/Countdown';
import Background from './components/Background';
import Clock from './components/Clock';
import OverlayNav from './components/OverlayNav';

class App extends Component {
    state = {
        showOverlay: false,
        mainDisplay: <Clock></Clock>,
        dates: {
            "25 December 2020": "Christmas 2020",
            "1 January 2021": "New Year"
        }
    }

    showOverlay = () => {
        this.setState({showOverlay: true});
    }
    hideOverlay = () => {
        this.setState({showOverlay: false});
    }

    selectCountdown = (countdownInstance, e) => {
        this.setState({mainDisplay: countdownInstance});
        // localStorage.setItem('mainDisplay', JSON.stringify(countdownInstance));
        // this.setState({ mainDisplay: JSON.parse(localStorage.getItem('mainDisplay'))});

        this.hideOverlay();
    }
    // componentDidMount() {
    //     this.setState({mainDisplay: JSON.parse(localStorage.getItem('mainDisplay'))});
    // }



    render() {

        let overlayClass = this.state.showOverlay ? "show-overlay" : "hide-overlay";

        let mainDisplay = this.state.mainDisplay;

        return (
            <div className="app">

                <Background></Background>

                <div className="main-display">
                    {mainDisplay}
                </div>



                <OverlayNav 
                    overlayClass={overlayClass} 
                    hideOverlay={this.hideOverlay} 
                    countdownDates={this.state.dates}
                    selectCountdown={this.selectCountdown}
                />

                <a href="javascript:void(0)" onClick={this.showOverlay} className="overlay-open">Click me!</a>

            </div>
        );
    }
}

export default App;