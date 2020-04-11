import React, { Component } from 'react';
import IosAddCircleOutline from 'react-ionicons/lib/IosAddCircleOutline';

import Clock from './Clock';
import AddCountdown from './AddCountdown';
import EditCountdown from './EditCountdown';
import OverlayCountdownItem from './OverlayCountdownItem';

import './OverlayNav.css';  



class OverlayNav extends Component {
    state = {
        showNewCountdown: false,
        showEditCountdown: false,
        indexToEdit: undefined,
        dateToEdit: undefined,
        labelToEdit: undefined
    }

    handleClose = (e) => {
        e.preventDefault();
        this.props.hideOverlay();
    }

    showNewCountdown = () => {
        this.setState({ showNewCountdown: true, showEditCountdown: false })
    }
    hideNewCountdown = () => {
        this.setState({ showNewCountdown: false })
    }
    showEditCountdown = (index, date, label) => {
        this.setState({ 
            showNewCountdown: false, 
            showEditCountdown: true,
            indexToEdit: index,
            dateToEdit: date,
            labelToEdit: label 
        })
    }
    hideEditCountdown = () => {
        this.setState({ 
            showEditCountdown: false,
            indexToEdit: undefined,
            dateToEdit: undefined,
            labelToEdit: undefined 
        })
    }

    addCountdown = (date, label) => {
        this.props.addCountdown(date, label);
    }
    editCountdown = (index, date, label) => {
        this.props.editCountdown(index, date, label);
        this.setState({
            indexToEdit: undefined,
            dateToEdit: undefined,
            labelToEdit: undefined
        })
    }
    deleteCountdown = (index) => {
        this.props.deleteCountdown(index);
        this.setState({
            indexToEdit: undefined,
            dateToEdit: undefined,
            labelToEdit: undefined
        })
    }

    render() {
        let overlayClass = this.props.overlayClass;
        let dates = this.props.countdownDates;
        let addCountdownOverlayClass = this.state.showNewCountdown ? 'show-addcountdown' : 'hide-addcountdown';

        let editCoundownOverlayClass = this.state.showEditCountdown ? 'show-editcountdown' : 'hide-editcountdown';
        let indexToEdit = this.state.indexToEdit;
        let dateToEdit = this.state.dateToEdit;
        let labelToEdit = this.state.labelToEdit;
        const countdownComponents = [];
        
        // Parses each date entry and creates a new countdown instance
        for (let i = 0; i < dates.length; i++) {
            let countdownInstance = <OverlayCountdownItem 
                date={dates[i][0]} 
                label={dates[i][1]} 
                index={i} 
                selectCountdown={this.props.selectCountdown} 
                editCountdown={this.showEditCountdown}
            />
            countdownComponents.push(countdownInstance);
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
                            <IosAddCircleOutline fontSize="2rem" color="#fff" onClick={this.showNewCountdown} />
                        </div>
                    </div>
                </div>

                <AddCountdown 
                    overlayClass={addCountdownOverlayClass} 
                    hideOverlay={this.hideNewCountdown}
                    addCountdown={this.addCountdown}
                />
                <EditCountdown
                    overlayClass={editCoundownOverlayClass}
                    hideOverlay={this.hideEditCountdown}
                    editCountdown={this.editCountdown}
                    deleteCountdown={this.deleteCountdown}
                    index={indexToEdit}
                    date={dateToEdit}
                    label={labelToEdit}
                />
            </div>
        );
    }
}

export default OverlayNav;
