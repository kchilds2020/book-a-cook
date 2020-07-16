import React, {useState, useRef} from 'react'
import Button from 'react-bootstrap/Button'
import {Input, FlexDirectionRow} from '../GeneralStyles'
import InputWithLabel from '../InputComponents/Input'
import PhotoEditor from './PhotoEditor'
import axios from 'axios'

function CreateMenuItem({user, setOpen}) {
    const [visibility, setVisibility] = useState(false)
    const [file, setFile] = useState('')
    const [photoName, setPhotoName] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [servingNum, setServingNum] = useState(0)

    const menuFileInput = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(photoName){
            const data = {
                userID: user._id,
                username: user.username,
                title: title,
                description: description,
                price: price,
                picture: photoName,
                longitude: user.longitude,
                latitude: user.latitude
    
            }

            console.log('test')
            try {
                let response = await axios.post('/post/add-menu-items', [data])
                console.log('ADD MENU RESPONSE', response)
            } catch (error) {
                console.log(error)
            }

            alert('item has been created')
            setOpen(false)
        
        }else{alert('Please add an image')}
    }

    const handleImageChange = (event) => {
        event.preventDefault()
        setFile(event.target.files[0])
        setVisibility(true)
    } 

    const afterUpload = (filename) => {
        console.log('do stuff here after')
        setPhotoName(`${filename}`)
        setVisibility(false)
    }
    const cancel = (e) => {
        e.preventDefault()
        setVisibility(false)
    }

    return (     
        <>
            {visibility ? 
            <PhotoEditor file={file} username={user.username} afterUpload={afterUpload} cancel={cancel}/>
             : <form onSubmit = {handleSubmit} style = {{backgroundColor: 'white', padding: '20px', borderRadius: '8px', position: 'fixed', maxWidth: '300px', zIndex: '100', top: '50%', left: '50%', WebkitTransform: 'translate(-50%,calc(-50% - .5%))', msTransform: 'translate(-50%,calc(-50% - .5%))', OTransform: 'translate(-50%,calc(-50% - .5%))', transform: 'translate(-50%,calc(-50% - .5%))' }}>
             <FlexDirectionRow><h3>Create menu item</h3></FlexDirectionRow>
            <FlexDirectionRow>{photoName ? <img src={`/api/get/image/${photoName}`} alt={`${photoName}`} style ={{width: '150px', height: '150px', borderRadius: '8px'}} onClick={() => menuFileInput.current.click()}/> : <Button variant="info" onClick={() => menuFileInput.current.click()} style={{borderRadius:'40px', width: '50px', height: '50px', fontWeight: 'bold', fontSize: '18px'}}>+</Button>}</FlexDirectionRow>
                
                <input  name = 'file' ref={menuFileInput} id='file' type="file" onChange={handleImageChange} style={{visibility: 'hidden', height: '0px'}}/>
                <Input id='title' placeholder='Title of Food' value = {title} onChange = {(e) => setTitle(e.target.value)}/>
                <Input id='description' placeholder='Description' value = {description} onChange = {(e) => setDescription(e.target.value)}/>  
                <Input id='serving-number' placeholder='Number of Servings' onChange={(e) => setServingNum(e.target.value)} type='number'/>
                <Input id='price' placeholder='Price of Servings' onChange={(e) => setPrice(e.target.value)} type='number'/>
                <Button type='submit' style={{marginTop: '5px'}} block>Submit</Button>

            </form>}
        </>
    )
}

export default CreateMenuItem
