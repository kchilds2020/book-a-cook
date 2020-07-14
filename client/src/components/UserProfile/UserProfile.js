import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import silhouette from '../../images/silhouette.png'
import JobForm from '../PopUps/JobForm';
import Photo from '../Profile/Photo';
import {UserContext} from '../UserContext'
import Button from 'react-bootstrap/Button'
import Review from './Review'
import Overlay from '../PopUps/Overlay'
import {Container, ImagesContainer, UserPhoto, UserPhotoContainer} from '../GeneralStyles'
import {UserSectionContainer, CookDetails, CookDetail, UserDetails, UserDetail, UserName, ContactInfo, ProfileContainer, ContactButtons} from './UserProfileStyles'
import ReviewForm from './ReviewForm'



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
    const [pricePerPerson, setPricePerPerson] = useState(0)
    const [peopleAmount, setPeopleAmount] = useState('');
    const [photos,setPhotos] = useState('');
    const [reviews,setReviews] = useState('');
    const [reviewVisibility,setReviewVisibility] = useState(false);
    const [bookVisibility, setBookVisibility] = useState(false)

    useEffect(() =>{
        const getUserInfo = async () => {
            try{
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                setUsername(urlParams.get('user'));

                let response = await axios.get(`/api/get/username/${username}`)
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
                setReviews(response.data.reviews)

            }catch(error){console.log(error)}
        }
        //get user from url
        getUserInfo()
    },[username])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            summary: summary,
            description: description,
            location: location,
            date: date,
            username: user.username,
            peopleAmount: peopleAmount,
            cook: username,
            price: pricePerPerson
        }
        try{
            let response = await axios.post('/post/create-post', data)
            console.log(response.data)
            console.log('submitted')
        }catch(error){console.log(error)}
    }
    const cancelPost = (event) => {
        setBookVisibility(false)
    }

    return (

        username !== '' ?
            <Container>
                <ProfileContainer>
                <UserSectionContainer>
                    <UserPhotoContainer>
                        <UserPhoto src={picture === '' ? silhouette : `/api/get/image/${picture}`} alt="cook"/>
                    </UserPhotoContainer>
                    <UserDetails>
                        <UserName>{firstname} {lastname}</UserName>
                        <ContactInfo>
                            <UserDetail className="email">{email}</UserDetail>
                            <UserDetail className="phone">{number}</UserDetail>
                        </ContactInfo>
                        { user && cook ? <ContactButtons>
                                    <Button variant="primary" onClick={()=> setBookVisibility(true)} block>Request to Hire</Button>
                                    <Button variant="info" onClick={() => setReviewVisibility(true)} block>Write a Review</Button>
                                    </ContactButtons> : <></>}
                    </UserDetails>
                </UserSectionContainer>
                
                {cook ? 
                    <UserSectionContainer>
                                <CookDetails>
                                    <CookDetail><b>Specialization:</b> {cookSpecialty}</CookDetail>
                                    <CookDetail><b>Description:</b> {cookDescription}</CookDetail>
                                    <CookDetail><b>Price:</b> ${cookPrice}</CookDetail>
                                </CookDetails> 
                        
                    </UserSectionContainer>
                : <></>} 
                {!photos ?
                <></> :
                <>
                <ImagesContainer>
                    {photos.map((element,index) => <Photo key={index} className="photo" id={`photo-${index}`} input={false} itemNum = {index} handleImgChange={()=>console.log('temp')} photo={element}/>)}
                </ImagesContainer>
                
                
                { reviews ?
                    <UserSectionContainer>
                        {reviews.map((element, index) => <Review key={index} rating = {element.rating} description = {element.description} username={element.username}/>)}
                    </UserSectionContainer> : <></>
                }




                { bookVisibility ? <>
                        <JobForm setSummary={setSummary} setPeopleAmount = {setPeopleAmount} setDescription = {setDescription} setLocation = {setLocation} setDate = {setDate} handleSubmit={handleSubmit} cancelPost={cancelPost} setPricePerPerson={setPricePerPerson}/>
                        <Overlay setVisibility={setBookVisibility}/></>: <></> }</>}

                {reviewVisibility ? <ReviewForm setReviewVisibility={setReviewVisibility} chef={username} customer={user.username}/> : <></> }
                </ProfileContainer>
            </Container> : <></>
    )
}

export default UserProfile
