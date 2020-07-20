import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import {HomeHeader, NumColorDark, HomeSectionContainer} from './HomeStyles'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import CreateMenuItem from '../PopUps/CreateMenuItem'
import Overlay from '../PopUps/Overlay'
/* import {HomeSectionContainer} from '../GeneralStyles' */

function ActiveMenu({user}) {
    const [isLoading, setLoading] = useState(false)
    const [menuItems, setMenuItems] = useState([])
    const [visibility, setVisibility] = useState(false)

    useEffect(() => {
        const getActiveItems = async () => {
            setLoading(true)
            const response = await axios.get(`/api/get/active-menu-items/${user.username}`)
            console.log('ACTIVE MENU ITEMS', response)
            setMenuItems(response.data)
            setLoading(false)
        }

        getActiveItems()
    }, [user])

    const deactivateItem = async (event) => {
        event.preventDefault()
        
        console.log(event.target.id)
        try{
        const response = await axios.post(`/api/post/deactivate-menu-items`,{id: `${event.target.id}`})
        console.log(response)
        }catch(error){console.log(error)}
    }

    return (
        <>
            <HomeHeader style={{marginBottom: '0px', borderRadius: '8px 8px 0px 0px'}}><NumColorDark>{menuItems.length}</NumColorDark> Active Menu Items</HomeHeader> 
            <Table borderless hover style={{ backgroundColor: 'white', textAlign: 'center', borderRadius: '0px 0px 8px 8px'}}>
                    <tbody>                
                        {menuItems ? menuItems.map((element,index) => 
                            <tr key = {index}>
                                <td><img src={`/api/get/image/${element.picture}`} style={{width: '40px', height: '40px', margin: '0px 5px', borderRadius: '4px'}}/>{element.title}</td>
                                <td><Button onClick = {deactivateItem} id={element._id}>Deactivate</Button></td>
                            </tr>) : <></>}
                    </tbody>
                </Table>
            {isLoading ? <Spinner /> : <></>}
            <Button variant='info' onClick = {() => setVisibility(true)} style ={{marginTop: '10px'}} block>Create Menu Item</Button>
            {visibility ? <>
                        <CreateMenuItem user={user} setOpen={setVisibility}/> 
                        <Overlay setVisibility ={setVisibility}/>
                    </>: <></>}
        </>
        
    )
}

export default ActiveMenu
