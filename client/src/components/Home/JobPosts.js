import React, {useEffect, useState} from 'react'
import HomeJobPost from './HomeJobPost'
import axios from 'axios'

function JobPosts({username}) {

    const [myPosts, setMyPosts] = useState('');

    useEffect(() => {
        if(username !== ''){
             //get all posts
             axios.get(`/api/get/my-jobs/${username}`)
             .then(response => {
                 console.log('MY POSTS',response.data)
                 setMyPosts(response.data);
             })
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
        </div>
    )
}

export default JobPosts
