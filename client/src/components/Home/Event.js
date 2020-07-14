import React, {useState, useEffect} from 'react'
import event from '../../images/event.svg';
import Button from 'react-bootstrap/Button'
import {EventContainer, EventDetails, EventInfo, EventSummary, EventImg} from './HomeStyles'

function Event({summary, description, location, date, username}) {
    const [month, setMonth] = useState();
    const [day, setDay] = useState();
    const [year, setYear] = useState();

    useEffect(() => {
        let dt = new Date(date.slice(0,10));
        let yr = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(dt)
        let mnth = new Intl.DateTimeFormat('en', {month: 'long'}).format(dt)
        let d = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(dt)
 

        setYear(yr)
        setDay(d)
        setMonth(mnth)
    }, [date])

    return (
        <EventContainer>
            <EventImg  src={event} alt="landing" style={{width: "200px", height: "200px"}}/>
            <EventDetails>
                <EventSummary>{summary}</EventSummary>
                <EventInfo><b>Location:</b> {location}</EventInfo>
                <EventInfo><b>When:</b> {month} {day}, {year}</EventInfo>
                <EventInfo><b>About:</b> {description}</EventInfo>
                <Button variant='info' onClick={ () => window.location.href=`/user/profile?user=${username}`} style={{margin: "10px"}}>Contact Event Creator</Button>
            </EventDetails>
        </EventContainer>
    )
}

export default Event
