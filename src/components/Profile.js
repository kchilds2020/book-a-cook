import React, {useEffect, useState} from 'react'
import NavBar from './NavBar'
import '../styles/Profile.css'
import silhouette from '../images/silhouette.png'
import axios from 'axios'

function Profile({identification}) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [cookSpecialty, setCookSpecialty] = useState('');
    const [cookDescription, setCookDescription] = useState('');
    const [cookPrice, setCookPrice] = useState('');
    const [checked, setToggle] = useState(false);

    /* const [picture, setPicture] = useState(''); */

    console.log('IDENTIFICATION', identification);

    useEffect( () => {
        let mounted = true;
        axios.get(`/api/get/userid/${identification}`)
        .then(response => {
            if(mounted){
                setFirstname(response.data.firstName);
                setLastname(response.data.lastName);
                setEmail(response.data.email);
                setUsername(response.data.username);
                setToggle(response.data.cook[0]);
                setCookSpecialty(response.data.cookSpecialty);
                setCookDescription(response.data.cookDescription);
                setCookPrice(response.data.cookPrice);
               
            }
        })
        .catch(error => {
            console.log('Something went wrong!');
        })

        

        return () => mounted = false;
    }, [identification, checked])

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            cook: checked,
            cookSpecialty: cookSpecialty,
            cookDescription: cookDescription,
            cookPrice: cookPrice
        }
        
        axios.post('/update-user', data)
        .then(response => {
            console.log(response.data)
        })
        .catch(err => console.log(err))
    }

    const checkToggle = () => {
        if(!checked){
            setToggle(true);
            document.getElementById('cook-info').style.visibility = 'visible';
            document.getElementById('cook-info').style.height = 'auto';
        }else{
            setToggle(false);
            document.getElementById('cook-info').style.visibility = 'hidden';
            document.getElementById('cook-info').style.height = '0px';
        }
    }

    return (
        <div>
            <NavBar />
            <div className = "profile-container">
                <div className = "user-info">
                        <form  className = "profile-form" onSubmit={handleSubmit} >
                            <h2>User Information</h2>
                            <div className = "user-description">
                                <div className = "profile-picture">
                                    <img src = {silhouette} alt="profile-img"/>
                                    <input type="file" />
                                </div>
                                <div className = "profile-about">
                                    <input name = "firstname" type = "text" className = "user-input" maxLength = '40' defaultValue = {firstname} onChange = {ev => setFirstname(ev.target.value)} required/>
                                    <input name = "lastname" type = "text" className = "user-input" maxLength = '40' defaultValue = {lastname} onChange = {ev => setLastname(ev.target.value)} required/>
                                    <input name = "username" type = "text" className = "user-input" maxLength = '40' defaultValue = {username} onChange = {ev => setUsername(ev.target.value)} required/>
                                    <input name = "email" type = "text" className = "user-input" maxLength = '40' defaultValue = {email} onChange = {ev => setEmail(ev.target.value)} required/>  
                                    <div className = "cook-toggle">
                                        <span className ="toggle-text">Are you a Cook?  </span>
                                        <label className="switch">
                                            <input type="checkbox" id="cook-checkbox" onChange={checkToggle}/>
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div className = "cook-information" id="cook-info">
                            <h2>Cook Information</h2>
                                <div className = "cook-about">
                                    <input name = "cookSpecialty" type = "text" placeholder = "Specialty" className = "cook-input" maxLength = '40' defaultValue = {cookSpecialty} onChange = {ev => setCookSpecialty(ev.target.value)} required/> 
                                    <textarea name = "cookDescription" type = "text" placeholder = "Description" className = "cook-input" maxLength = '40' defaultValue = {cookDescription} onChange = {ev => setCookDescription(ev.target.value)} required/>
                                    <input name = "cookPrice" type = "text" placeholder = "Price" className = "cook-input" maxLength = '40' defaultValue = {cookPrice} onChange = {ev => setCookPrice(ev.target.value)} required/>
                                </div>
                                
                            </div>
                            <input type="submit" value="Update" className = "user-update-btn"/>
                        </form>
                    
                </div>
            </div>
        </div>
    )
}

export default Profile
