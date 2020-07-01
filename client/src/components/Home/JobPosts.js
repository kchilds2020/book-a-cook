import React, {useEffect, useState} from 'react'
import HomeJobPost from './HomeJobPost'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Popup from 'reactjs-popup'
import JobForm from '../JobForm'

function JobPosts({username}) {

    const [myPosts, setMyPosts] = useState('');
    const [visible, setVisibility] = useState(false);

    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [peopleAmount, setPeopleAmount] = useState('');
    const [location, setLocation] = useState('');
    const [summary, setSummary] = useState('');


    useEffect(() => {
        let mounted = true
        if(username !== ''){
             //get all posts
             axios.get(`/api/get/my-jobs/${username}`)
             .then(response => {
                 if(mounted){
                    console.log('MY POSTS',response.data)
                    setMyPosts(response.data);
                }
             })
             return () => mounted = false
         }
     },[username, visible])

     const handleSubmit = (e) => {
        e.preventDefault()
        const post = {
            summary: summary,
            description: description,
            location: location,
            peopleAmount: peopleAmount,
            date: date,
            username: username
        }

        axios.post('/post/create-post', post)
        .then(() => alert('Event has been created'))
        .catch(err => console.log(err))

        //add to state
        setVisibility(false)
        setSummary('')
        setDescription('')
        setDate('')
        setPeopleAmount('')
        setLocation('')
     }

     const cancelPost = (e) => {
        e.preventDefault()
        setVisibility(false)
        setSummary('')
        setDescription('')
        setDate('')
        setPeopleAmount('')
        setLocation('')
     }

    return (
        <div className = "job-post-container" >
            <div className="job-post-header">
                <h3>You have <span className="post-num">{myPosts.length}</span> posted Jobs.</h3>
            </div>
            <div className="profile-job-posts">
                {myPosts.length > 0 ? myPosts.map((element,index) => <HomeJobPost key ={index} summary={element.summary} applications={element.applications} listID = {index} postID = {element._id} cook={element.cook}/>) : <></>}
            </div>
            <Button variant="primary" onClick={() => setVisibility(true)} block>Create a Post</Button>
            {visible ? <JobForm handleSubmit={handleSubmit} cancelPost={cancelPost} setDate={setDate} setDescription ={setDescription} setSummary={setSummary} setLocation={setLocation} setPeopleAmount={setPeopleAmount}/> : <></>}
        </div>
    )
}

export default JobPosts
