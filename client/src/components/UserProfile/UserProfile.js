import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import silhouette from '../../images/silhouette.png'
import '../../styles/UserProfile.css'
import JobForm from '../JobForm';
import Photo from './Photo';
import {UserContext} from '../UserContext'
import Button from 'react-bootstrap/Button'


function UserProfile() {

    let {user, menu} = useContext(UserContext)
    console.log('USERPROFILE USER CONTEXT', user, menu)

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [number, setNumber] = useState('');
    const [cookSpecialty, setCookSpecialty] = useState('');
    const [cookDescription, setCookDescription] = useState('');
    const [cookPrice, setCookPrice] = useState('');
    const [cook, setCook] = useState('');
    const [picture, setPicture] = useState('');

    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [peopleAmount, setPeopleAmount] = useState('');
    const [photos,setPhotos] = useState([]);

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
            setPicture(response.data.picture)
            setPhotos(response.data.photos)
            setNumber(response.data.number)

        })
        .catch(err => console.log(err))

    },[username])

    const handleBook = (event) => {
        let form = document.getElementById('book-form')
        form.style.visibility = form.style.visibility === 'visible' ? 'hidden' : 'visible'
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            summary: summary,
            description: description,
            location: location,
            date: date,
            username:'',
            peopleAmount: peopleAmount,
            cook: username
        }
        axios.post('/post/create-post', data)
        .then(response => console.log(response.data))
        .catch(err => console.log(err))

        document.getElementById('book-form').style.visibility = 'hidden'
        console.log('submitted')
    }
    const cancelPost = (event) => {
        console.log('cancelled')
        document.getElementById('book-form').style.visibility = 'hidden'
    }

    return (
        <>
            <div className="user-profile-container">
                <div className="user-information">
                    <div className="user-picture">
                        <img src={picture === '' ? silhouette : `/api/get/image/${picture}`} alt="cook"/>
                    </div>
                    <div className="user-details">
                        <div className="full-name">{firstname} {lastname}</div>
                        <div style={{marginBottom: '20px'}}>
                            <div className="email">{email}</div>
                            <div className="phone">{number}</div>
                        </div>
                        { user !== null ? <Button variant="primary" onClick={handleBook} block>Request to Hire</Button> : <></>}
                    </div>
                </div>
                
                {cook ? 
                <>
                    <div className="user-information">
                                <div className="cook-details">
                                    <div className="cook-specialty"><b>Specialization:</b> {cookSpecialty}</div>
                                    <div className="cook-description"><b>Description:</b> {cookDescription}</div>
                                    <div className="cook-price"><b>Price:</b> ${cookPrice}</div>
                                </div> 
                        
                    </div>
                </>
                : <></>} 
                {photos.length > 0 ?
                <>
                <div className="photo-gallery">
                    {photos.map((element,index) => <Photo key={index} className="photo" id={`photo-${index}`} input={false} itemNum = {index} handleImgChange={()=>console.log('temp')} photo={element}/>)}
                </div>
                <div id="book-form">
                    <JobForm setSummary={setSummary} setPeopleAmount = {setPeopleAmount} setDescription = {setDescription} setLocation = {setLocation} setDate = {setDate} handleSubmit={handleSubmit} cancelPost={cancelPost}/>
                </div></> : <></>
                }
            </div>
        </>
    )
}

export default UserProfile
