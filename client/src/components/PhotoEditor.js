import React, {useState, useRef, useEffect} from 'react'
import AvatarEditor from 'react-avatar-editor'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

function PhotoEditor({sliderMin=1, sliderMax=1.5, sliderStep=.025, afterUpload, username, file, cancel}) {

    const [scale, setScale] = useState(parseFloat((parseFloat(sliderMax) + parseFloat(sliderMin))/2))
    const [rotate, setRotate] = useState(0)
    const [photoName, setPhotoName] = useState('')
    const [isLoading, setLoading] = useState(false)

    const editorRef = useRef();

    useEffect(() => {

        const displayPhoto = async() => {
            let formData = new FormData();
            formData.append('file', file)
            formData.append('username',username)

            setLoading(true)
            let imgResponse = await axios.post('/upload-img', formData)
            console.log(imgResponse.data)

            setPhotoName(`${imgResponse.data.fileName}`)
            setLoading(false)
    }

        displayPhoto()
        
    }, [file, username])

    const onClickSave = async () => {
        
        //convert canvas to file
        const canvas = editorRef.current.getImage().toDataURL();
        let res = await fetch(canvas)
        let blob = await res.blob()
        let file = await new File([blob], photoName);

        //submit file
        let formData = new FormData();
        formData.append('file', file)
        formData.append('username',username)

        let imgResponse = await axios.post('/upload-img', formData)

        afterUpload(imgResponse.data.fileName)

        /* let tempPhotos = [...photos];
        tempPhotos[itemNum] = `${imgResponse.data.fileName}`
        setPhotos(tempPhotos)
        setModified(true)
        setLoading(false)
        setVisibility(false) */

    }

    return (
        <div className = "image-editor-container">
            {isLoading ? <Spinner animation="border" variant='info'/> : <></>}
            <AvatarEditor
                    ref={editorRef}
                    image={`/api/get/image/${photoName}`}
                    width={250}
                    height={250}
                    border={0}
                    color={[0, 0, 0, 0.6]} // RGBA
                    scale={parseFloat(scale)}
                    rotate={rotate}
                />
                <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '100%'}}>
                    <input id="scale-slider" type="range" min={sliderMin} max={sliderMax} value={scale} step={sliderStep} onChange={(e) => setScale(e.target.value)}/>
                    <Button variant="info" style ={{marginTop: '10px'}} onClick={() => setRotate(rotate + 90)} >Rotate</Button>
                </div>
                <Button style ={{marginTop: '20px'}} onClick={onClickSave} block>Add Photo</Button>
                <button type = "button" className ="cancel-btn" onClick={cancel}>x</button>
                </div>
    )
}

export default PhotoEditor
