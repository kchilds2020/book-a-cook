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
/*                 setPicture(response.data.picture); */
            }
        })
        .catch(error => {
            console.log('Something went wrong!');
        })


        return () => mounted = false;
    }, [identification])

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email
        }
        
        axios.post('/update-user', data)
        .then(response => {
            console.log(response.data)
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <NavBar />
            <div className = "profile-container">
                <div className = "user-info">
                    <h2>User Information</h2>
                        <form onSubmit={handleSubmit} >
                            <div className = "user-description">
                                <div className = "profile-picture">
                                    <img src = {silhouette} alt="profile-img"/>
                                    <input type="file" />
                                </div>
                                <div className = "profile-about">
                                    <input name = "firstname" type = "text" className = "inputFields user-input" maxLength = '40' defaultValue = {firstname} onChange = {ev => setFirstname(ev.target.value)} required/>
                                    <input name = "lastname" type = "text" className = "inputFields user-input" maxLength = '40' defaultValue = {lastname} onChange = {ev => setLastname(ev.target.value)} required/>
                                    <input name = "username" type = "text" className = "inputFields user-input" maxLength = '40' defaultValue = {username} onChange = {ev => setUsername(ev.target.value)} required/>
                                    <input name = "email" type = "text" className = "inputFields user-input" maxLength = '40' defaultValue = {email} onChange = {ev => setEmail(ev.target.value)} required/>  
                                    <div className = "cook-toggle">
                                        <span className ="toggle-text">Are you a Cook?  </span>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
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
