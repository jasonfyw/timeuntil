import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withCookies } from 'react-cookie';

import Background from './components/Background';
import Clock from './components/Clock';
import Countdown from './components/Countdown';
import OverlayNav from './components/OverlayNav';

class App extends Component {
    state = {
        showOverlay: false,
        mainDisplay: '',
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

    generateComponent = (componentData) => {
        if (!Array.isArray(componentData)) {
            return <Clock/>
        } else {
            return <Countdown date={componentData[0]} label={componentData[1]} />
        }
    }

    selectCountdown = (mainDisplayData, e) => {
        const { cookies } = this.props;
        cookies.set('mainDisplayData', mainDisplayData, { path: '/' })
        this.setState({mainDisplay: this.generateComponent(mainDisplayData) });

        this.hideOverlay();
    }

    componentDidMount() {
        const { cookies } = this.props;
        let mainDisplayData = cookies.get('mainDisplayData')
        this.setState({ mainDisplay: this.generateComponent(mainDisplayData) })
    }



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

                {/* eslint-disable-next-line */}
                <a href="javascript:void(0)" onClick={this.showOverlay} className="overlay-open">Click me!</a>

            </div>
        );
    }
}

export default withCookies(App);