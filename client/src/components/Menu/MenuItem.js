import React, {useState, useEffect} from 'react'
import Order from './Order';
import Button from 'react-bootstrap/Button'
import StarRatings from 'react-star-ratings';
import axios from 'axios'
import {MenuItemContainer, MenuItemDescription, MenuItemPhoto, MenuItemDetails, MenuItemTitle, MenuItemPrice, MenuItemLocation, MenuItemSpan} from './MenuItemStyles'
import Overlay from '../PopUps/Overlay'
import distanceBetween from '../utilities/distanceBetween'


function MenuItem({title, description, price, chefUsername, picture, itemNum, dbID, user, longitude, latitude}) {

    const [visible, setVisibility] = useState(false);
    const [reviewAvg, setReviewAvg] = useState(0)
    const [distance, setDistance] = useState(0)
    const [long, setLong] = useState(0) 
    const [lat, setLat] = useState(0)

    useEffect(() => {
        const getChef = async () =>{

            try {
                let response = await axios.get(`/api/get/username/${chefUsername}`)
                let reviewArray = response.data.reviews
                console.log(response.data.reviews)
                if(response.data.reviews > 0){
                    let sum = 0;
                    for(let i = 0; i < reviewArray.length; i++){
                        sum += parseFloat(reviewArray[i].rating)
                    }
                    console.log('REVIEW AVG: ', sum/reviewArray.length)
                    setReviewAvg(sum/reviewArray.length)
                }else{
                    setReviewAvg(0)
                }

                //get distance
                if(response.data.longitude && response.data.latitude){
                    let dist = distanceBetween(long, lat, response.data.longitude, response.data.latitude)
                    setDistance(dist)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getChef()
    }, [chefUsername, user, long, lat])

    useEffect(() => {
        
    }, [long, lat])

    const orderItem = (event) =>{
        event.preventDefault();
        console.log('order!')
        setVisibility(true);
    }

    const sendLocation = (event) => {
        event.preventDefault()
        
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('Latitude',position.coords.latitude,'Longitude',position.coords.longitude)
            if(user){
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
            }else{
                setLat(position.coords.latitude)
                setLong(position.coords.longitude)
            }
        })

    }

    return (
        <MenuItemContainer >
            <MenuItemPhoto src={`/api/get/image/${picture}`} alt =" "/>
            
            <MenuItemDetails>
                <div>
                    <MenuItemSpan>
                        <MenuItemTitle >{title}</MenuItemTitle>
                        <MenuItemPrice >${price}</MenuItemPrice>
                    </MenuItemSpan>
                        <StarRatings
                            rating={reviewAvg}
                            starDimension="25px"
                            starRatedColor="gold"
                        />
                        <MenuItemDescription >{description}</MenuItemDescription>
                </div>
                <div> 
                    <MenuItemSpan>
                    {lat !== 0 && long !== 0 ? 
                        <MenuItemLocation >{distance} Miles</MenuItemLocation>
                        :
                        <Button variant='outline-warning' onClick={sendLocation}>Accept Location Services</Button>
                    }
                    </MenuItemSpan>
                    <Button onClick={orderItem} block>Order!</Button>
                </div>
                
            </MenuItemDetails>
               
            {visible ? <div><Order price={price} title={title} picture={picture} dbID = {dbID} chefUsername={chefUsername} user={user}/><Overlay setVisibility={setVisibility} /></div> : <></>}
        </MenuItemContainer>
    )
}

export default MenuItem
