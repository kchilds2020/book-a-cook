import React, {useState, useEffect} from 'react'
import '../../styles/MenuItem.css'
import Order from './Order';
import Button from 'react-bootstrap/Button'
import StarRatings from 'react-star-ratings';
import axios from 'axios'
import {MenuItemDescription, MenuItemPhoto, MenuItemDetails, MenuItemTitle, MenuItemPrice, MenuItemLocation, MenuItemSpan} from './MenuItemStyles'
import {Container} from '../GeneralStyles'
import Overlay from '../Overlay'


function MenuItem({title, description, price, chefUsername, picture, itemNum, dbID, user}) {

    const [visible, setVisibility] = useState(false);
    const [reviewAvg, setReviewAvg] = useState(0)

    useEffect(() => {
        axios.get(`/api/get/username/${chefUsername}`)
        .then(response => {
            let reviewArray = response.data.reviews
            console.log(response.data.reviews)
            let sum = 0;
            for(let i = 0; i < reviewArray.length; i++){
                sum += parseFloat(reviewArray[i].rating)
            }
            console.log('REVIEW AVG: ', sum/reviewArray.length)
            setReviewAvg(sum/reviewArray.length)
        })
    }, [chefUsername])

    console.log('USERNAME',user)
    const orderItem = (event) =>{
        event.preventDefault();
        console.log('order!')
        setVisibility(true);
    }

    return (
        <Container >
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
                        <MenuItemLocation >{'Mansfield, Texas'}</MenuItemLocation>
                        
                    </MenuItemSpan>
                    <Button onClick={orderItem} block>Order!</Button>
                </div>
                
            </MenuItemDetails>
               
            {visible ? <div><Order price={price} title={title} picture={picture} dbID = {dbID} chefUsername={chefUsername} user={user}/><Overlay setVisibility={setVisibility} /></div> : <></>}
        </Container>
    )
}

export default MenuItem
