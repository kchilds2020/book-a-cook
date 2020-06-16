import React, {useRef} from 'react'
import silhouette from '../images/silhouette.png'
import '../styles/Photo.css'

function Photo({input, itemNum, handleImgChange, photo,}) {
    const photoInput = useRef();

    

    return (
        <div className = "photo">
            {input === true ? <img src = {photo === '' ? silhouette : `/api/get/image/${photo}`} alt="profile-img" id={`photo-${itemNum}`} onClick={() => photoInput.current.click()}/> : <img src = {photo === '' ? silhouette : `/api/get/image/${photo}`} alt="profile-img" id={`photo-${itemNum}`} style = {{cursor: "auto"}}/>}
            {input === true ? <input ref = {photoInput} type="file" onChange= {handleImgChange} style={{display: 'none'}} id = {`fi-${itemNum}`}/> : <></>}
        </div>
    )
}

export default Photo
