import React, {useState, useRef, useEffect} from 'react'
import axios from 'axios'
import Menu from './Menu'

function CreateMenuItem({username, files, setFiles, setMenuItems, menuItems, uploadImage, tempMenuItems, setTempMenuItems}) {

    const [menuDescription, setMenuDescription] = useState('');
    const [menuTitle, setMenuTitle] = useState(''); 
    const [menuPrice, setMenuPrice] = useState('');
    const [menuPicture, setMenuPicture] = useState(''); 
    const [count, setCount] = useState(0);

    const menuFileInput = useRef();

    useEffect(() => {
        console.log('CREATEITEMMENU',menuItems)
    },[count])

    const handleMenuFileChange = (event) => {
        //store file and filename
        let fileArray = files;
        fileArray.push(event.target.files[0])
        setMenuPicture(`${username}-${event.target.files[0].name}`);
        setFiles(fileArray);

        //display progile img
        const imgTag = document.getElementById('create-menu-photo');
        const reader = new FileReader();
        reader.addEventListener("load", () => imgTag.src = reader.result, false);
        if(event.target.files[0]){reader.readAsDataURL(event.target.files[0]);}
    }

    const createItem = async (event) =>  {
        event.preventDefault();
        let tItems = tempMenuItems;
        let mItems = menuItems;
        const data = {
            username: username,
            title: menuTitle,
            description: menuDescription,
            price: menuPrice,
            picture: menuPicture

        }

        
        tItems.push(data)
        mItems.push(data)
        uploadImage()
        setMenuItems(mItems)
        setTempMenuItems(tItems)
        setCount(count + 1);
        console.log('createItem', menuItems)
    }

    

    return (
        <>
            <Menu username={username} menuItems={menuItems} editable={true}/>
            <div className="menu-item-container">
                <div className="menu-photo">
                    <img src={`/api/get/image/add-photo.png`} onClick={() => menuFileInput.current.click()} id="create-menu-photo" style={{cursor: 'pointer'}} alt=""/>
                    <input ref={menuFileInput} onChange= {handleMenuFileChange} type="file" style={{display: 'none'}}/>
                </div>
                <div className = "menu-item-details">
                    <div className = "menu-item-title">
                        <input type="text" id="create-menu-title" placeholder="Title" onChange = {ev => setMenuTitle(ev.target.value)}/>
                    </div>
                    <div className = "menu-item-description">
                        <input type="text" id="create-menu-description" placeholder = "Description" onChange = {ev => setMenuDescription(ev.target.value)}/>
                    </div>
                    <div className = "menu-item-price">
                        <input type="text" id ="create-menu-price" placeholder="Price" onChange = {ev => setMenuPrice(ev.target.value)}/>
                    </div>
                    <button className="menu-item-btn" onClick={createItem}>
                        Create Item    
                    </button>                            
                </div>
            </div>
        </>
    )
}

export default CreateMenuItem
