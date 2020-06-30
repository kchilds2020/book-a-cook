import React, {useState, useEffect} from 'react'
import '../../styles/Event.css'
import event from '../../images/event.svg';
import Button from 'react-bootstrap/Button'
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
        <div className="event-container">
            <div style={{ padding: '10px'}}>
                <img className = "landing-sectionIMG" src={event} alt="landing" style={{width: "200px", height: "200px"}}/>
            </div>
            <div className= "event-details">
                <div className="event-summary">{summary}</div>
                <div className="event-location"><b>Location:</b> {location}</div>
                <div className="event-date"><b>When:</b> {month} {day}, {year}</div>
                <div className="event-description"><b>About:</b> {description}</div>
                <Button variant='info' onClick={ () => window.location.href=`/user/profile?user=${username}`} style={{margin: "10px"}}>Contact</Button>
            </div>
        </div>
    )
}

export default Event
