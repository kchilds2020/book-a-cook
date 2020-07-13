import React/* , {useState} */ from 'react'
import PIC from '../../images/silhouette.png';
import Button from 'react-bootstrap/Button'
import {CookTitle, CookPrice, CookDescription, CookContainer, CookHeader, CookPhoto, CookName, CookDetails} from './CookStyles'
/* import Geocode from "react-geocode" */
//import keys from "./keys"

function Cook({firstname, lastname, specialty, price, description, latitude, longitude, username, picture}) {
    /* const [city, setCity] = useState('');
    const [state, updateState] = useState(''); */

    //uncode for filtering later
    /* Geocode.setApiKey(keys.api_key);
    Geocode.setRegion("en");
    Geocode.setRegion("es");

    Geocode.fromLatLng(latitude, longitude).then(
        response => {
            const address = response.results[0].address_components;
            setCity(address[3].short_name);
            updateState(address[5].short_name);
            console.log(`${city}, ${state}`);
        },
        error => {
            console.error(error);
        }
    ) 
     */
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
                        <CookDescription>{description}</CookDescription>
                        <Button style={{margin: '10px 0px'}} variant='info' onClick = {() => window.location.href=`/user/profile?user=${username}`} block>Contact</Button>
                    </CookDetails>
            </CookContainer>
        </>
    )
}

export default Cook