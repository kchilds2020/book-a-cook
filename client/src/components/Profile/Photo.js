import React, {useRef} from 'react'
import silhouette from '../../images/silhouette.png'
import '../../styles/Photo.css'

function Photo({input, itemNum, photo, files, photos, setFiles, setPhotos, username, editable=false, dbID, deletePhoto}) {
    const photoInput = useRef();

    const handleImgChange = (event) => {
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

    const deleteItem = (event) => {
        event.preventDefault();
        deletePhoto(itemNum)
    }
    

    return (
        <div className = "photo">
            {editable === true ? <button className="delete-mi-btn" onClick={deleteItem}>x</button> : <></>}
            {input === true ? <img src = {photo === '' ? silhouette : `/api/get/image/${photo}`} alt="profile-img" id={`photo-${itemNum}`} onClick={() => photoInput.current.click()}/> : <img src = {photo === '' ? silhouette : `/api/get/image/${photo}`} alt="profile-img" id={`photo-${itemNum}`} style = {{cursor: "auto"}}/>}
            {input === true ? <input ref = {photoInput} type="file" onChange= {handleImgChange} style={{display: 'none'}} id = {`fi-${itemNum}`}/> : <></>}
        </div>
    )
}

export default Photo
