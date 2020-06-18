import React, {useEffect, useState, useRef} from 'react'
import NavBar from './NavBar'
import '../styles/Profile.css'
import silhouette from '../images/silhouette.png'
import axios from 'axios'
import Photo from './Photo'
import Menu from './Menu'

function Profile({identification, firstname, lastname, username, email, cookSpecialty, cookDescription, cookPrice, setFirstname, setLastname, setUsername, setEmail, setCookDescription, setCookPrice, setCookSpecialty, cook, setCook, picture, setPicture, photos, setPhotos, menuItems, setMenuItems}) {
    const [toggle, setToggle] = useState(false);
    const [files, setFiles] = useState([]);
    //menu
    const [menuDescription, setMenuDescription] = useState('');
    const [menuTitle, setMenuTitle] = useState(''); 
    const [menuPrice, setMenuPrice] = useState('');
    const [menuPicture, setMenuPicture] = useState(''); 

    const fileInput = useRef();
    const menuFileInput = useRef();

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    console.log('IDENTIFICATION', identification);
    console.log('MENU ITEMS', menuItems);

    const checkToggle = () => {
        if(document.getElementById('cook-checkbox').checked){
            setToggle(true);
            document.getElementById('cook-info').style.visibility = 'visible';
            document.getElementById('cook-info').style.height = 'auto';
        }else{
            setToggle(false);
            document.getElementById('cook-info').style.visibility = 'hidden';
            document.getElementById('cook-info').style.height = '0px';
        }
    }

    useEffect( () => {
        console.log('PICTURE', picture);
        console.log('COOK',cook);
        cook ? document.getElementById('cook-checkbox').checked = true : document.getElementById('cook-checkbox').checked = false
        checkToggle();
    }, [cook, picture])

    useEffect( () => {

    }, [menuItems])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        //upload all files to backend
        files.forEach(async (file)=>{
            let formData = new FormData();
            formData.append('file', file)
            formData.append('username',username)

            let imgResponse = await axios.post('/upload-img', formData)
            console.log(imgResponse.data)
        })
        console.log(photos);

        const data = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            cook: toggle,
            cookSpecialty: cookSpecialty,
            cookDescription: cookDescription,
            cookPrice: cookPrice,
            picture: picture,
            photos: photos
        }

        
        //update user info
        axios.post('/update-user', data)
        .then(response => {
            console.log(response.data)
        })
        .catch(err => console.log(err))
    }

    const handleProfileChange = (event) => {
        //store file and filename
        let fileArray = files;
        fileArray.push(event.target.files[0])
        setFiles(fileArray);
        setPicture(`${username}-${event.target.files[0].name}`)

        //display progile img
        const imgTag = document.getElementById('profile-img');
        const reader = new FileReader();
        reader.addEventListener("load", () => imgTag.src = reader.result, false);
        if(event.target.files[0]){reader.readAsDataURL(event.target.files[0]);}
    }
    
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

    const createItem = (event) =>  {
        event.preventDefault();
        let items = menuItems;
        const data = {
            username: username,
            title: menuTitle,
            description: menuDescription,
            price: menuPrice,
            picture: menuPicture

        }

        axios.post('/post/add-menu-item', data)
        .then(response => {
            console.log(response.data)
            items.push(data)
            setMenuItems(items)
        })
        .catch(err => console.log(err))
        forceUpdate();
    }

    return (
        <div>
            <NavBar active={'profile-item'}/>
            <div className = "profile-container">
                <div className = "user-info">
                        <form  className = "profile-form" onSubmit={handleSubmit} formEncType="multipart/form-data">
                            <h2>User Information</h2>
                            <div className = "user-description">
                                <div className = "profile-picture">
                                    <img src = {picture === '' ? silhouette : `/api/get/image/${picture}`} alt="profile-img" id="profile-img"/>
                                    <button className="update-img-btn" onClick={() => fileInput.current.click()}>Change</button>
                                    <input ref={fileInput}type="file" onChange= {handleProfileChange} style={{display: 'none'}} id="profile-file"/>
                                </div>
                                <div className = "profile-about">
                                    <label htmlFor="firstname">First Name</label>
                                    <input name = "firstname" id = "firstname" type = "text" className = "user-input" maxLength = '40' defaultValue = {firstname} onChange = {ev => setFirstname(ev.target.value)} required/>
                                    <label htmlFor="lastname">Last Name</label>
                                    <input name = "lastname" id = "lastname" type = "text" className = "user-input" maxLength = '40' defaultValue = {lastname} onChange = {ev => setLastname(ev.target.value)} required/>
                                    <label htmlFor="username">Username</label>
                                    <input name = "username" id = "username" type = "text" className = "user-input" maxLength = '40' defaultValue = {username} onChange = {ev => setUsername(ev.target.value)} required/>
                                    <label htmlFor="email">Email</label>
                                    <input name = "email" id = "email" type = "text" className = "user-input" maxLength = '40' defaultValue = {email} onChange = {ev => setEmail(ev.target.value)} required/>  
                                    <div className = "cook-toggle">
                                        <span className ="toggle-text">Are you a Cook?  </span>
                                        <label className="switch">
                                            <input type="checkbox" id="cook-checkbox" onChange={checkToggle}/>
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div className = "cook-information" id="cook-info">
                            <h2>Cook Information</h2>
                                <div className = "cook-about">
                                    <label htmlFor="specialty">Specialty</label>
                                    <input name = "cookSpecialty" id = "specialty" type = "text" placeholder = "Specialty" className = "cook-input" maxLength = '40' defaultValue = {cookSpecialty} onChange = {ev => setCookSpecialty(ev.target.value)} /> 
                                    <label htmlFor="description">Description</label>
                                    <textarea name = "cookDescription" id = "description" type = "text" placeholder = "Description" className = "cook-input" defaultValue = {cookDescription} onChange = {ev => setCookDescription(ev.target.value)}/>
                                    <label htmlFor="price">Price</label>
                                    <input name = "cookPrice" id = "price" type = "text" placeholder = "Price" className = "cook-input" maxLength = '40' defaultValue = {cookPrice} onChange = {ev => setCookPrice(ev.target.value)} />
                                </div>
                                
                            </div>
                            <div className = "photos-container" id="cook-info">
                            <h2>Photos</h2>
                                <div className = "images">
                                    {photos.map((element,index) => <Photo key={index} input={true} itemNum = {index} photo={element} files={files} photos={photos} setFiles={setFiles} setPhotos={setPhotos} username={username}/>)}
                                    
                                    <Photo input={true} itemNum = {photos.length} photo={'add-photo.png'} files={files} photos={photos} setFiles={setFiles} setPhotos={setPhotos} username={username}/>
                                </div>
                                
                            </div>
                            <h2>Menu</h2>
                            <div className ="menu-container">
                                <Menu username={username} menuItems={menuItems}/>
                                <div className="menu-item-container">
                                    <div className="menu-photo">
                                        <img src={`/api/get/image/add-photo.png`} onClick={() => menuFileInput.current.click()} id="create-menu-photo" style={{cursor: 'pointer'}}/>
                                        <input ref={menuFileInput} onChange= {handleMenuFileChange} type="file" style={{display: 'none'}}/>
                                    </div>
                                    <div className = "menu-item-details">
                                        <div className = "menu-item-title">
                                            <input type="text" id="menu-title" placeholder="Title" onChange = {ev => setMenuTitle(ev.target.value)}/>
                                        </div>
                                        <div className = "menu-item-description">
                                            <input type="text" id="menu-description" placeholder = "Description" onChange = {ev => setMenuDescription(ev.target.value)}/>
                                        </div>
                                        <div className = "menu-item-price">
                                            <input type="text" id ="menu-price" placeholder="Price" onChange = {ev => setMenuPrice(ev.target.value)}/>
                                        </div>
                                        <button className="menu-item-btn" onClick={createItem}>
                                            Create Item    
                                        </button>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="update-btn-container">
                                <input type="submit" value="Update" className = "user-update-btn"/>
                            </div>
                            
                        </form>
                    
                </div>
            </div>
        </div>
    )
}

export default Profile
