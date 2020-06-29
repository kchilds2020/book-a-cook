import React, { useEffect, useContext } from 'react';
import '../../styles/Home.css'
import '../../App.css'
import JobPosts from './JobPosts'
import Events from './Events'
import MyOrders from './MyOrders'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../UserContext'


const Home = ({identification, firstname, username, cook, setFirstname, setUsername, setCook}) => {

    let history = useHistory()
    /* let {user, menu} = useContext(UserContext)
    console.log('HOME USER CONTEXT', user, menu) */
    useEffect(() => {
        axios.get(`/get-session`)
                .then(idRes => {
                    console.log(idRes)
                    if(idRes.data.userInfo !== null){
                        setFirstname(idRes.data.userInfo.firstName)
                        setUsername(idRes.data.userInfo.username)
                        setCook(idRes.data.userInfo.cook)
                    }
                })
    }, [setFirstname, setCook,setUsername, history])

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