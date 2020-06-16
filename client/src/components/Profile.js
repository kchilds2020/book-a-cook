import React, {useEffect, useState, useRef} from 'react'
import NavBar from './NavBar'
import '../styles/Profile.css'
import silhouette from '../images/silhouette.png'
import axios from 'axios'
import Photo from './Photo'

function Profile({identification, firstname, lastname, username, email, cookSpecialty, cookDescription, cookPrice, setFirstname, setLastname, setUsername, setEmail, setCookDescription, setCookPrice, setCookSpecialty, cook, setCook, picture, setPicture, photos, setPhotos}) {
    const [toggle, setToggle] = useState(false);
    const [files, setFiles] = useState([]);

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

    const handleImgChange = (event) => {
        console.log(event.target);
        let fileArray = files;
        let tempPhotos = photos;
        let tempPic = picture;
        fileArray.push(event.target.files[0])
        setFiles(fileArray);
        let idVal = '';

        switch (event.target.id) {
        case 'profile-file':
            idVal='profile-img'
            tempPic=`${username}-${event.target.files[0].name}`;
            setPicture(tempPic)
            break;
        case 'fi-0':
            idVal='photo-0'
            tempPhotos[0] = `${username}-${event.target.files[0].name}`;
            break
        case 'fi-1':
            idVal='photo-1'
            tempPhotos[1] = `${username}-${event.target.files[0].name}`;
            break
        case 'fi-2':
            idVal='photo-2'
            tempPhotos[2] = `${username}-${event.target.files[0].name}`;
            break
        case 'fi-3':
            idVal='photo-3'
            tempPhotos[3] = `${username}-${event.target.files[0].name}`;
            break
        case 'fi-4':
            idVal='photo-4'
            tempPhotos[4] = `${username}-${event.target.files[0].name}`;
            break
        case 'fi-5':
            idVal='photo-5'
            tempPhotos[5] = `${username}-${event.target.files[0].name}`;
            break
        default:
            idVal = ''
        }

        setPhotos(tempPhotos);

        const imgTag = document.getElementById(idVal);
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // convert image file to base64 string
            imgTag.src = reader.result;
          }, false);

        if(event.target.files[0]){
            reader.readAsDataURL(event.target.files[0]);
        }

        console.log(files);
        /* console.log(filename); */
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
                                    <input ref={fileInput}type="file" onChange= {handleImgChange} style={{display: 'none'}} id="profile-file"/>
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
                                    {photos.map((element,index) => <Photo key={index} className="photo" id={`photo-${index}`} input={true} itemNum = {index} handleImgChange={handleImgChange} photo={element}/>)}
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
