import React, { Component } from 'react';
import { Grommet, Box, Form, FormField, TextInput, Button } from 'grommet';
import { DateInput } from 'grommet-controls';

import './EditCountdown.css';
import grommetTheme from '../grommetTheme';


const convertDate = (longDate) => {
    if (longDate) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        longDate = longDate.split(' ');
        const day = longDate[0],
            month = longDate[1],
            year = longDate[2];

        let date = `${monthNames.indexOf(month) + 1}/${day}/${year}`;
        
        return date;
    } else { return undefined }
    
}

class EditCountdown extends Component {
    state = {
        dateValue: convertDate(this.props.date),
        labelValue: this.props.label
    }

    

    editCountdown = () => {
        this.props.editCountdown(this.props.index, this.state.dateValue, this.state.labelValue);
        this.props.hideOverlay();
        this.resetInput()
    }
    deleteCountdown = () => {
        this.props.deleteCountdown(this.props.index);
        this.props.hideOverlay();
        this.resetInput() 
    }
    resetInput = () => {
        this.setState({ labelValue: undefined, dateValue: undefined });
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.date !== this.props.date) {
            this.setState({ dateValue: convertDate(nextProps.date) });
        }
        if(nextProps.label !== this.props.label) {
            this.setState({ labelValue: nextProps.label });
        } 
    }

    render() {
        let labelValue = this.state.labelValue;
        let dateValue = this.state.dateValue;
        console.log(dateValue);
        return (
            // TODO – add 'x time from now' functionality in parallel to datepicker
            <Grommet theme={grommetTheme}>
                <div id="editcountdown-overlay" className={this.props.overlayClass}>
                    <Box pad="large" align="center">
                        <Box pad="medium" alignSelf="center" background="light-4" round="medium">

                            <Form
                                onReset={this.resetInput}
                                onSubmit={this.editCountdown}
                            >
                                <Box direction="row">
                                    <FormField label="Countdown Name" name="label">
                                        <TextInput
                                            name="label"
                                            value={labelValue}
                                            onChange={e => this.setState({ labelValue: e.target.value })}
                                            placeholder="Enter new name"
                                            required
                                            style={{ "color": "#000" }}
                                        />
                                    </FormField>
                                    <FormField label="Date" name="date">
                                        <DateInput
                                            name="date"
                                            value={dateValue}
                                            onChange={e => { this.setState({ dateValue: e.target.value }) }}
                                            placeholder='DD/MM/YYYY'
                                            size="medium"
                                            required
                                        />
                                    </FormField>
                                </Box>

                                <Box direction="row" justify="between" margin={{ top: 'medium' }} >
                                    <Button 
                                        type="reset" 
                                        label="Cancel" 
                                        color="dark-1" 
                                        onClick={() => this.props.hideOverlay()} 
                                        style={{ "fontWeight": 1000 }} 
                                    />
                                    <Button
                                        label="Delete"
                                        color="dark-1"
                                        onClick={() => this.deleteCountdown()}
                                        style={{ "fontWeight": 1000 }}
                                    />
                                    <Button 
                                        type="submit" 
                                        label="Update" 
                                        color="dark-1" 
                                        style={{ "fontWeight": 1000 }} 
                                        primary 
                                    />
                                </Box>
                            </Form>

                        </Box>
                    </Box>
                </div>
            </Grommet>
        )
    }
}

export default EditCountdown;