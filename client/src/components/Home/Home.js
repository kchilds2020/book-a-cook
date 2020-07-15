import React, { useContext, useEffect } from 'react';
import JobPosts from './JobPosts'
import Events from './Events'
import MyOrders from './MyOrders'
import {UserContext} from '../UserContext'
import CustomerOrders from './CustomerOrders'
import {HomeGreeting, HomeContainer} from './HomeStyles'
import {FlexDirectionRow} from '../GeneralStyles'
import axios from 'axios'



const Home = () => {

    let {user, menu} = useContext(UserContext)
    console.log('HOME USER CONTEXT', user, menu)

    useEffect(() => {
        if(user){
            navigator.geolocation.getCurrentPosition((position) => {
                console.log('Latitude',position.coords.latitude,'Longitude',position.coords.longitude)
            
                const sendLocation = async() => {
                    const data = {
                        username: user.username,
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude
                    }

                    try {
                        const response = await axios.post('/send-location', data)
                        console.log(response)
                    } catch (error) {
                        console.log(error)
                    }
                }
                sendLocation()
            })
        }
            
    }, [user])

    return(
        user ?
            <>
            <FlexDirectionRow style={{padding: '0px 20px'}}>
                <HomeGreeting><h2>Hello {user.firstName}!</h2></HomeGreeting>
            </FlexDirectionRow>
            <HomeContainer>
                <>
                {user.cook ? <MyOrders username={user.username} user={user}/> : <></>}
                </>
                {user.cook ? <></> : <CustomerOrders username={user.username}/>}
                {user.cook ? <></> : <JobPosts username={user.username}/>}
                {user.cook ? <Events username={user.username}/> : <></>}
            </HomeContainer></> : <></>
    );
}

export default Home;