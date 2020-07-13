import React, {useState, useRef} from 'react'
import Button from 'react-bootstrap/Button'
import Input from './Input'
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
    
            }

            console.log('test')
            try {
                let response = await axios.post('/post/add-menu-items', [data])
                console.log('ADD MENU RESPONSE', response)
            } catch (error) {
                console.log(error)
            }

            alert('item has been created')
        
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
             : <form onSubmit = {handleSubmit} style = {{backgroundColor: 'white', padding: '20px', boxShadow: '0px 0px 4px #333', borderRadius: '4px', position: 'fixed', maxWidth: '300px', zIndex: '100', top: '50%', left: '50%', WebkitTransform: 'translate(-50%,calc(-50% - .5%))', msTransform: 'translate(-50%,calc(-50% - .5%))', OTransform: 'translate(-50%,calc(-50% - .5%))', transform: 'translate(-50%,calc(-50% - .5%))' }}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>{photoName ? <img src={`/api/get/image/${photoName}`} alt={`${photoName}`} style ={{width: '250px', height: '250px', borderRadius: '8px', boxShadow: '0px 0px 4px #333'}} onClick={() => menuFileInput.current.click()}/> : <Button variant="outline-primary" onClick={() => menuFileInput.current.click()} block>Add Photo</Button>}</div>
                
                <input  name = 'file' ref={menuFileInput} id='file' type="file" onChange={handleImageChange} style={{visibility: 'hidden'}}/>
                {/* {file ? <img src={`${photoName}`} alt='photo'/> : <Button style={{width: '50px', height: '50px', borderRadius: '50px', boxShadow: '0px 0px 4px #333'}}>+</Button>} */}
                
                <Input identifier='title' labelText='Title of Food' value = {title} setValue = {setTitle}/>
                <Input identifier='description' labelText='Description' value = {description} setValue = {setDescription}/>
                <Input identifier='serving-number' labelText='Number of Servings' value = {servingNum} setValue = {setServingNum} type='number'/>
                <Input identifier='price' labelText='Price of Servings' value = {price} setValue = {setPrice} type='number'/>
                
                <Button onClick={() => setOpen(false)} style={{zIndex: '20', position: 'absolute', top: '-10px', right: '-10px', width: '40px', height: '40px', borderRadius: '50px', boxShadow: '2px 2px 4px #333', backgroundColor: 'rgb(212,35,35)', color: 'white', border: 'none'}}>x</Button>
                <Button type='submit' block>Submit</Button>

            </form>}
        </>
    )
}

export default CreateMenuItem
