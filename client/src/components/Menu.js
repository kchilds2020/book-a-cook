import React from 'react'
import MenuItem from './MenuItem'

function Menu({username, menuItems, setMenuItems, editable, deleteMenuItem}) {

    return (
        <>
            {menuItems.length > 0 ? menuItems.map((element,index) => <MenuItem key={index} title={element.title} description={element.description} price={element.price} picture={element.picture} username={element.username} editable={editable} itemNum={index} menuItems={menuItems} setMenuItems={setMenuItems} dbID={element._id} deleteMenuItem={deleteMenuItem}/>) : <>No Menu Items</>}
        </> 
    )
}

export default Menu
