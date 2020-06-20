import React, {useEffect, useState} from 'react'
import MenuItem from './MenuItem'
import CreateMenuItem from './CreateMenuItem'


function Menu({username, menuItems, setMenuItems, itemsToBeDeleted, setItemsToBeDeleted, files, setFiles, setTempMenuItems, tempMenuItems, uploadImage}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('MENU CHANGE',menuItems)
    },[count, menuItems])

    const createMenuItem = (data) =>  {
        let tItems = tempMenuItems;
        let mItems = menuItems;
        tItems.push(data)
        mItems.push(data)
        uploadImage()
        setMenuItems(mItems)
        setTempMenuItems(tItems)
        setCount(count + 1);
        console.log('createItem', menuItems)
    }

    const deleteMenuItem = async (dbID,itemID ) =>{

        
        let deletedItems = itemsToBeDeleted;
        deletedItems.push(dbID)
        setItemsToBeDeleted(deletedItems)  
        console.log(itemID)
        let items = menuItems;
        console.log(items)
        items.splice(itemID,1);
        setMenuItems(items)
        setCount(count + 1)
    }

    return (
        <>
            {menuItems.length > 0 ? menuItems.map((element,index) => <MenuItem key={index} title={element.title} description={element.description} price={element.price} picture={element.picture} username={element.username} itemNum={index} menuItems={menuItems} setMenuItems={setMenuItems} dbID={element._id} deleteMenuItem={deleteMenuItem}/>) : <>No Menu Items</>}
            <CreateMenuItem username={username} files={files} setFiles = {setFiles} uploadImage={uploadImage} itemsToBeDeleted={itemsToBeDeleted} setItemsToBeDeleted = {setItemsToBeDeleted} createMenuItem={createMenuItem}/>
        </> 
    )
}

export default Menu
