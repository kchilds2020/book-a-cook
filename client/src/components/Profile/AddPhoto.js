import React, {useRef, useState} from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import AvatarEditor from 'react-avatar-editor'

function AddPhoto({itemNum, photos, setPhotos, username, setModified}) {
    
    const [isLoading, setLoading] = useState(false)
    const [visibility, setVisibility] = useState(false)
    const [editedPhoto, setEditedPhoto] = useState('')
    const [photoName, setPhotoName] = useState('')
    const [rotate, setRotate] = useState(0)
    const photoInput = useRef();

    const editorRef = useRef();

    const editPhoto = async (event) => {
        //check size of image
        const file = event.target.files[0]
        if(file.size < 1000000){
            //add photo to backend
            let formData = new FormData();
            formData.append('file', file)
            formData.append('username',username)
            setLoading(true)
            let imgResponse = await axios.post('/upload-img', formData)
            console.log(imgResponse.data)

            //add photo name to photos array
            /* let tempPhotos = [...photos];
            tempPhotos[itemNum] = `${username}-${file.name}`
            setPhotos(tempPhotos);

            setModified(true) */
            setPhotoName(`${username}-${file.name}`)
            setLoading(false)
            setVisibility(true)

        }else{
            alert('Image size too large! please ensure photo is less than 1MB')
        }
    }


    const onClickSave = async () => {
        
        const canvas = editorRef.current.getImage().toDataURL();
        console.log(canvas)
        let res = await fetch(canvas)
        let blob = await res.blob()
        let file = await new File([blob], photoName);
        console.log(file)


        let formData = new FormData();
        formData.append('file', file)
        formData.append('username',username)
        setLoading(true)
        let imgResponse = await axios.post('/upload-img', formData)
        console.log(imgResponse)

        let tempPhotos = [...photos];
        tempPhotos[itemNum] = `${imgResponse.data.fileName}`
        setPhotos(tempPhotos)
        setModified(true)
        setLoading(false)
        setVisibility(false)

    }

    return (
        <>
            
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '250px', height: '100px', margin: 'auto 10px'}}>
                <Button onClick={() => photoInput.current.click()} style ={{height: '50px', width: '50px', borderRadius: '40px', fontWeight: 'bold', boxShadow: '0px 0px 4px #333', fontSize: '18px'}}>+</Button>
                <input ref = {photoInput} type="file" onChange= {editPhoto} style={{display: 'none'}} id = {`fi-${itemNum}`}/>
                {isLoading ? <Spinner animation="border" variant='info'/> : <></>}
                
            </div>

            {visibility ? <div className = "image-editor-container"><AvatarEditor
                    ref={editorRef}
                    image={`/api/get/image/${photoName}`}
                    width={250}
                    height={250}
                    border={0}
                    color={[0, 0, 0, 0.6]} // RGBA
                    scale={1.2}
                    rotate={rotate}
                /><Button onClick={() => setRotate(rotate + 90)}>Rotate</Button><Button style ={{marginLeft: '10px'}} onClick={onClickSave}>Get Image</Button></div> : <></>}
        </>
    )
}

export default AddPhoto
