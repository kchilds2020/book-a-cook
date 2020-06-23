import React, {useRef, useEffect, useState} from 'react'
import Photo from './Photo'
function Photos({photos, files, setPhotos, setFiles, username}) {
    const[count,setCount] = useState(0);
    const photoInput = useRef();
    const change = useRef(false);

    useEffect(() => {
        console.log('PHOTO CHANGE', photos);

        let updateButton = document.getElementById('profile-update-btn')
        if (change.current){
            updateButton.style.backgroundColor="rgb(115, 165, 212)"
            updateButton.style.cursor="pointer"
            updateButton.style.pointerEvents = "all"
        }
        else
            change.current = true;
    },[count, photos])

    const handleImgChange = (event) => {
        //update files
        let fileArray = files;
        fileArray.push(event.target.files[0])
        setFiles(fileArray);

        //update photos
        let tempPhotos = photos;
        tempPhotos.push(`${username}-${event.target.files[0].name}`)
        setPhotos(tempPhotos);

        setCount(count + 1)
    }

    const deletePhoto = (itemID) => {
        let tempPhotos = photos;
        tempPhotos.splice(itemID, 1)
        setPhotos(tempPhotos);
        setCount(count + 1 )

    }
    return (
        <>
            {photos.map((element,index) => <Photo key={index} input={true} itemNum = {index} photo={element} files={files} photos={photos} setFiles={setFiles} setPhotos={setPhotos} username={username} editable={true} deletePhoto={deletePhoto}/>)}
            <div className = "photo">
                <img src={'/api/get/image/add-photo.png'} alt="createItem" style={{width: "250px", height: "250px", cursor:"pointer"}} id="add-photo-btn" onClick={() => photoInput.current.click()}/>
            </div>
            <input ref = {photoInput} type="file" onChange= {handleImgChange} style={{display: 'none'}} id = {`fi-${photos.length}`}/>
        </>
    )
}

export default Photos
