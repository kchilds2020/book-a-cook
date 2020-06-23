import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'


function Auth({path, authenticated,setAuthentication, setIdentification, setFirstname, setLastname, setUsername, setEmail, identification, setCookDescription, setCook, setCookSpecialty, setCookPrice, setPicture, setPhotos, setMenuItems, username}) {



useEffect(() => {
    axios.get('/get-session')
    .then(response => {
        if(response.data !== 'undefined'){
            console.log('AUTHENTICATION',response.data);
            setIdentification(response.data);
            setAuthentication(true);
        }
    })
    .catch(err => console.log(err))

    if(identification !== ''){
        axios.get(`/api/get/userId/${identification}`)
        .then(response => {
            setFirstname(response.data.firstName)
            setLastname(response.data.lastName)
            setUsername(response.data.username)
            setEmail(response.data.email)
            setCookDescription(response.data.cookDescription)
            setCook(response.data.cook)
            setCookSpecialty(response.data.cookSpecialty)
            setCookPrice(response.data.cookPrice)
            setPicture(response.data.picture)
            setPhotos(response.data.photos)
        })
        .catch(err => console.log(err))

        const getMenuItems = async () => {
            try{
            const response = await axios.get(`/api/get/menu-items/${username}`)
            setMenuItems(response.data)
            }catch(error){
                console.log(error)
            }
        }
        getMenuItems()
        
        
    }

}, [setAuthentication, setIdentification, identification, setFirstname, setLastname, setUsername, setEmail, setCook, setCookDescription, setCookPrice, setCookSpecialty, setPicture, setPhotos, setMenuItems, username])


return(
    <></>
    /* authenticated === true ? <Redirect to={{pathname: `${path}`}}/> : <Redirect to={{pathname: "/"}}/> */
);

}


export default Auth
