import React, { useEffect, useState } from 'react'
import axios from 'axios'
import silhouette from '../images/silhouette.png'
import '../styles/UserProfile.css'

function UserProfile() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [cookSpecialty, setCookSpecialty] = useState('');
    const [cookDescription, setCookDescription] = useState('');
    const [cookPrice, setCookPrice] = useState('');
    const [cook, setCook] = useState('');

    useEffect(() =>{
        //get user from url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        setUsername(urlParams.get('user'));

        //get info of user
        axios.get(`/api/get/username/${username}`)
        .then(response => {
            console.log(response.data)
            setEmail(response.data.email)
            setFirstname(response.data.firstName)
            setLastname(response.data.lastName)
            setCookSpecialty(response.data.cookSpecialty)
            setCookDescription(response.data.cookDescription)
            setCookPrice(response.data.cookPrice)
            setCook(response.data.cook)

        })
        .catch(err => console.log(err))

    },[username])

    return (
        <div className="user-profile-container">
            <h2> {username} user info</h2>
            <div className="user-information">
                <div className="user-picture">
                    <img src={silhouette}/>
                </div>
                <div className="user-details">
                    <div className="full-name">{firstname} {lastname}</div>
                    <div className="email">{email}</div>
                </div>
            </div>
            <h2> {username} cook info</h2>
            <div className="user-information">
                {cook ? 
                    <div className="cook-details">
                        <div className="cook-specialty"><b>Specialization:</b> {cookSpecialty}</div>
                        <div className="cook-description"><b>Description:</b> {cookDescription}</div>
                        <div className="cook-price"><b>Price:</b> ${cookPrice} per hour</div>
                    </div> : <h2>user is not a cook</h2>


                }
            </div>
        </div>
    )
}

export default UserProfile
