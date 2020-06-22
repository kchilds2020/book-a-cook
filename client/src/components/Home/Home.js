import React from 'react';
import NavBar from '../NavBar'
import '../../styles/Home.css'
import '../../App.css'
import JobPosts from './JobPosts'
import Events from './Events'
import MyOrders from './MyOrders'



const Home = ({identification, firstname, lastname, email, username, cook}) => {
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