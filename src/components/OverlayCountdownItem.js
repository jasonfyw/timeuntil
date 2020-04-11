import React, { useState } from 'react';
import { Grommet, Box, Button } from 'grommet';

import Countdown from './Countdown';

import './OverlayCountdownItem.css';
import grommetTheme from '../grommetTheme';

const OverlayCountdownItem = (props) => {

    const date = props.date;
    const label = props.label;
    const index = props.index;

    const [displayEditButton, setDisplayEditButton] = useState(false);

    return (
        <div 
            className="overlay-countdown-wrapper" 
            onMouseEnter={() => setDisplayEditButton(true)}
            onMouseLeave={() => setDisplayEditButton(false)}
        >
            <div className="countdown-wrapper" onClick={(e) => props.selectCountdown([date, label], e)}>
                <Countdown date={date} label={label} />
            </div>

            <Grommet theme={grommetTheme}>
                <Box alignContent="center">
                    { displayEditButton && 
                        <Button
                            className="edit-button"
                            label="Edit"
                            color="light-1"
                            size="small"
                            alignSelf="center"
                            onClick={() => props.editCountdown(index, date, label)}
                        /> 
                    }
                </Box>
            </Grommet>
        </div>
    );
}

export default OverlayCountdownItem;