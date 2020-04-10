import React, { Component } from 'react';
import { Grommet, Box, Form, FormField, TextInput, Button } from 'grommet';
import { DateInput } from 'grommet-controls';

import './AddCountdown.css';

class AddCountdown extends Component {
    state = {
        dateValue: undefined,
        labelValue: undefined
        
    }

    addCountdown = () => {
        this.props.addCountdown(this.state.dateValue, this.state.labelValue);
        this.props.hideOverlay();
        this.resetInput()
    }
    resetInput = () => {
        this.setState({ labelValue: undefined, dateValue: undefined });
    }
    

    render() {
        const labelValue = this.state.labelValue;
        const dateValue = this.state.dateValue;

        return (
            // TODO – add 'x time from now' functionality in parallel to datepicker
            <Grommet>
                <div id="addcountdown-overlay" className={this.props.overlayClass}>
                    <Box pad="large" align="center">
                        <Box pad="medium" alignSelf="center" background="#fff">

                            <Form
                                onReset={this.resetInput}
                                onSubmit={this.addCountdown}
                            >
                                <Box direction="row">
                                    <FormField label="Countdown Name" name="label">
                                        <TextInput
                                            name="label"
                                            value={labelValue}
                                            onChange={e => this.setState({ labelValue: e.target.value })}
                                            placeholder="A meaningful name"
                                            required
                                        />
                                    </FormField>
                                    <FormField label="Date" name="date">
                                        <DateInput
                                            name="date"
                                            value={dateValue}
                                            onChange={e => {this.setState({ dateValue: e.target.value })}}
                                            placeholder='DD/MM/YYYY'
                                            required
                                        />
                                    </FormField>
                                </Box>

                                <Box direction="row" justify="between" margin={{ top: 'medium' }} >
                                    <Button type="reset" label="Cancel" color="light-1" onClick={() => {
                                        this.props.hideOverlay();
                                    }} />
                                    <Button type="submit" label="Add" color="light-1" primary />
                                </Box>
                            </Form>

                        </Box>
                    </Box>
                </div>
            </Grommet>
        )
    }
}





export default AddCountdown;