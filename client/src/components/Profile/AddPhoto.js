import React, {useRef} from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

function AddPhoto({itemNum, photos, setPhotos, username, setModified}) {
    
    const photoInput = useRef();

    const addPhoto = async (event) => {
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
            let tempPhotos = [...photos];
            let idVal = `photo-${itemNum}`;
            tempPhotos[itemNum] = `${file.name}`
            setPhotos(tempPhotos);

            setModified(true)
        }else{
            alert('Image size too large! please ensure photo is less than 1MB')
        }
    }
    

    return (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '250px', height: '100px', margin: 'auto 10px'}}>
                <Button onClick={() => photoInput.current.click()} style ={{height: '50px', width: '50px', borderRadius: '40px', fontWeight: 'bold', boxShadow: '0px 0px 4px #333', fontSize: '18px'}}>+</Button>
                <input ref = {photoInput} type="file" onChange= {addPhoto} style={{display: 'none'}} id = {`fi-${itemNum}`}/>
            </div>
    )
}

export default AddPhoto
