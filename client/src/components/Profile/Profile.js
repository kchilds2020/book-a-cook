import React, {useEffect, useState, useContext} from 'react'

import axios from 'axios'
import Photos from './Photos'
import {UserContext} from '../UserContext'
import InputWithLabel from '../InputComponents/Input'
import TextAreaWithLabel from '../InputComponents/TextArea'
import ProfileImage from './ProfileImage'
import {Container, PageHeader} from '../GeneralStyles'
import {ProfileForm, BasicInfo, BasicDetails, ProfileHeader, UpdateButton} from './ProfileStyles'

function Profile() {
    let {user, menu} = useContext(UserContext)
    console.log('PROFILE USER CONTEXT', user, menu)

    const [modified, setModified] = useState(false)

    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [cook, setCook] = useState('')
    const [cookDescription, setCookDescription] = useState('')
    const [cookSpecialty, setCookSpecialty] = useState('')
    const [cookPrice, setCookPrice] = useState('')
    const [picture, setPicture] = useState('')
    const [photos, setPhotos] = useState([])
    const [number, setNumber] = useState('');
    const [bankAccountID, setBankAccountID] = useState('');


    

    useEffect(() => {
        if(user !== null){
            setFirstname(user.firstName)
            setLastname(user.lastName)
            setUsername(user.username)
            setEmail(user.email)
            setCook(user.cook)
            setCookDescription(user.cookDescription)
            setCookSpecialty(user.cookSpecialty)
            setCookPrice(user.cookPrice)
            setPicture(user.picture)
            setPhotos(user.photos)
            setNumber(user.number)
            setBankAccountID(user.bank_account_id)

            setModified(false)

        }
    },[user, menu])



    const handleSubmit = async (event) =>{
        event.preventDefault();
        let checks = formatPhoneNumber(number)
        if(checks === true){
            console.log(photos);
            const userData = {
                firstname: firstName,
                lastname: lastName,
                username: username,
                email: email,
                cook: cook,
                cookSpecialty: cookSpecialty,
                cookDescription: cookDescription,
                cookPrice: cookPrice,
                picture: picture,
                photos: photos,
                number: number,
                bank_account_id: bankAccountID,
            }

            //update user info
            try{
                axios.post('/update-user', userData)
                alert('Profile Updated')
                setModified(false)
            }catch(error){ console.log(error)}

            
            
        }
    }

    let formatPhoneNumber = (str) => {
        //Filter only numbers from the input
        let cleaned = ('' + str).replace(/\D/g, '');
        
        //Check if the input is of correct length
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      
        if (match) {
          setNumber('(' + match[1] + ') ' + match[2] + '-' + match[3])
          return true
        }
        else{
            alert('Invalid Phone Number')
            return false
        }
    };

    return (
        user ? <Container>
                <PageHeader>Profile</PageHeader>
                        <ProfileForm onSubmit={handleSubmit} formEncType="multipart/form-data">
                            <ProfileHeader>{firstName}'s Details</ProfileHeader>
                            <BasicInfo>      
                                <ProfileImage picture={picture} setPicture={setPicture} username={user.username} setModified={setModified}/>
                                <BasicDetails>
                                    <InputWithLabel value = {firstName} setValue={setFirstname} identifier='firstname' labelText="First Name" setModified={setModified}/>
                                    <InputWithLabel value = {lastName} setValue={setLastname} identifier='lastname' labelText="Last Name" setModified={setModified}/>
                                    <InputWithLabel value = {username} setValue={setUsername} identifier='username' labelText="Username" setModified={setModified}/>
                                    <InputWithLabel value = {email} setValue={setEmail} identifier='email' labelText="Email Address" setModified={setModified}/>
                                    <InputWithLabel value = {number} setValue={setNumber} identifier='number' labelText="Phone Number" setModified={setModified}/>
                                </BasicDetails>  
                            </BasicInfo>

                            {cook ? <div style={{padding: '20px'}}>
                                    <ProfileHeader>Cook Details</ProfileHeader>
                                        <InputWithLabel value = {cookSpecialty} setValue={setCookSpecialty} identifier='cookSpecialty' labelText="Cook Specialty" setModified={setModified}/>
                                        <TextAreaWithLabel value = {cookDescription} setValue={setCookDescription} identifier='cookDescription' labelText="Cook Description" setModified={setModified}/>
                                        <InputWithLabel value = {cookPrice} setValue={setCookPrice} identifier='cookPrice' labelText="Cook Price" setModified={setModified}/>
                                    </div> : <></>}
                            
                            <ProfileHeader>Photos</ProfileHeader>
                            <Photos photos={photos}  setPhotos={setPhotos} username={user.username} setModified={setModified}/>
                            {!modified ? <UpdateButton id = "profile-update-btn" variant = 'secondary' block disabled>Update</UpdateButton> : <UpdateButton type="submit" id = "profile-update-btn" variant = 'primary' block>Update</UpdateButton>}
                            
                        </ProfileForm>
                    
            </Container> :
        <></>
    )
}

export default Profile
