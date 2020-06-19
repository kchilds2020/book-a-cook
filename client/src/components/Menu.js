import React, {useState, useEffect} from 'react'
import MenuItem from './MenuItem'

function Menu({username, menuItems}) {

    return (
        <>
            {menuItems.length > 0 ? menuItems.map((element,index) => <MenuItem key={index} title={element.title} description={element.description} price={element.price} picture={element.picture} username={element.username}/>) : <>No Menu Items</>}
        </>
    )
}

export default Menu
