import React, {useRef} from 'react'
import silhouette from '../../images/silhouette.png'
import axios from 'axios'

function ProfileImage({picture, setPicture, username}) {

    const fileInput = useRef();

    const handleProfileChange = async (event) => {
        //store file and filename
        const files = event.target.files[0]
        let formData = new FormData();
        formData.append('file', files)
        formData.append('username',username)

        let imgResponse = await axios.post('/upload-img', formData)
        console.log(imgResponse.data)

        setPicture(`${username}-${files.name}`)

        //display progile img
        const imgTag = document.getElementById('profile-img');
        const reader = new FileReader();
        reader.addEventListener("load", () => imgTag.src = reader.result, false);
        if(files){reader.readAsDataURL(files);}
    }

    return (
        <div className = "profile-picture">
            <img src = {picture === '' ? silhouette : `/api/get/image/${picture}`} alt="profile-img" id="profile-img" onClick={() => fileInput.current.click()}/>
            <input ref={fileInput}type="file" onChange= {handleProfileChange} style={{display: 'none'}} id="profile-file"/>
        </div>
    )
}

export default ProfileImage
