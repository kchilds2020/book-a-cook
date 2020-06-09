import React from 'react'
 import '../styles/JobPost.css' 

function JobPost({summary, description, peopleAmount, location, eventDate, userPosted}) {
    return (
            <div className = "post-card">
                <div className = "post-summary">{summary}</div>
                <div className = "post-people">{peopleAmount}</div>
                <div className = "post-location">{location}</div>
                <div className = "post-date">{eventDate.slice(0,10)}</div>
                <div className = "post-username">{userPosted}</div>
                <div className = "post-description">{description}</div>
            </div>
    )
}

export default JobPost
