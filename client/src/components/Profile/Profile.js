import React, {useEffect, useState, useContext} from 'react'
import '../../styles/Profile.css'

import axios from 'axios'
import Photos from './Photos'
import Menu from './Menu'
import {UserContext} from '../UserContext'
import Button from 'react-bootstrap/Button'
import Input from '../Input'
import TextArea from '../TextArea'
import ProfileImage from './ProfileImage'
import CookToggle from './CookToggle'
import BankAccountInfo from './BankAccountInfo'

function Profile() {
    let {user, menu} = useContext(UserContext)
    console.log('PROFILE USER CONTEXT', user, menu)

    const [modified, setModified] = useState(false);
    const [tempMenuItems, setTempMenuItems] = useState([])
    const [itemsToBeDeleted, setItemsToBeDeleted] = useState([])

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
    const [identification, setIdentification] = useState('')
    const [menuItems, setMenuItems] = useState([])
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
            setIdentification(user._id) 
            setNumber(user.number)
            setBankAccountID(user.bank_account_id)

            setModified(false)

        }

        if(menu !== null){
            setMenuItems(menu)
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
            axios.post('/update-user', userData)
            .catch(err => console.log(err))

            //update menu item info
            axios.post('/post/add-menu-items', tempMenuItems)

            //delete items if needed
            if(itemsToBeDeleted.length > 0 ){itemsToBeDeleted.map(element => axios.post(`/api/post/remove-item/${element}`))}

            
            alert('Profile Updated')
            setModified(false)
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
        user ?
        <div>
            <div className = "profile-container">
                <div className = "user-info">
                        <form  className = "profile-form" onSubmit={handleSubmit} formEncType="multipart/form-data">
                            <div className = "user-description">
                                <ProfileImage picture={picture} setPicture={setPicture} username={user.username}/>
                                <div className = "profile-about">
                                    <Input value = {firstName} setValue={setFirstname} identifier='firstname' labelText="First Name" setModified={setModified}/>
                                    <Input value = {lastName} setValue={setLastname} identifier='lastname' labelText="Last Name" setModified={setModified}/>
                                    <Input value = {username} setValue={setUsername} identifier='username' labelText="Username" setModified={setModified}/>
                                    <Input value = {email} setValue={setEmail} identifier='email' labelText="Email Address" setModified={setModified}/>
                                    <Input value = {number} setValue={setNumber} identifier='number' labelText="Phone Number" setModified={setModified}/>
                                    {/* <CookToggle cook={cook} setCook={setCook} setModified={setModified}/> */}
                                </div>
                            </div>
                            
                            {cook ? <div className = "cook-information" id="cook-info">
                                        <Input value = {cookSpecialty} setValue={setCookSpecialty} identifier='cookSpecialty' labelText="Cook Specialty" setModified={setModified}/>
                                        <TextArea value = {cookDescription} setValue={setCookDescription} identifier='cookDescription' labelText="Cook Description" setModified={setModified}/>
                                        <Input value = {cookPrice} setValue={setCookPrice} identifier='cookPrice' labelText="Cook Price" setModified={setModified}/>
                                        {bankAccountID ? <div>Bank Account Info Complete: {bankAccountID}</div> : <BankAccountInfo user={user} setBankAccountID={setBankAccountID} setModified={setModified}/>}
                                    </div> : <></>}
                            
                            <Photos photos={photos}  setPhotos={setPhotos} username={user.username} setModified={setModified}/>
                            {cook ? <Menu identification = {identification} username={user.username} menuItems={menuItems} setMenuItems = {setMenuItems} editable={true} setTempMenuItems={setTempMenuItems} tempMenuItems={tempMenuItems} itemsToBeDeleted={itemsToBeDeleted} setItemsToBeDeleted={setItemsToBeDeleted} setModified={setModified}/>:<></>}
                            <div className="update-btn-container">
                                {!modified ? <Button className="user-update-btn" id = "profile-update-btn" variant = 'secondary' block disabled>Update</Button> : <Button type="submit" className="user-update-btn" id = "profile-update-btn" variant = 'primary' block>Update</Button>}
                                {/* <Button type="submit" className="user-update-btn" id = "profile-update-btn" variant = 'primary' block>Update</Button> */}
                            </div>
                            
                        </form>
                    
                </div>
            </div>
        </div> :
        <></>
    )
}

export default Profile
