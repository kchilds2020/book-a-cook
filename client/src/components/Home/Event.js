import React, {useState, useEffect} from 'react'
import '../../styles/Event.css'
function Event({summary, description, location, date}) {
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
            <div className="event-summary">{summary}</div>
            <div className="event-location"><b>Location:</b> {location}</div>
            <div className="event-date"><b>When:</b> {month} {day}, {year}</div>
            <div className="event-description"><b>About:</b> {description}</div>
        </div>
    )
}

export default Event
