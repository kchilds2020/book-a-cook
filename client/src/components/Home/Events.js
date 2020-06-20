import React, {useState, useEffect} from 'react'
import Event from './Event'
import axios from 'axios'

function Events({username}) {

    const [events, setEvents] = useState('');

    useEffect(() => {
        if(username !== ''){
             //get working events
             axios.get(`/api/get/working-events/${username}`)
             .then(response => {
                 console.log('WORKING EVENTS',response.data)
                 let sorted = response.data.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
                 setEvents(sorted);
             })
             
         }
     },[username])

    return (
        <div className = "events-container">
            <div className="events-header">
                <h3>You have <span className="post-num">{events.length}</span> upcoming events.</h3>
            </div>
                    
            {events.length > 0 ? events.map((element, index) => <Event key={index} summary={element.summary} description={element.description} location={element.location} date={element.date}/>) : <></>}
        </div>
    )
}

export default Events
