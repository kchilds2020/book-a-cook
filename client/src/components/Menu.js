import React, {useEffect,useState, useCallback} from 'react'
import axios from 'axios'
import MenuItem from './MenuItem'

function Menu({username, menuItems}) {

    return (
        <>
            {menuItems.length > 0 ? menuItems.map((element,index) => <MenuItem title={element.title} description={element.description} price={element.price} picture={element.picture} username={element.username}/>) : <>No Menu Items</>}
        </>
    )
}

export default Menu
