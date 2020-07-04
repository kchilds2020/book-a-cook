import React/* , {useState} */ from 'react'
import PIC from '../../images/silhouette.png';
import '../../styles/CookSummary.css';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button'
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
            <div className="profile">
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <div className="pictureDiv">
                            <img src={picture === '' ? PIC : `/api/get/image/${picture}`} className = "picture" alt='profile pic'/>
                        </div>
                        <div className = "cookName">
                            <h2>{firstname} {lastname}</h2>
                        </div>
                    </div>
                    <div>
                        <div className = "positionTitle">
                            <h3>{specialty}</h3>
                        </div>
                    {/*    <div className = "positionTitle">
                            <h3>{city}, {state}</h3>
                        </div> */}
                        <div className = "cookPrice">
                            <h4>${price}</h4>
                        </div>
                        <div className = "cookDescription">
                            <p>{description}</p>
                        </div>
                        <div style={{padding: '10px 0px'}}>
                        <Button variant='info' onClick = {() => window.location.href=`/user/profile?user=${username}`}>Contact</Button>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default Cook