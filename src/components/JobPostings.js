import React, {useState, useEffect} from 'react'
import NavBar from './NavBar'
import '../styles/JobPostings.css'
import axios from 'axios'
import JobPost from './JobPost'

function JobPostings({username}) {
    const [postsArray, setPostsArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState('');

    //states for inputs
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [peopleAmount, setPeopleAmount] = useState('');
    const [visibility, setVisibility] = useState('hidden');

    useEffect(() => {
        let mounted = true;
        axios.get('api/get/jobs')
        .then(response => {
            console.log(response.data);
            if(mounted){
                setLoading(false)
                let sorted = response.data.slice().sort((a, b) => new Date(a.date) - new Date(b.date))
                setPostsArray(sorted)
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

    useEffect(() => {
        let postForm = document.getElementById('job-post-form');
        postForm.style.visibility = visibility;
  
    },[visibility])
    const handleSubmit = (event) => {
        event.preventDefault();
        //get username
        //format date
        const post = {
            summary: summary,
            description: description,
            location: location,
            peopleAmount: peopleAmount,
            date: date,
            username: username
        }

        axios.post('/post/create-post', post)
        .then(response => console.log(response))
        .catch(err => console.log(err))

        //add to state
        let temp = postsArray;
        temp.push(post)
        setPostsArray(temp);
        console.log(date);
        toggleForm()
    }

    const toggleForm = () => {
        visibility === 'visible' ? setVisibility('hidden') : setVisibility('visible')
    }

    const cancelPost = () => {
        console.log('clicked')
        setSummary('')
        setDescription('')
        setDate('')
        setPeopleAmount('')
        setLocation('')
        toggleForm()
    }

    return (
        <div>
            <NavBar />
            <div className = "jp-container">
                <div className = "jp-header">
                    <button className = "toggle-btn" onClick={toggleForm}>Create Post!</button>
                </div>
                <div className = "posts-container">
                    {loading ? 'LOADING...' : postsArray.map((element,index) => <JobPost  key = {index} uniqueID = {element._id} summary={element.summary} description={element.description} peopleAmount={element.peopleAmount} location={element.location} eventDate={element.date} userPosted={element.username} username={username}/>)}
                    {err ? err : null}
                </div>
                <form onSubmit = {handleSubmit} id = "job-post-form">
                    <label htmlFor = "event-summary">Event Summary</label>
                    <input type="text" name = "event" id = "event-summary" className = "jp-inputs" placeholder = "Event Summary" onChange={event => setSummary(event.target.value)}/>
                    <label htmlFor = "event-description">Event Description</label>
                    <textarea type="text" name = "event-description" id = "event-description" className = "jp-inputs" placeholder = "Event Description" onChange={event => setDescription(event.target.value)}/>
                    <label htmlFor = "people-amount">Amount of people that need to be served</label>
                    <input type="text" name = "people-amount" id = "people-amount" className = "jp-inputs" placeholder = "Amount of People" onChange={event => setPeopleAmount(event.target.value)}/>
                    <label htmlFor = "event-location">Location of Event</label>
                    <input type="text" name = "event-location" id = "event-location" className = "jp-inputs" placeholder = "Event Location" onChange={event => setLocation(event.target.value)}/>
                    <label htmlFor = "event-date">Date of Event</label>
                    <input type="date" name = "event-date" id = "event-date" className = "jp-inputs" placeholder = "Date" onChange={event => setDate(event.target.value)}/>
                    <div className = "btns">
                        <input type="submit" value = "Create Post!" className="create-post-btn"/>
                        <button type="reset" className = "cancel-post-btn" onClick = {cancelPost}>Cancel Post</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default JobPostings
