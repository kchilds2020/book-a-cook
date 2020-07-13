import React, {useRef, useState} from 'react'
import silhouette from '../../images/silhouette.png'
import {ProfilePhoto} from './ProfileStyles'
import PhotoEditor from '../PhotoEditor'
import Overlay from '../Overlay'

function ProfileImage({picture, setPicture, username, setModified}) {

    const [visibility, setVisibility] = useState(false)
    const [file, setFile] = useState('')

    const fileInput = useRef();

    const editPhoto = async (event) => {
        setFile(event.target.files[0])
        setVisibility(true)
    }

    const afterUpload = (filename) => {
        setPicture(`${filename}`)

        //display progile img
        const imgTag = document.getElementById('profile-img');
        const reader = new FileReader();
        reader.addEventListener("load", () => imgTag.src = `/api/get/image/${filename}`, false);
        reader.readAsDataURL(file);

        setVisibility(false)
        setModified(true)
    }

    const cancelItem = (event) => {
        event.preventDefault();
        setVisibility(false)
    }

    return (
        <>
            <ProfilePhoto src = {picture === '' ? silhouette : `/api/get/image/${picture}`} alt="profile-img" id="profile-img" onClick={() => fileInput.current.click()}/>
            <input ref={fileInput}type="file" onChange= {editPhoto} style={{display: 'none'}} id="profile-file"/>
            {visibility ? <><PhotoEditor username={username} file={file} cancel={cancelItem} afterUpload={afterUpload}/><Overlay /></> : <></>}
        </>
    )
}

export default ProfileImage
