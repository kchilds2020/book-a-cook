import React, {useState, useRef} from 'react'
import PhotoEditor from '../PhotoEditor'

function CreateMenuItem({username, createMenuItem, identification}) {


    const [menuDescription, setMenuDescription] = useState('');
    const [menuTitle, setMenuTitle] = useState(''); 
    const [menuPrice, setMenuPrice] = useState('');
    const [menuPicture, setMenuPicture] = useState('add-photo.png'); 
    const [visibility, setVisibility] = useState(false)
    const [file, setFile] = useState('false')
    

    const menuFileInput = useRef();

    const handleMenuFileChange = async (event) => {
        //store file and filename
        setFile(event.target.files[0])
        setVisibility(true)
    }

    const afterUpload = (filename) => {
        setMenuPicture(`${filename}`)
        const imgTag = document.getElementById('create-menu-photo');
        const reader = new FileReader();
        reader.addEventListener("load", () => imgTag.src = `/api/get/image/${filename}`, false);
        reader.readAsDataURL(file);
        setVisibility(false)
    }

    const cancelItem = (e) =>{
        e.preventDefault()
        setVisibility(false)
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
                    <img src={`/api/get/image/${menuPicture}`} onClick={() => menuFileInput.current.click()} id="create-menu-photo" style={{cursor: 'pointer'}} alt={`${menuPicture} ${username}`}/>
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
                    {visibility ? <div><PhotoEditor username={username} file={file} cancel={cancelItem} afterUpload={afterUpload}/><Overlay /></div> : <></>}                      
                </div>
            </div>
        </>
    )
}

export default CreateMenuItem
