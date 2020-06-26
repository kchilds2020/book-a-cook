import React, { useEffect } from 'react';
import '../../styles/Home.css'
import '../../App.css'
import JobPosts from './JobPosts'
import Events from './Events'
import MyOrders from './MyOrders'
import axios from 'axios'


const Home = ({identification, firstname, username, cook, setFirstname, setUsername, setCook}) => {

    useEffect(() => {
        axios.get(`/get-session`)
                .then(idRes => {
                    console.log(idRes)
                    setFirstname(idRes.data.userInfo.firstName)
                    setUsername(idRes.data.userInfo.username)
                    setCook(idRes.data.userInfo.cook)
                })
    }, [setFirstname, setCook,setUsername])

    console.log('COOK', cook)
    return(
        <div>
            <div className = "greeting"><h2>Hello {firstname}!</h2></div>
            <div className="home-container">
            {cook ? <MyOrders username={username}/> : <></>}
            {cook ? <></> : <JobPosts username={username}/>}
            {cook ? <Events username={username}/> : <></>}
            
            </div>
        </div>
    );
};

export default Home;