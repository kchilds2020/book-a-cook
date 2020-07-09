import React, {useState, useRef} from 'react'
import axios from 'axios'

function CreateMenuItem({username, createMenuItem, identification}) {


    const [menuDescription, setMenuDescription] = useState('');
    const [menuTitle, setMenuTitle] = useState(''); 
    const [menuPrice, setMenuPrice] = useState('');
    const [menuPicture, setMenuPicture] = useState('add-photo.png'); 
    

    const menuFileInput = useRef();

    const handleMenuFileChange = async (event) => {
        //store file and filename
        const file = event.target.files[0]
        let formData = new FormData();
        formData.append('file', file)
        formData.append('username',username)

        let imgResponse = await axios.post('/upload-img', formData)
        console.log(imgResponse.data)

        setMenuPicture(`${username}-${file.name}`);

        //display progile img
        const imgTag = document.getElementById('create-menu-photo');
        const reader = new FileReader();
        reader.addEventListener("load", () => imgTag.src = reader.result, false);
        reader.readAsDataURL(file);
    }

    const createItem = (event) =>  {
        event.preventDefault();
        const data = {
            userID: identification,
            username: username,
            title: menuTitle,
            description: menuDescription,
            price: menuPrice,
            picture: menuPicture,

        }
        console.log('CREATE MENU ITEM DATA', data)
        createMenuItem(data)

        setMenuPicture('add-photo.png')
        setMenuPrice('')
        setMenuTitle('')
        setMenuDescription('')

    }

    

    return (
        <>
            <div className="create-menu-item-container">
                <div className="create-menu-photo">
                    <img src={`/api/get/image/${menuPicture}`} onClick={() => menuFileInput.current.click()} id="create-menu-photo" style={{cursor: 'pointer'}} alt={`${menuPicture}`}/>
                    <input ref={menuFileInput} onChange= {handleMenuFileChange} type="file" style={{display: 'none'}}/>
                </div>
                <div className = "menu-item-details">
                    <div className = "menu-item-title">
                        <input className ="user-input" type="text" id="create-menu-title" placeholder="Title" value = {menuTitle} onChange = {ev => setMenuTitle(ev.target.value)}/>
                    </div>
                    <div className = "menu-item-description">
                        <input className ="user-input" type="text" id="create-menu-description" placeholder = "Description" value = {menuDescription} onChange = {ev => setMenuDescription(ev.target.value)}/>
                    </div>
                    <div className = "menu-item-price">
                        <input className ="user-input" type="text" id ="create-menu-price" placeholder="Price" value = {menuPrice} onChange = {ev => setMenuPrice(ev.target.value)}/>
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
