import React, {useState, useEffect} from 'react'
import NavBar from './NavBar'
import '../styles/JobPostings.css'
import axios from 'axios'
import JobPost from './JobPost'

function JobPostings() {
    const [postsArray, setPostsArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState('');

    useEffect(() => {
        let mounted = true;
        axios.get('api/get/jobs')
        .then(response => {
            console.log(response.data);
            if(mounted){
                setLoading(false)
                setPostsArray(response.data)
                setError('');
            }
        })
        .catch(error => {
            console.log(error);
            setLoading(false)
            setPostsArray([])
            setError('Something went wrong!');
        })
        return () => mounted = false;
  
    },[])


    return (
        <div>
            <NavBar />
            <div className = "jp-container">
                {loading ? 'LOADING...' : postsArray.map((element,index) => <JobPost  key = {index} summary={element.summary} description={element.description} peopleAmount={element.peopleAmount} location={element.location} date={element.date} userPosted={element.username} />)}
                {err ? err : null}
                <form>
                    <label htmlFor = "event-summary">Event Summary</label>
                    <input type="text" name = "event" id = "event-summary" className = "jp-inputs" placeholder = "Event Summary"/>
                    <label htmlFor = "event-description">Event Description</label>
                    <textarea type="text" name = "event-description" id = "event-description" className = "jp-inputs" placeholder = "Event Description"/>
                    <label htmlFor = "people-amount">Amount of people that need to be served</label>
                    <input type="text" name = "people-amount" id = "people-amount" className = "jp-inputs" placeholder = "Amount of People"/>
                    <label htmlFor = "event-location">Location of Event</label>
                    <input type="text" name = "event-location" id = "event-location" className = "jp-inputs" placeholder = "Event Location"/>
                    <label htmlFor = "event-date">Date of Event</label>
                    <input type="date" name = "event-date" id = "event-date" className = "jp-inputs" placeholder = "Date"/>
                    <button>Post Job!</button>
                </form>
            </div>

        </div>
    )
}

export default JobPostings
