import React, {useRef, useState} from 'react'
import silhouette from '../../images/silhouette.png'
import Confirm from '../Confirm'
import Overlay from '../Overlay'
import {UserPhoto, UserPhotoContainer} from '../GeneralStyles'
import {DeleteButton} from '../PopUpStyles'
import PhotoEditor from '../PhotoEditor'

function Photo({itemNum, photo, photos, setPhotos, username, editable=false, setModified}) {
    
    const photoInput = useRef();

    const [deleteVisibility, setDeleteVisibility] = useState(false);
    const [editVisibility, setEditVisibility] = useState(false);
    const [file, setFile] = useState('')



    const editPhoto = async (event) => {
        setFile(event.target.files[0])
        setEditVisibility(true)
    }

    const afterUpload = (filename) => {

        let tempPhotos = [...photos];
        tempPhotos[itemNum] = `${filename}`
        setPhotos(tempPhotos);

            //read the new photo
        const imgTag = document.getElementById(`photo-${itemNum}`);
        const reader = new FileReader();
        reader.addEventListener("load", function () { imgTag.src = `/api/get/image/${filename}` }, false);
        reader.readAsDataURL(file)


        setEditVisibility(false)
        setModified(true)
    }

    const confirmDeletion = (event) => {
        event.preventDefault();
        setDeleteVisibility(true)
    }

    const cancelItem = (event) => {
        event.preventDefault();
        setDeleteVisibility(false)
    }

    const deleteItem = () => {
        let tempPhotos = [...photos];
        tempPhotos.splice(itemNum, 1)
        setPhotos(tempPhotos);
        setDeleteVisibility(false)
        setModified(true)
    }
    

    return (
        <UserPhotoContainer>
            {editable === true ? 
                <>
                    <DeleteButton onClick={confirmDeletion}>x</DeleteButton> 
                    <UserPhoto src = {!photo ? silhouette : `/api/get/image/${photo}`} alt="profile-img" id={`photo-${itemNum}`} onClick={() => photoInput.current.click()}/>
                    <input ref = {photoInput} type="file" onChange= {editPhoto} style={{display: 'none'}} id = {`fi-${itemNum}`}/>
                </>
                : <UserPhoto src = {photo === '' ? silhouette : `/api/get/image/${photo}`} alt="profile-img" id={`photo-${itemNum}`} style = {{cursor: "auto"}}/>}
            {deleteVisibility === true ? <><Confirm message={`Are you sure you want to delete photo ${itemNum+1}?`} cancel={cancelItem} confirm={deleteItem} /><Overlay setVisibility={setDeleteVisibility}/></> : <></>}
            {editVisibility ? <><PhotoEditor username={username} file={file} cancel={cancelItem} afterUpload={afterUpload}/><Overlay setVisibility={setEditVisibility}/></> : <></>}
        </UserPhotoContainer>
    )
}

export default Photo
