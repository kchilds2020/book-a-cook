import React, { useContext } from 'react';
import '../../styles/Home.css'
import '../../App.css'
import JobPosts from './JobPosts'
import Events from './Events'
import MyOrders from './MyOrders'
import {UserContext} from '../UserContext'
import Account from './Account'
import CustomerOrders from './CustomerOrders'



const Home = () => {

    let {user, menu} = useContext(UserContext)
    console.log('HOME USER CONTEXT', user, menu)

    return(
        user !== null ?
        <div>
            <div className = "greeting"><h2>Hello {user.firstName}!</h2></div>
            <div className="home-container">
            <>
            {user.cook ? <MyOrders username={user.username} user={user}/> : <></>}
            </>
            {user.cook ? <></> : <CustomerOrders username={user.username}/>}
            {user.cook ? <></> : <JobPosts username={user.username}/>}
            {user.cook ? <Events username={user.username}/> : <></>}
            
            </div>
        </div> :
        <></>
    );
};

export default Home;