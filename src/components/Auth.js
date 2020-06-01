import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'


function Auth({authenticated,setAuthentication}) {


useEffect(() => {
    axios.get('/get-session')
    .then(response => {
        if(response.data !== 'undefined'){
            setAuthentication(true);
        }
    })
    .catch(err => console.log(err))
}, [setAuthentication])

return(
    authenticated === true ? <Redirect to={{pathname: "/home"}}/> : <Redirect to={{pathname: "/"}}/>
);

}


export default Auth
