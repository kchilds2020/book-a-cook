import React, {useEffect, useState} from 'react'
import HomeJobPost from './HomeJobPost'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Popup from 'reactjs-popup'
import JobForm from '../JobForm'

function JobPosts({username}) {

    const [myPosts, setMyPosts] = useState('');

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
     },[username])

    return (
        <div className = "job-post-container">
            <div className="job-post-header">
                <h3>You have <span className="post-num">{myPosts.length}</span> posted Jobs.</h3>
            </div>
            <div className="profile-job-posts">
                {myPosts.length > 0 ? myPosts.map((element,index) => <HomeJobPost key ={index} summary={element.summary} applications={element.applications} listID = {index} postID = {element._id} cook={element.cook}/>) : <></>}
            </div>
            <Popup trigger={<Button variant="primary" block>Create a Post</Button>} position="bottom center">
                <JobForm />
            </Popup>
        </div>
    )
}

export default JobPosts
