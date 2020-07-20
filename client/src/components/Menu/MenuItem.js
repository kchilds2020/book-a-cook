import React, {useState, useEffect} from 'react'
import Order from './Order';
import Button from 'react-bootstrap/Button'
import StarRatings from 'react-star-ratings';
import axios from 'axios'
import {MenuItemContainer, MenuItemDescription, MenuItemPhoto, MenuItemDetails, MenuItemTitle, MenuItemPrice, MenuItemLocation, MenuItemSpan} from './MenuItemStyles'
import Overlay from '../PopUps/Overlay'
import distanceBetween from '../utilities/distanceBetween'
import hat from '../../images/hat.png'


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
                console.log('RESPOSNE', response)
                if(response.data.reviews.length > 0){
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
                if(user && user.latitude !== 0){
                    let dist = distanceBetween(user.latitude, user.longitude, response.data.latitude , response.data.longitude)
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
                        <MenuItemLocation >{parseInt(distance + 1)} {parseInt(distance + 1) === 1 ? 'Mile' : 'Miles'}</MenuItemLocation>
                        :
                        <MenuItemLocation >Location not verified</MenuItemLocation >
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
