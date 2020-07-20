import React/* , {useState} */ from 'react'
import PIC from '../../images/silhouette.png';
import Button from 'react-bootstrap/Button'
import distanceBetween from '../utilities/distanceBetween'
import {CookTitle, CookPrice, CookDescription, CookContainer, CookHeader, CookPhoto, CookName, CookDetails, CookLocation} from './CookStyles'


function Cook({firstname, lastname, specialty, price, description, latitude, longitude, username, picture, user}) {

    return (
        <>
            <CookContainer>
                    <CookHeader>    
                        <CookPhoto src={picture === '' ? PIC : `/api/get/image/${picture}`} className = "picture" alt='profile pic'/>
                        
                    </CookHeader>
                    <CookDetails>
                    <CookName>{firstname} {lastname}</CookName>
                        <CookTitle>{specialty}</CookTitle>
                        <CookPrice>${price}</CookPrice>
                        {user && user.latitude !== 0 ? 
                        
                        <CookLocation>{distanceBetween(latitude, longitude, user.latitude, user.longitude).toFixed(0)} miles</CookLocation> 
                        : 
                        <CookLocation>Location not verified</CookLocation>}
                        <CookDescription>{description}</CookDescription>
                        <Button  variant='info' onClick = {() => window.location.href=`/user/profile?user=${username}`} block>Contact</Button>
                    </CookDetails>
            </CookContainer>
        </>
    ) 
}

export default Cook