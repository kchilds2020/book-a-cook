import React, {useState, useRef, useEffect} from 'react'
import AvatarEditor from 'react-avatar-editor'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import {PopUp} from './PopUpStyles'
import {FlexDirectionColumn, FlexDirectionRow, FixedCenter} from '../GeneralStyles'
import shrinkPhotoSize from '../utilities/shrinkPhotoSize'

function PhotoEditor({sliderMin=1, sliderMax=1.5, sliderStep=.025, afterUpload, username, file}) {

    const [scale, setScale] = useState(parseFloat((parseFloat(sliderMax) + parseFloat(sliderMin))/2))
    const [rotate, setRotate] = useState(0)
    const [photoName, setPhotoName] = useState('')
    const [isLoading, setLoading] = useState(false)

    const editorRef = useRef();

    useEffect(() => {

        const displayPhoto = async() => {
            /* var blob = file.slice(0, file.size, 'image/jpeg'); 
            let newFile = new File([blob], `${username}-${file.name}`, {type: 'image/jpeg'}); */

            let formData = new FormData();
            formData.append('file', file)
            formData.append('username',username)

            setLoading(true)
            try{
                let imgResponse = await axios.post('/modify-img', formData)
                console.log(imgResponse.data)
                setPhotoName(`${imgResponse.data.fileName}`)
                setLoading(false)
            }catch(error){console.log(error)}
    }

        displayPhoto()
        
    }, [file, username])

    const onClickSave = async () => {
        
        //convert canvas to file
        const canvas = editorRef.current.getImage().toDataURL("image/jpeg",0.8);
        let res = await fetch(canvas)
        let blob = await res.blob()
        let file = await new File([blob], photoName);

        //submit file
        let formData = new FormData();
        formData.append('file', file)
        formData.append('username',username)
        setLoading(true)
        let imgResponse = await axios.post('/upload-img', formData)
        setLoading(false)

        afterUpload(imgResponse.data.fileName)

        /* let tempPhotos = [...photos];
        tempPhotos[itemNum] = `${imgResponse.data.fileName}`
        setPhotos(tempPhotos)
        setModified(true)
        setLoading(false)
        setVisibility(false) */

    }

    return (
        <PopUp>
            <FlexDirectionColumn style={{alignItems: 'center'}}>
                {isLoading ? <FixedCenter><Spinner animation="border" variant='info'/></FixedCenter> : <></>}
                <AvatarEditor
                        ref={editorRef}
                        image={`/api/get/image/${photoName}`}
                        width={250}
                        height={250}
                        border={0}
                        color={[0, 0, 0, 0.6]} // RGBA
                        scale={parseFloat(scale)}
                        rotate={rotate}
                        margin='auto'
                    />
                    <FlexDirectionRow>
                        <input id="scale-slider" type="range" min={sliderMin} max={sliderMax} value={scale} step={sliderStep} onChange={(e) => setScale(e.target.value)}/>
                        <Button variant="info" style ={{marginTop: '10px'}} onClick={() => setRotate(rotate + 90)} >Rotate</Button>
                    </FlexDirectionRow>
                    <Button style ={{marginTop: '20px'}} onClick={onClickSave} block>Add Photo</Button>
            </FlexDirectionColumn>
        </PopUp>
    )
}

export default PhotoEditor
