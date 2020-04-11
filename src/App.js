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
        dates: [
            ["25 December 2020", "Christmas 2020"],
            ["1 January 2021", "New Year"]
        ]
    }

    showOverlay = () => {
        this.setState({showOverlay: true});
    }
    hideOverlay = () => {
        this.setState({showOverlay: false});
    }
    convertDate = (shortDate) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let date = new Date(shortDate);
        date = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;

        return date;
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

    addCountdown = (date, label) => {
        let dates = [...this.state.dates, [this.convertDate(date), label]]
        this.setState({ dates: dates });
    }
    editCountdown = (index, date, label) => {
        let dates = this.state.dates;
        dates[index] = [this.convertDate(date), label];
        this.setState({ dates: dates })
    }
    deleteCountdown = (index) => {
        let dates = this.state.dates;
        dates.splice(index, 1);
        this.setState({ dates: dates })
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
                    addCountdown={this.addCountdown}
                    editCountdown={this.editCountdown}
                    deleteCountdown={this.deleteCountdown}
                />

                {/* eslint-disable-next-line */}
                <a href="javascript:void(0)" onClick={this.showOverlay} className="overlay-open">Click me!</a>

            </div>
        );
    }
}

export default withCookies(App);