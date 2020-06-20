import React, {useRef, useEffect, useState} from 'react'
import Photo from './Photo'
function AddPhoto({photos, files, setPhotos, setFiles, username}) {
    const[count,setCount] = useState(0);
    const photoInput = useRef();

    useEffect(() => {
        console.log('PHOTOS UPDATED');
    },[count])

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
            <img src={'/api/get/image/add-photo.png'} alt="createItem" style={{width: "250px", height: "250px", cursor:"pointer"}} id="add-photo-btn" onClick={() => photoInput.current.click()}/>
            <input ref = {photoInput} type="file" onChange= {handleImgChange} style={{display: 'none'}} id = {`fi-${photos.length}`}/>
        </>
    )
}

export default AddPhoto
