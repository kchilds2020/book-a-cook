import React, {useState, useEffect} from 'react'
import Event from './Event'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import {CenterSpinner} from '../GeneralStyles'
import {HomeHeader, HomeSectionContainer, NumColorDark} from './HomeStyles'

function Events({username}) {
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState('');
    const [events, setEvents] = useState('');

    useEffect(() => {
        if(username !== ''){
             //get working events
             axios.get(`/api/get/working-events/${username}`)
             .then(response => {
                 console.log('WORKING EVENTS',response.data)
                 setLoading(false)
                 let sorted = response.data.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
                 setEvents(sorted);
                 setError('');
             })
             .catch(err => {
                console.log(err);
                setLoading(false)
                setEvents([])
                setError('Something went wrong!');
             })
             
         }
     },[username])

    return (
        <HomeSectionContainer>
            <HomeHeader><NumColorDark>{events.length}</NumColorDark> Upcoming Events</HomeHeader>          
            {loading ? <CenterSpinner><Spinner animation="border" variant="info" /></CenterSpinner> : events.length > 0 ? events.map((element, index) => <Event key={index} summary={element.summary} description={element.description} location={element.location} date={element.date} username={element.username}/>) : <></>}
                {err ? err : null}
            <Button onClick ={() => window.location.href='/job-postings'} style={{marginTop: '10px'}} block>Apply for Events</Button>
        </HomeSectionContainer>
    )
}

export default Events
