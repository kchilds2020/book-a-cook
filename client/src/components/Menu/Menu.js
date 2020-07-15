import React, {useEffect, useState, useContext} from 'react'
import MenuItem from './MenuItem'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import {UserContext} from '../UserContext'
import {PageHeader, Container, CenterSpinner} from '../GeneralStyles'
import Alert from 'react-bootstrap/Alert'
import distanceBetween from '../utilities/distanceBetween'


function Menu() {
    let {user, menu} = useContext(UserContext)
    console.log('MENU USER CONTEXT', user, menu)

    const [menuArray, setMenuArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setError] = useState('');
    
    useEffect(() => {
        const getMenu = async () => {
            try{
                let response = await axios.get('api/get/menu')
                console.log('RESPNSE', response)
                if(user && user.latitude !== 0 && user.longitude !==0){
                    response.data.sort((a,b)=>{
                        let aDistance = distanceBetween(a.latitude,a.longitude,user.latitude,user.longitude)
                        let bDistance = distanceBetween(b.latitude,b.longitude,user.latitude,user.longitude)
                        return aDistance - bDistance
                    })
                }
                setLoading(false)
                setMenuArray(response.data)
                setError('');
            }catch(error){
                setLoading(false)
                setMenuArray([])
                setError('Something went wrong!');
            }
        }
        getMenu()
    },[user])


    return (
        <>
            <Container>
            <PageHeader>Menu</PageHeader>
                {loading ? <CenterSpinner><Spinner animation="border" variant="info" /> </CenterSpinner> : menuArray.map((element,index) => <MenuItem  key={index} title={element.title} description={element.description} price={element.price} picture={element.picture} chefUsername={element.username} itemNum={index} dbID={element._id} user={user !== null ? user : ''} longitude={element.longitude} latitude={element.latitude}/>)}
                {err ? err : null}
                {menuArray.length === 0 && !loading ? <Alert style={{margin: '10px'}} variant='warning'>No food near you :(</Alert> : <></>}
            </Container>
        </>
    )
}

export default Menu
