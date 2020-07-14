import React, {useState, useContext} from 'react'
import InputWithLabel from '../InputComponents/Input'
import TextAreaWithLabel from '../InputComponents/TextArea'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import {UserContext} from '../UserContext'
import Spinner from 'react-bootstrap/Spinner'
import {FixedCenter, FlexDirectionRow} from '../GeneralStyles'
import ProfileImage from '../Profile/ProfileImage'

function CookRegistration() {
    let {user, menu} = useContext(UserContext)
    console.log('COOK REGISTRATION USER CONTEXT', user, menu)

    const [cookSpecialty, setCookSpecialty] = useState('')
    const [cookDescription, setCookDescription] = useState('')
    const [cookPrice, setCookPrice] = useState('')
    const [picture, setPicture] = useState('')
    const [isLoading, setLoading] = useState(false)

    const submitInfo = async (e) => {
        e.preventDefault()
        const data = {
            username: user.username,
            cookDescription: cookDescription,
            cookSpecialty: cookSpecialty,
            cookPrice: cookPrice,
            picture: picture
        }

        try{
            setLoading(true)
            let response = await axios.post('/complete-cook-registration', data)
            console.log(response)
            setLoading(false)
            alert('Profile Has Been Updated')
            window.location.href = '/home'
        }catch(error){
            console.log(error)
        }
    }

    return (
        user ?
        <>
        <form onSubmit={submitInfo} style={{width: '95%', maxWidth: '700px', backgroundColor:'#f4f4f4', margin: '20px auto', padding: '20px', boxShadow: '0px 0px 4px #333', borderRadius: '8px'}}>
            <h2>Complete Your Cook Profile</h2>
            <FlexDirectionRow>
                <ProfileImage picture={picture} setPicture={setPicture} username={user.username}/>
            </FlexDirectionRow>
            <InputWithLabel value={cookSpecialty} setValue={setCookSpecialty} identifier='cook-specialty' labelText='Cook Specialization' />
            <InputWithLabel value={cookPrice} setValue={setCookPrice} identifier='cook-price' labelText='Catering Price Per Person'/>
            <TextAreaWithLabel setValue={setCookDescription} identifier='cook-description' labelText='Cook Description'/>
            
            <Button type="submit">Submit</Button>
        </form> 
        {isLoading ? <FixedCenter><Spinner animation="border" variant="info" /> </FixedCenter> : <></>}
        </>: <></>
    )
}

export default CookRegistration
