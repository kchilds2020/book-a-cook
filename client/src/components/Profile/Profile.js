import React, {useEffect, useState, useRef, useContext} from 'react'
import '../../styles/Profile.css'
import silhouette from '../../images/silhouette.png'
import axios from 'axios'
import Photos from './Photos'
import Menu from './Menu'
import {UserContext} from '../UserContext'
import Button from 'react-bootstrap/Button'

function Profile() {
    let {user, menu} = useContext(UserContext)
    console.log('PROFILE USER CONTEXT', user, menu)

    const [modified, setModified] = useState(false);
    const [files, setFiles] = useState([]);
    const [tempMenuItems, setTempMenuItems] = useState([])
    const [itemsToBeDeleted, setItemsToBeDeleted] = useState([])

    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [cook, setCook] = useState('')
    const [cookDescription, setCookDescription] = useState('')
    const [cookSpecialty, setCookSpecialty] = useState('')
    const [cookPrice, setCookPrice] = useState('')
    const [picture, setPicture] = useState('')
    const [photos, setPhotos] = useState([])
    const [identification, setIdentification] = useState('')
    const [menuItems, setMenuItems] = useState([])
    const [number, setNumber] = useState('');

    const [count, setCount] = useState(0);

    //menu
    const fileInput = useRef();

    useEffect(() => {
        if(user !== null){
            setFirstname(user.firstName)
            setLastname(user.lastName)
            setUsername(user.username)
            setEmail(user.email)
            setCook(user.cook)
            setCookDescription(user.cookDescription)
            setCookSpecialty(user.cookSpecialty)
            setCookPrice(user.cookPrice)
            setPicture(user.picture)
            setPhotos(user.photos)
            setIdentification(user._id) 
            setModified(false)
            setNumber(user.number)
        }

        if(menu !== null){
            setMenuItems(menu)
        }
    },[user, menu, count])

    //check modification
    useEffect(() => {
        setModified(true)
    },[firstName, lastName, email, username, cook, cookDescription, cookSpecialty, cookPrice, picture, identification, number, photos, count])



    const uploadImage = () => {
        //upload all files to backend
        files.forEach(async (file)=>{
            let formData = new FormData();
            formData.append('file', file)
            formData.append('username',user.username)

            let imgResponse = await axios.post('/upload-img', formData)
            console.log(imgResponse.data)
        })

        setCount(count + 1)     
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        let checks = formatPhoneNumber(number)
        if(checks === true){
            uploadImage()
            console.log(photos);
            const userData = {
                firstname: firstName,
                lastname: lastName,
                username: username,
                email: email,
                cook: cook,
                cookSpecialty: cookSpecialty,
                cookDescription: cookDescription,
                cookPrice: cookPrice,
                picture: picture,
                photos: photos,
                number: number
            }

            //update user info
            axios.post('/update-user', userData)
            .catch(err => console.log(err))

            //update menu item info
            axios.post('/post/add-menu-items', tempMenuItems)

            //delete items if needed
            if(itemsToBeDeleted.length > 0 ){itemsToBeDeleted.map(element => axios.post(`/api/post/remove-item/${element}`))}

            setModified(false)
            alert('Profile Updated')
        }
    }

    const handleProfileChange = (event) => {
        //store file and filename
        let fileArray = files;
        fileArray.push(event.target.files[0])
        setFiles(fileArray);
        setPicture(`${user.username}-${event.target.files[0].name}`)

        //display progile img
        const imgTag = document.getElementById('profile-img');
        const reader = new FileReader();
        reader.addEventListener("load", () => imgTag.src = reader.result, false);
        if(event.target.files[0]){reader.readAsDataURL(event.target.files[0]);}
        //add ability to update
        setModified(true)
    }

    let formatPhoneNumber = (str) => {
        //Filter only numbers from the input
        let cleaned = ('' + str).replace(/\D/g, '');
        
        //Check if the input is of correct length
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      
        if (match) {
          setNumber('(' + match[1] + ') ' + match[2] + '-' + match[3])
          return true
        }
        else{
            alert('Invalid Phone Number')
            return false
        }
    };

    return (
        user ?
        <div>
            <div className = "profile-container">
                <div className = "user-info">
                        <form  className = "profile-form" onSubmit={handleSubmit} formEncType="multipart/form-data">
                            <div className="profile-header-title">User Information</div>
                            <div className = "user-description">
                                <div className = "profile-picture">
                                    <img src = {user.picture === '' ? silhouette : `/api/get/image/${picture}`} alt="profile-img" id="profile-img" onClick={() => fileInput.current.click()}/>
                                    <input ref={fileInput}type="file" onChange= {handleProfileChange} style={{display: 'none'}} id="profile-file"/>
                                </div>
                                <div className = "profile-about">
                                    <label htmlFor="firstname">First Name</label>
                                    <input name = "firstname" id = "firstName" type = "text" className = "user-input" maxLength = '40' defaultValue = {firstName} onChange = {e => setFirstname(e.target.value)} required/>
                                    <label htmlFor="lastname">Last Name</label>
                                    <input name = "lastname" id = "lastName" type = "text" className = "user-input" maxLength = '40' defaultValue = {lastName} onChange = {e => setLastname(e.target.value)} required/>
                                    <label htmlFor="username">Username</label>
                                    <input name = "username" id = "username" type = "text" className = "user-input" maxLength = '40' defaultValue = {username} onChange = {e => setUsername(e.target.value)} required/>
                                    <label htmlFor="email">Email</label>
                                    <input name = "email" id = "email" type = "text" className = "user-input" maxLength = '40' defaultValue = {email} onChange = {e => setEmail(e.target.value)} required/>
                                    <label htmlFor="number">Phone Number</label>
                                    <input name = "number" id = "number" type = "tel" className = "user-input" maxLength = '15' defaultValue = {number} onChange = {e => setNumber(e.target.value)} required/>  
                                    <div className = "cook-toggle">
                                        <span className ="toggle-text">Are you a Cook?  </span>
                                        {cook ? <Button variant="success" onClick={e => setCook(false)}>Yes</Button> : <Button variant="secondary" onClick={e => setCook(true)}>No</Button>}
                                    </div>
                                </div>
                            </div>
                            
                            {cook ? (
                                <>
                                    <div className="profile-header-title">Cook Information</div>
                                    <div className = "cook-information" id="cook-info">
                                        <div className = "cook-about">
                                            <label htmlFor="specialty">Specialty</label>
                                            <input name = "cookSpecialty" id = "cookSpecialty" type = "text" placeholder = "Specialty" className = "cook-input" maxLength = '40' defaultValue = {cookSpecialty} onChange = {e => setCookSpecialty(e.target.value)} /> 
                                            <label htmlFor="description">Description</label>
                                            <textarea name = "cookDescription" id = "cookDescription" type = "text" placeholder = "Description" className = "cook-input" defaultValue = {cookDescription} onChange = {e => setCookDescription(e.target.value)}/>
                                            <label htmlFor="price">Price</label>
                                            <input name = "cookPrice" id = "cookPrice" type = "text" placeholder = "Price" className = "cook-input" maxLength = '40' defaultValue = {cookPrice} onChange = {e => setCookPrice(e.target.value)} />
                                        </div>
                                        
                                    </div>
                            </>)
                            : (<></>)}
                            <div className="profile-header-title">Photos</div>
                            <div className = "photos-container" id="cook-info">
                                <div className = "images">
                                    <Photos photos={photos} files={files}  setPhotos={setPhotos}  setFiles={setFiles} username={user.username} setModified={setModified} uploadImage={uploadImage}/>
                                </div>
                                
                            </div>
                            {cook ? (
                            <>
                                <div className="profile-header-title">Menu Items</div>
                                <div className ="menu-container">
                                    <Menu identification = {identification} username={user.username} menuItems={menuItems} setMenuItems = {setMenuItems} editable={true} uploadImage={uploadImage} files={files} setFiles = {setFiles} setTempMenuItems={setTempMenuItems} tempMenuItems={tempMenuItems} itemsToBeDeleted={itemsToBeDeleted} setItemsToBeDeleted={setItemsToBeDeleted} setModified={setModified}/>
                                </div>
                            </>)
                            :<></>}
                            <div className="update-btn-container">
                                {/* <input type="submit" value="Update" className = "user-update-btn" id = "profile-update-btn"/> */}
                                {!modified ? <Button className="user-update-btn" id = "profile-update-btn" variant = 'secondary' block disabled>Update</Button> : <Button type="submit" className="user-update-btn" id = "profile-update-btn" variant = 'primary' block>Update</Button>}
                            </div>
                            
                        </form>
                    
                </div>
            </div>
        </div> :
        <></>
    )
}

export default Profile
