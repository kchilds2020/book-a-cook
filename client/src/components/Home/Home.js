import React, { useContext } from 'react';
import JobPosts from './JobPosts'
import Events from './Events'
import MyOrders from './MyOrders'
import {UserContext} from '../UserContext'
import CustomerOrders from './CustomerOrders'
import {HomeGreeting, HomeContainer} from './HomeStyles'



const Home = () => {

    let {user, menu} = useContext(UserContext)
    console.log('HOME USER CONTEXT', user, menu)

    return(
        user ?
            <HomeContainer>
            <HomeGreeting><h2>Hello {user.firstName}!</h2></HomeGreeting>
                <>
                {user.cook ? <MyOrders username={user.username} user={user}/> : <></>}
                </>
                {user.cook ? <></> : <CustomerOrders username={user.username}/>}
                {user.cook ? <></> : <JobPosts username={user.username}/>}
                {user.cook ? <Events username={user.username}/> : <></>}
            </HomeContainer> : <></>
    );
};

export default Home;