import React from 'react'
import Photo from './Photo'
import AddPhoto from './AddPhoto'
import {ImagesContainer} from '../GeneralStyles'


function Photos({photos, setPhotos, username, setModified}) {

    return (
        <ImagesContainer>
            {photos.map((element,index) => <Photo key={index} itemNum = {index} photo={element} photos={photos} setPhotos={setPhotos} username={username} editable={true} setModified={setModified}/>)}
            <AddPhoto itemNum = {photos.length} photo={'add-photo.png'} photos={photos} setPhotos={setPhotos} username={username} setModified={setModified}/>
        </ImagesContainer>
    )
}

export default Photos
