import React, {useState, useEffect, useContext} from 'react'
import Cook from './Cook'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import {UserContext} from '../UserContext'
import {Container, PageHeader, CenterSpinner} from '../GeneralStyles'


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
                setLoading(false)
                setCooksArray(response.data)
                setError('');
            } catch (error) {
                setLoading(false)
                setCooksArray([])
                setError('Something went wrong!');
            }
        }
        getCooks()
    },[])
    
    return (
        <Container>
                <PageHeader>Cooks Near You</PageHeader>
                {loading ? <CenterSpinner><Spinner animation="border" variant="info" /></CenterSpinner> : cooksArray.map((element,index) => <Cook  key = {index} firstname={element.firstName} lastname={element.lastName} specialty={element.cookSpecialty} price={element.cookPrice} description={element.cookDescription} latitude={element.latitude} longitude={element.longitude} username={element.username} picture={element.picture}/>)}
                {err ? err : null}
        </Container>
    )
}

export default Cooks
