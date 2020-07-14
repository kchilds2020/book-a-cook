import React, {useRef, useState} from 'react'
import Button from 'react-bootstrap/Button'
import PhotoEditor from '../PhotoEditor'
import Overlay from '../Overlay'

function AddPhoto({itemNum, photos, setPhotos, username, setModified}) {

    const [visibility, setVisibility] = useState(false)
    const [file, setFile] = useState('')
    const photoInput = useRef();

    const editPhoto = async (event) => {
            setFile(event.target.files[0])
            setVisibility(true)
    }

    const afterUpload = (filename) => {
        let tempPhotos = [...photos];
        tempPhotos[itemNum] = `${filename}`
        setPhotos(tempPhotos)
        setModified(true)
        setVisibility(false)
    }

    const cancelItem = (event) => {
        event.preventDefault();
        setVisibility(false)
    }

    return (
        <>
            
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '250px', height: '100px', margin: 'auto 10px'}}>
                <Button onClick={() => photoInput.current.click()} style ={{height: '50px', width: '50px', borderRadius: '40px', fontWeight: 'bold', boxShadow: '0px 0px 4px #333', fontSize: '18px'}}>+</Button>
                <input ref = {photoInput} type="file" onChange= {editPhoto} style={{display: 'none'}} id = {`fi-${itemNum}`}/>
                
                
            </div>
            {visibility ? <><PhotoEditor username={username} file={file} cancel={cancelItem} afterUpload={afterUpload}/><Overlay setVisibility={setVisibility}/></> : <></>}
        </>
    )
}

export default AddPhoto
