import React, {useEffect, useState, useContext} from 'react'
import MenuItem from './MenuItem'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import {UserContext} from '../UserContext'
import {PageHeader, Container, CenterSpinner} from '../GeneralStyles'


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
    },[])


    return (
        <>
            <Container>
            <PageHeader>Menu</PageHeader>
                {loading ? <CenterSpinner><Spinner animation="border" variant="info" /> </CenterSpinner> : menuArray.map((element,index) => <MenuItem  key={index} title={element.title} description={element.description} price={element.price} picture={element.picture} chefUsername={element.username} itemNum={index} dbID={element._id} user={user !== null ? user : ''}/>)}
                {err ? err : null}
            </Container>
        </>
    )
}

export default Menu
