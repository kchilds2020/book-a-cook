import React, {useState, useEffect, useContext} from 'react'
import '../../styles/JobPostings.css'
import axios from 'axios'
import JobPost from './JobPost'
import JobForm from '../JobForm'
import Spinner from 'react-bootstrap/Spinner';
import {UserContext} from '../UserContext'

function JobPostings() {
    let {user, menu} = useContext(UserContext)
    console.log('JOB POSTINGS USER CONTEXT', user, menu)


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
        if(postForm !== null){
            postForm.style.visibility = visibility;
        }
  
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
            username: user.username
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
                <div className = "jp-container">
                    <div className = "posts-container">
                        {loading ? <div className="job-post-spinner"><Spinner animation="border" variant="info" /> </div> : postsArray.map((element,index) => <JobPost  key = {index} uniqueID = {element._id} summary={element.summary} description={element.description} peopleAmount={element.peopleAmount} location={element.location} eventDate={element.date} userPosted={element.username} applications={element.applications} cancelPost = {cancelPost}/>)}
                        {err ? err : null}        
                    </div>
                    <div id = "job-post-form">
                        <JobForm setSummary={setSummary} setPeopleAmount = {setPeopleAmount} setDescription = {setDescription} setLocation = {setLocation} setDate = {setDate} handleSubmit={handleSubmit} cancelPost={cancelPost}/>
                    </div>
                </div>

            </div>


    )
}

export default JobPostings
