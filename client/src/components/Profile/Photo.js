import React, {useRef, useState} from 'react'
import silhouette from '../../images/silhouette.png'
import '../../styles/Photo.css'
import Confirm from '../Confirm'
import Img from 'react-fix-image-orientation'
import axios from 'axios'
import Overlay from '../Overlay'
import {UserPhoto, UserPhotoContainer} from '../GeneralStyles'
import {DeleteButton} from '../PopUpStyles'

function Photo({itemNum, photo, photos, setPhotos, username, editable=false, setModified}) {
    
    const photoInput = useRef();

    const [visible, setVisibility] = useState(false);

    const handleImgChange = async (event) => {
        //check size of image
        const file = event.target.files[0]
        if(file.size < 1000000){
            //add photo to backend
            let formData = new FormData();
            formData.append('file', file)
            formData.append('username',username)
            let imgResponse = await axios.post('/upload-img', formData)
            console.log(imgResponse.data)

            //add photo name to photos array
            let tempPhotos = photos;
            let idVal = `photo-${itemNum}`;
            tempPhotos[itemNum] = `${file.name}`
            setPhotos(tempPhotos);

            //read the new photo
            const imgTag = document.getElementById(idVal);
            const reader = new FileReader();
            reader.addEventListener("load", function () { imgTag.src = reader.result }, false);
            reader.readAsDataURL(file)

            setModified(true)

        }else{
            alert('Image size too large! please ensure photo is less than 1MB')
        }
    }

    const confirmDeletion = (event) => {
        event.preventDefault();
        setVisibility(true)
    }

    const cancelItem = (event) => {
        event.preventDefault();
        setVisibility(false)
    }

    const deleteItem = () => {
        let tempPhotos = [...photos];
        tempPhotos.splice(itemNum, 1)
        setPhotos(tempPhotos);
        setVisibility(false)
        setModified(true)
    }
    

    return (
        <UserPhotoContainer>
            {editable === true ? 
                <>
                    <DeleteButton onClick={confirmDeletion}>x</DeleteButton> 
                    <UserPhoto src = {!photo ? silhouette : `/api/get/image/${photo}`} alt="profile-img" id={`photo-${itemNum}`} onClick={() => photoInput.current.click()}/>
                    <input ref = {photoInput} type="file" onChange= {handleImgChange} style={{display: 'none'}} id = {`fi-${itemNum}`}/>
                </>
                : <UserPhoto src = {photo === '' ? silhouette : `/api/get/image/${photo}`} alt="profile-img" id={`photo-${itemNum}`} style = {{cursor: "auto"}}/>}
            {visible === true ? <><Confirm message={`Are you sure you want to delete photo ${itemNum+1}?`} cancel={cancelItem} confirm={deleteItem} /><Overlay setVisibility={setVisibility}/></> : <></>}
        </UserPhotoContainer>
    )
}

export default Photo
