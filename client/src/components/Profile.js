import React, {useEffect, useState, useRef} from 'react'
import NavBar from './NavBar'
import '../styles/Profile.css'
import silhouette from '../images/silhouette.png'
import axios from 'axios'

function Profile({identification, firstname, lastname, username, email, cookSpecialty, cookDescription, cookPrice, setFirstname, setLastname, setUsername, setEmail, setCookDescription, setCookPrice, setCookSpecialty, cook, setCook, picture, setPicture}) {
    const [toggle, setToggle] = useState(false);
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');

    const fileInput = useRef();
    console.log('IDENTIFICATION', identification);

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

    const handleSubmit = async (event) =>{
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file)
        formData.append('username',username)

        let imgResponse = await axios.post('/upload-img', formData)
        console.log(imgResponse.data)
        setPicture(imgResponse.data.fileName)


        const data = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            cook: toggle,
            cookSpecialty: cookSpecialty,
            cookDescription: cookDescription,
            cookPrice: cookPrice,
            picture: imgResponse.data.fileName
        }

        
        
        axios.post('/update-user', data)
        .then(response => {
            console.log(response.data)
        })
        .catch(err => console.log(err))
    }

    const handleImgChange = (event) => {
        console.log(event.target);
        setFile(event.target.files[0]);
        setFilename(event.target.files[0].name);
        const imgTag = document.getElementById('profile-img');
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // convert image file to base64 string
            imgTag.src = reader.result;
          }, false);

        if(event.target.files[0]){
            reader.readAsDataURL(event.target.files[0]);
        }

        console.log(file);
        console.log(filename);
    }

    

    return (
        <div>
            <NavBar />
            <div className = "profile-container">
                <div className = "user-info">
                        <form  className = "profile-form" onSubmit={handleSubmit} formEncType="multipart/form-data">
                            <h2>User Information</h2>
                            <div className = "user-description">
                                <div className = "profile-picture">
                                    <img src = {picture === '' ? silhouette : `/api/get/image/${picture}`} alt="profile-img" id="profile-img"/>
                                    <button className="update-img-btn" onClick={() => fileInput.current.click()}>Change</button>
                                    <input ref={fileInput}type="file" onChange= {handleImgChange} style={{display: 'none'}} />
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
                            <input type="submit" value="Update" className = "user-update-btn"/>
                        </form>
                    
                </div>
            </div>
        </div>
    )
}

export default Profile
