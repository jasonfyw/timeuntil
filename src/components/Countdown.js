import React, { useEffect, useState } from 'react';
import './Countdown.css';
import { Container, Row, Col } from 'react-bootstrap';

const Countdown = ({ date, label }) => {

    const calculateTimeLeft = () => {
        const diff = new Date(date) - new Date();
        let timeLeft = {}

        if (diff > 0) {
            timeLeft = {
                years: Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12)),
                months: Math.floor(diff / (1000 * 60 * 60 * 24 * 30) % 12),
                days: Math.floor(diff / (1000 * 60 * 60 * 24) % 30),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60) + 1
            }
        }

        if (timeLeft.years > 0) {
            timeLeft.days = timeLeft.days - (timeLeft.years * 5);
        }

        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000)
    });

    const timerComponents = []


    Object.keys(timeLeft).forEach(interval => {
        if (interval === 'years' && timeLeft[interval] === 0 && interval === 'months' && timeLeft[interval] === 0) {
            return
        } else if (interval === 'years' && timeLeft[interval] === 0) {
            return
        }

        timerComponents.push(
            <Col>
                <div className="interval">
                    {timeLeft[interval]}
                </div>
                <div className="interval-label">
                    {interval}
                </div>  
            </Col>
        );
    });

    return (
        <Container className="countdown">
            <Row>
                {timerComponents.length ? 
                <React.Fragment>
                    {timerComponents}
                    <Col md="12"><h4 className="label">until {label}</h4><h4 className="label-date">{date}</h4></Col>
                </React.Fragment> : <Col><h4 className="passed-countdown">{label} has already passed</h4></Col>}
            </Row>
        </Container>
    );
}

export default Countdown;