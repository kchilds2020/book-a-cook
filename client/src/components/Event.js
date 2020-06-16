import React from 'react'
import '../styles/Event.css'
function Event({summary, description, location, date}) {
    return (
        <div className="event-container">
            <div className="event-summary">{summary}</div>
            <div className="event-location">{location}</div>
            <div className="event-date">{date.slice(0,10)}</div>
            <div className="event-description">{description}</div>
        </div>
    )
}

export default Event
