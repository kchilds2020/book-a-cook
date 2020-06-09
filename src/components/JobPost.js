import React from 'react'
/* import '../styles/JobPost.css' */

function JobPost({summary, description, peopleAmount, location, date, username}) {
    return (
        <div className = "post-container">
            {summary}
            {description}
            {peopleAmount}
            {location}
            {date}
            {username}
        </div>
    )
}

export default JobPost
