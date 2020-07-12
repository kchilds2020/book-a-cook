import React, {useRef, useState} from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import PhotoEditor from '../PhotoEditor'

function AddPhoto({itemNum, photos, setPhotos, username, setModified}) {
    
    const [isLoading, setLoading] = useState(false)
    const [visibility, setVisibility] = useState(false)
    const [photoName, setPhotoName] = useState('')
    const photoInput = useRef();

    const editPhoto = async (event) => {
        //check size of image
        const file = event.target.files[0]
            //add photo to backend
            let formData = new FormData();
            formData.append('file', file)
            formData.append('username',username)
            setLoading(true)
            let imgResponse = await axios.post('/upload-img', formData)
            console.log(imgResponse.data)

            setPhotoName(`${username}-${file.name}`)
            setLoading(false)
            setVisibility(true)
    }

    const afterUpload = (filename) => {
        let tempPhotos = [...photos];
        tempPhotos[itemNum] = `${filename}`
        setPhotos(tempPhotos)
        setModified(true)
        setVisibility(false)
    }

    return (
        <>
            
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '250px', height: '100px', margin: 'auto 10px'}}>
                <Button onClick={() => photoInput.current.click()} style ={{height: '50px', width: '50px', borderRadius: '40px', fontWeight: 'bold', boxShadow: '0px 0px 4px #333', fontSize: '18px'}}>+</Button>
                <input ref = {photoInput} type="file" onChange= {editPhoto} style={{display: 'none'}} id = {`fi-${itemNum}`}/>
                {isLoading ? <Spinner animation="border" variant='info'/> : <></>}
                
            </div>
            {visibility ? <PhotoEditor sliderMin='1' sliderMax='1.5' sliderStep='.025' photoName={photoName} afterUpload={afterUpload} username={username}/> : <></>}
        </>
    )
}

export default AddPhoto
