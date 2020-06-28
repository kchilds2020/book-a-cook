import React, {useEffect, useState, useRef} from 'react'
import '../../styles/Profile.css'
import silhouette from '../../images/silhouette.png'
import axios from 'axios'
import Photos from './Photos'
import Menu from './Menu'
import {useHistory} from 'react-router-dom'

function Profile({setIdentification, identification, firstname, lastname, username, email, cookSpecialty, cookDescription, cookPrice, setFirstname, setLastname, setUsername, setEmail, setCookDescription, setCookPrice, setCookSpecialty, cook, setCook, picture, setPicture, photos, setPhotos, menuItems, setMenuItems}) {
    const [toggle, setToggle] = useState(false);
    const [files, setFiles] = useState([]);
    const [tempMenuItems, setTempMenuItems] = useState([])
    const [itemsToBeDeleted, setItemsToBeDeleted] = useState([])
    const [updated, setUpdated] = useState(true)

    const change = useRef(false);

    //menu
    const fileInput = useRef();

    let history = useHistory();

   

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

    useEffect(()=>{
        axios.get(`/get-session`)
                .then(idRes => {
                    console.log(idRes)
                    if(idRes.data.userInfo !== null){
                        setIdentification(idRes.data.userInfo.identification)
                        setUsername(idRes.data.userInfo.username)
                        setFirstname(idRes.data.userInfo.firstName)
                        setLastname(idRes.data.userInfo.lastName)
                        setEmail(idRes.data.userInfo.email)
                        setCookDescription(idRes.data.userInfo.cookDescription)
                        setCookPrice(idRes.data.userInfo.cookPrice)
                        setCookSpecialty(idRes.data.userInfo.cookSpecialty)
                        setCook(idRes.data.userInfo.cook)
                        setPicture(idRes.data.userInfo.picture)
                        setPhotos(idRes.data.userInfo.photos)
                        setMenuItems(idRes.data.menuInfo);
                    }
                })
    },[username,setCook, setCookDescription, setCookPrice, setCookSpecialty, setEmail,setFirstname, setLastname, setMenuItems,setPhotos, setPicture, setUsername, setIdentification, history])

    useEffect(()=>{
        let updateButton = document.getElementById('profile-update-btn')
    if (change.current){
        updateButton.style.backgroundColor="rgb(115, 165, 212)"
        updateButton.style.cursor="pointer"
        updateButton.style.pointerEvents = "all"
        setUpdated(false)
    }
    else{
        updateButton.style.backgroundColor="rgb(158, 158, 158)"
        updateButton.style.cursor="none"
        updateButton.style.pointerEvents = "none"
        change.current = true;
    }
        
    }, [firstname, lastname, username, email, photos,cookSpecialty, cookPrice, cookDescription, menuItems, picture, files, setMenuItems, updated])

    useEffect( () => {
        cook ? document.getElementById('cook-checkbox').checked = true : document.getElementById('cook-checkbox').checked = false
        checkToggle();
    }, [cook, picture])

    const uploadImage = () => {
        //upload all files to backend
        files.forEach(async (file)=>{
            let formData = new FormData();
            formData.append('file', file)
            formData.append('username',username)

            let imgResponse = await axios.post('/upload-img', formData)
            console.log(imgResponse.data)
        })
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        uploadImage()
        console.log(photos);

        const userData = {
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
        axios.post('/update-user', userData)
        .catch(err => console.log(err))

        //update menu item info
        axios.post('/post/add-menu-items', tempMenuItems)

        //delete items if needed
        if(itemsToBeDeleted.length > 0 ){itemsToBeDeleted.map(element => axios.post(`/api/post/remove-item/${element}`))}

        change.current = false
        setUpdated(true)
        alert('Profile Updated')



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

    

    return (
        <div>
            <div className = "profile-container">
                <div className = "user-info">
                        <form  className = "profile-form" onSubmit={handleSubmit} formEncType="multipart/form-data">
                            <div className="profile-header-title">User Information</div>
                            <div className = "user-description">
                                <div className = "profile-picture">
                                    <img src = {picture === '' ? silhouette : `/api/get/image/${picture}`} alt="profile-img" id="profile-img" onClick={() => fileInput.current.click()}/>
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
                            <div className="profile-header-title">Cook Information</div>
                            <div className = "cook-information" id="cook-info">
                                <div className = "cook-about">
                                    <label htmlFor="specialty">Specialty</label>
                                    <input name = "cookSpecialty" id = "specialty" type = "text" placeholder = "Specialty" className = "cook-input" maxLength = '40' defaultValue = {cookSpecialty} onChange = {ev => setCookSpecialty(ev.target.value)} /> 
                                    <label htmlFor="description">Description</label>
                                    <textarea name = "cookDescription" id = "description" type = "text" placeholder = "Description" className = "cook-input" defaultValue = {cookDescription} onChange = {ev => setCookDescription(ev.target.value)}/>
                                    <label htmlFor="price">Price</label>
                                    <input name = "cookPrice" id = "price" type = "text" placeholder = "Price" className = "cook-input" maxLength = '40' defaultValue = {cookPrice} onChange = {ev => setCookPrice(ev.target.value)} />
                                </div>
                                
                            </div>
                            <div className="profile-header-title">Photos</div>
                            <div className = "photos-container" id="cook-info">
                            
                                <div className = "images">
                                    <Photos photos={photos} files={files} setPhotos={setPhotos} setFiles={setFiles} username={username}/>
                                </div>
                                
                            </div>
                            <div className="profile-header-title">Menu Items</div>
                            <div className ="menu-container">
                                <Menu identification = {identification} username={username} menuItems={menuItems} setMenuItems = {setMenuItems} editable={true} uploadImage={uploadImage} files={files} setFiles = {setFiles} setTempMenuItems={setTempMenuItems} tempMenuItems={tempMenuItems} itemsToBeDeleted={itemsToBeDeleted} setItemsToBeDeleted={setItemsToBeDeleted}/>
                            </div>
                            <div className="update-btn-container">
                                <input type="submit" value="Update" className = "user-update-btn" id = "profile-update-btn"/>
                            </div>
                            
                        </form>
                    
                </div>
            </div>
        </div>
    )
}

export default Profile
