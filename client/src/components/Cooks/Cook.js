import React/* , {useState} */ from 'react'
import PIC from '../../images/silhouette.png';
import Button from 'react-bootstrap/Button'
import distanceBetween from '../utilities/distanceBetween'
import {CookTitle, CookPrice, CookDescription, CookContainer, CookHeader, CookPhoto, CookName, CookDetails} from './CookStyles'


function Cook({firstname, lastname, specialty, price, description, latitude, longitude, username, picture, user}) {

    return (
        <>
            <CookContainer>
                    <CookHeader>    
                        <CookPhoto src={picture === '' ? PIC : `/api/get/image/${picture}`} className = "picture" alt='profile pic'/>
                        <CookName>{firstname} {lastname}</CookName>
                    </CookHeader>
                    <CookDetails>
                        <CookTitle>{specialty}</CookTitle>
                        <CookPrice>${price}</CookPrice>
                        {user && user.latitude !== 0 ? <div>{distanceBetween(latitude, longitude, user.latitude, user.longitude).toFixed(0)} miles away</div> : <div>Location not verified</div>}
                        <CookDescription>{description}</CookDescription>
                        <Button style={{margin: '10px 0px'}} variant='info' onClick = {() => window.location.href=`/user/profile?user=${username}`} block>Contact</Button>
                    </CookDetails>
            </CookContainer>
        </>
    )
}

export default Cook