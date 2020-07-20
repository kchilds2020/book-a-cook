import React, {useRef, useState, useEffect} from 'react'
import silhouette from '../../images/silhouette.png'
import {ProfilePhoto} from './ProfileStyles'
import PhotoEditor from '../PopUps/PhotoEditor'
import Overlay from '../PopUps/Overlay'
import axios from 'axios'


function ProfileImage({picture, setPicture, username, setModified=(value)=>console.log(''), height = '200px', width= '200px'}) {

    const [visibility, setVisibility] = useState(false)
    const [file, setFile] = useState('')

    const fileInput = useRef();


    const editPhoto = async (event) => {
/*         let tempFile = (event.target.files[0])
        let blob = tempFile.slice(0, tempFile.size, 'image/jpeg'); 
        let newFile = new File([blob], `${tempFile.name}`, {type: 'image/jpeg'}); */
        setFile(event.target.files[0])
        setVisibility(true)
    }

    const afterUpload = async (filename) => {
        setPicture(`${filename}`)


        setVisibility(false)
        setModified(true)
        
    }

    const cancelItem = (event) => {
        event.preventDefault();
        setVisibility(false)
    }
 
    return (
        <>
            <ProfilePhoto style = {{height: height, width: width}} src = {picture === '' ? `${silhouette}` : `/api/get/image/${picture}`} alt="profile-img" id="profile-img" onClick={() => fileInput.current.click()}/>
            <input ref={fileInput}type="file" onChange= {editPhoto} style={{display: 'none'}} id="profile-file"/>
            {visibility ? <><PhotoEditor username={username} file={file} cancel={cancelItem} afterUpload={afterUpload}/><Overlay setVisibility={setVisibility}/></> : <></>}
        </>
    )
}

export default ProfileImage
