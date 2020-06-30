import React, {useRef, useState} from 'react'
import silhouette from '../../images/silhouette.png'
import '../../styles/Photo.css'
import Confirm from '../Confirm'

function Photo({input, itemNum, photo, files, photos, setFiles, setPhotos, username, editable=false, dbID, deletePhoto, setModified}) {
    const photoInput = useRef();

    const [visible, setVisibility] = useState(false);

    const handleImgChange = (event) => {
        setModified(true)
        console.log(event.target);
        let fileArray = files;
        let tempPhotos = photos;
        fileArray.push(event.target.files[0])
        setFiles(fileArray);
        let idVal = `photo-${itemNum}`;
        tempPhotos[itemNum] = `${username}-${event.target.files[0].name}`
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

    const confirmDeletion = (event) => {
        event.preventDefault();
        setVisibility(true)
    }

    const cancelItem = (event) => {
        event.preventDefault();
        setVisibility(false)
    }

    const deleteItem = () => {
        deletePhoto(itemNum)
        setVisibility(false)
    }
    

    return (
        <div className = "photo">
            {editable === true ? <button className="delete-mi-btn" onClick={confirmDeletion}>x</button> : <></>}
            {input === true ? <img src = {photo === '' ? silhouette : `/api/get/image/${photo}`} alt="profile-img" id={`photo-${itemNum}`} onClick={() => photoInput.current.click()}/> : <img src = {photo === '' ? silhouette : `/api/get/image/${photo}`} alt="profile-img" id={`photo-${itemNum}`} style = {{cursor: "auto"}}/>}
            {input === true ? <input ref = {photoInput} type="file" onChange= {handleImgChange} style={{display: 'none'}} id = {`fi-${itemNum}`}/> : <></>}
            {visible === true ? <Confirm message={`Are you sure you want to delete photo ${itemNum+1}?`} cancel={cancelItem} confirm={deleteItem} /> : <></>}
        </div>
    )
}

export default Photo
