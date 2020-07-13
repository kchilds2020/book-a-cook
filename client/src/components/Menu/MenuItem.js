import React, {useState, useEffect} from 'react'
import '../../styles/MenuItem.css'
import Order from './Order';
import Button from 'react-bootstrap/Button'
import StarRatings from 'react-star-ratings';
import axios from 'axios'
import MenuItemContainer from './MenuItemContainer'
import MenuItemPhoto from './MenuItemPhoto'
import MenuItemDetails from './MenuItemDetails'
import MenuItemTitle from './MenuItemTitle'
import MenuItemPrice from './MenuItemPrice'
import MenuItemDescription from './MenuItemDescription'
import MenuItemLocation from './MenuItemLocation'
import MenuItemSpan from './MenuItemSpan'

function MenuItem({title, description, price, chefUsername, picture, itemNum, dbID, shadow, setShadow, user}) {

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
        setShadow(true)
    }
    const cancelItem = (event) => {
        event.preventDefault();
        setVisibility(false)
        setShadow(false)
    }

    return (
        <MenuItemContainer >
            <MenuItemPhoto src={`/api/get/image/${picture}`} alt =" "/>
            
            <MenuItemDetails>
                <div>
                <MenuItemSpan>
                    <MenuItemTitle id = {`menu-item-title-${itemNum}`}>{title}</MenuItemTitle>
                    <MenuItemPrice id = {`menu-item-price-${itemNum}`}>${price}</MenuItemPrice>
                </MenuItemSpan>
                    <StarRatings
                        rating={reviewAvg}
                        starDimension="25px"
                        starRatedColor="gold"
                    />
                    <MenuItemDescription id = {`menu-item-description-${itemNum}`}>{description}</MenuItemDescription>
                </div>
                <div> 
                    <MenuItemSpan>
                        <MenuItemLocation id = {`menu-item-location-${itemNum}`}>{'Mansfield, Texas'}</MenuItemLocation>
                        
                    </MenuItemSpan>
                    <Button onClick={orderItem} block>Order!</Button>
                </div>
                
            </MenuItemDetails>
               
            {visible ? <Order cancel={cancelItem} price={price} title={title} picture={picture} dbID = {dbID} chefUsername={chefUsername} user={user}/> : <></>}
        </MenuItemContainer>
    )
}

export default MenuItem
