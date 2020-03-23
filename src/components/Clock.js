import React, { useEffect, useState } from 'react';
import './Clock.css';
import { Container } from 'react-bootstrap';

const Clock = () => {

    const day_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const calculateCurrentTime = () => {
        const date = new Date();
        let timeIntervals = {}

        timeIntervals = {
            year: date.getFullYear(),
            month: month_names[date.getMonth()],
            day: day_names[date.getDay()],
            date: date.getDate(),
            hours: date.getHours().toString(),
            minutes: date.getMinutes().toString(),
            seconds: date.getSeconds().toString()
        };
        timeIntervals.hours.length === 1 && (timeIntervals.hours = '0' + timeIntervals.hours);
        timeIntervals.minutes.length === 1 && (timeIntervals.minutes = '0' + timeIntervals.minutes);
        timeIntervals.seconds.length === 1 && (timeIntervals.seconds = '0' + timeIntervals.seconds);

        return timeIntervals;
    }

    const [currentTime, setCurrentTime] = useState(calculateCurrentTime());

    useEffect(() => {
        setTimeout(() => {
            setCurrentTime(calculateCurrentTime())
        }, 1000)
    });
    
    return (
        <Container className="clock">
            <div className="time">
                {currentTime.hours}:{currentTime.minutes}:{currentTime.seconds}
            </div>
            <div className="date">
                {currentTime.date} {currentTime.month} {currentTime.year}
            </div>
        </Container>
    );
}

export default Clock;