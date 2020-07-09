import React, {useRef, useEffect} from 'react'
import Photo from './Photo'
import AddPhoto from './AddPhoto'

function Photos({photos, setPhotos, username, setModified}) {

    return (
        <>
            <div className="profile-header">Photos</div>
            <div className = "photos-container" id="cook-info">
                <div className = "images">
                    {photos.map((element,index) => <Photo key={index} itemNum = {index} photo={element} photos={photos} setPhotos={setPhotos} username={username} editable={true} setModified={setModified}/>)}
                    <AddPhoto itemNum = {photos.length} photo={'add-photo.png'} photos={photos} setPhotos={setPhotos} username={username} setModified={setModified}/>
                </div>
            </div>
        </>
    )
}

export default Photos
