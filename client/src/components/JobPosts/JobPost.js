import React, {useState, useEffect, useContext} from 'react'
 import '../../styles/JobPost.css' 
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import {UserContext} from '../UserContext'
import Button from 'react-bootstrap/Button'

function JobPost({summary, description, peopleAmount, location, eventDate, userPosted, uniqueID}) {


    let {user, menu} = useContext(UserContext)
    console.log('JOB POST', user, menu)

    let history = useHistory()

    const [month, setMonth] = useState();
    const [day, setDay] = useState();
    const [year, setYear] = useState();

    useEffect(() => {
        let date = new Date(eventDate.slice(0,10));
        let yr = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date)
        let mnth = new Intl.DateTimeFormat('en', {month: 'long'}).format(date)
        let d = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date)
 

        setYear(yr)
        setDay(d)
        setMonth(mnth)
    }, [eventDate])

    const apply = (event) => {
        if(user === null){
            alert('You must login to apply for jobs')
            history.push('/login')
        }else{
            const data = {
                username: user.username,
                uniqueID: uniqueID
            }
            let btn = event.target
            axios.post(`api/post/apply/job-post`, data)
            .then(response => {
                console.log(response)
                btn.innerText = "Applied!"
                btn.style.backgroundColor="green"
                btn.style.pointerEvents="none"
            })
            .catch(err => console.log(err))
        }   

        
    }
    

    return (
            <div className = "post-card">
                <div className = "post-summary">{summary}</div>
                <div className = "inline-info">
                    <div className = "post-people">{peopleAmount} People</div>
                    <div className = "post-location">{location}</div>
                    <div className = "post-date">{month} {day}, {year}</div>
                </div>
                <div className = "post-description">{description}</div>
                <Button variant="primary" onClick={apply} id="jp-btn">Apply!</Button>
                <div className = "post-username">Created by: {userPosted}</div>
            </div>
    )
}

export default JobPost
