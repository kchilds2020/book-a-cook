import React, {useRef, useState, useEffect} from 'react'
import Photo from './Photo'
import axios from 'axios'

function Photos({photos, files, setPhotos, setFiles, username, setModified, uploadImage}) {
    const[count,setCount] = useState(0);
    const photoInput = useRef();

    useEffect(() => {
        console.log('PHOTOS',photos)
    },[count])

    const handleImgChange = async(event) => {
        //update files
        if(event.target.files[0].size < 1000000){
            console.log('FILESIZE', event.target.files[0])
            let fileArray = files;
            fileArray.push(event.target.files[0])
            setFiles(fileArray);


            let formData = new FormData();
            formData.append('file', event.target.files[0])
            formData.append('username',username)
            let imgResponse = await axios.post('/upload-img', formData)
            console.log('IMAGE RESPONSE',imgResponse)

        

            //update photos
            let tempPhotos = photos;
            tempPhotos.push(`${imgResponse.data.fileName}`)
            setPhotos(tempPhotos);

            

            
            console.log('photos', photos)
            setCount(count + 1 )
            setModified(true)
        }else{
            alert('Image size too large! please ensure photo is less than 1MB')
        }
        
    }

    const deletePhoto = (itemID) => {
        let tempPhotos = photos;
        tempPhotos.splice(itemID, 1)
        setPhotos(tempPhotos);
        setCount(count + 1 )

        setModified(true)

    }
    return (
        <>
            {photos.map((element,index) => <Photo key={index} input={true} itemNum = {index} photo={element} files={files} photos={photos} setFiles={setFiles} setPhotos={setPhotos} username={username} editable={true} deletePhoto={deletePhoto} setModified={setModified} uploadImage={uploadImage}/>)}
            <div className = "photo">
                <img src={'/api/get/image/add-photo.png'} alt="createItem" style={{width: "250px", height: "250px", cursor:"pointer"}} id="add-photo-btn" onClick={() => photoInput.current.click()}/>
            </div>
            <input ref = {photoInput} type="file" onChange= {handleImgChange} style={{display: 'none'}} id = {`fi-${photos.length}`}/>
        </>
    )
}

export default Photos
