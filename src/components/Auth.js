import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'


function Auth({authenticated,setAuthentication, setIdentification, setFirstname, setLastname, setUsername, setEmail, identification, setCookDescription, setCook, setCookSpecialty, setCookPrice}) {

const [urlAttempted, setUrlAttempted] = useState('/home');

useEffect(() => {
    if(window.location.pathname === '/login' || window.location.pathname === '/register'){
        setUrlAttempted('/home');
    }
    else{
        setUrlAttempted(window.location.pathname);
    }
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
        })
        .catch(err => console.log(err))
    }

}, [setAuthentication, setIdentification, identification, setFirstname, setLastname, setUsername, setEmail, setCook, setCookDescription, setCookPrice, setCookSpecialty])


return(
    
    authenticated === true ? <Redirect to={{pathname: `${urlAttempted}`}}/> : <Redirect to={{pathname: "/"}}/>
);

}


export default Auth
