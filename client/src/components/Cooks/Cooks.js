import React, {useState, useEffect, useContext} from 'react'
import Cook from './Cook'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import {UserContext} from '../UserContext'
import {Container, PageHeader, CenterSpinner} from '../GeneralStyles'
import Alert from 'react-bootstrap/Alert'
import distanceBetween from '../utilities/distanceBetween'


function Cooks() {
    
    let {user, menu} = useContext(UserContext)
    console.log('COOKS USER CONTEXT', user, menu)

    const [cooksArray, setCooksArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState('');

    useEffect(() => {
        

        const getCooks = async () => {
            try {
                let response = await axios.get('api/get/cooks')
                if(user && user.latitude !== 0 && user.longitude !==0){
                    response.data.sort((a,b)=>{
                        let aDistance = distanceBetween(a.latitude,a.longitude,user.latitude,user.longitude)
                        let bDistance = distanceBetween(b.latitude,b.longitude,user.latitude,user.longitude)
                        return aDistance - bDistance
                    })
                }
                setLoading(false)
                
                setCooksArray(response.data.slice(0,10))
                setError('');
            } catch (error) {
                setLoading(false)
                setCooksArray([])
                setError('Something went wrong!');
            }

            
        }
        getCooks()
        
        
    },[user])

    
    return (
        <Container>
                <PageHeader>Cooks Near You</PageHeader>
                {loading ? <CenterSpinner><Spinner animation="border" variant="info" /></CenterSpinner> : cooksArray.map((element,index) => <Cook  key = {index} firstname={element.firstName} lastname={element.lastName} specialty={element.cookSpecialty} price={element.cookPrice} description={element.cookDescription} latitude={element.latitude} longitude={element.longitude} username={element.username} picture={element.picture} user={user}/>)}
                {err ? err : null}
                {cooksArray.length === 0 && !loading ? <Alert style={{margin: '10px'}} variant='warning'>No cooks near you :(</Alert> : <></>}
                
        </Container>
    )
}

export default Cooks
