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
                if(user.longitude !== 0 && user.latitude !== 0){
                    let dist = distanceBetween(user.longitude, user.latitude, response.data.longitude, response.data.latitude)
                    setDistance(dist)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getChef()
    }, [chefUsername, user])

    useEffect(() => {
        
    }, [long, lat])

    const orderItem = (event) =>{
        event.preventDefault();
        console.log('order!')
        setVisibility(true);
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
                    {user && user.latitude !== 0 ?
                        <MenuItemLocation >{distance} Miles</MenuItemLocation>
                        :
                        <div>Location not verified</div>
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
