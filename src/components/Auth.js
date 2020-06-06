import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'


function Auth({authenticated,setAuthentication, setIdentification}) {


useEffect(() => {
    axios.get('/get-session')
    .then(response => {
        if(response.data !== 'undefined'){
            console.log('AUTHENTICATION',response.data);
            setIdentification(response);
            setAuthentication(true);

        }
    })
    .catch(err => console.log(err))
}, [setAuthentication, setIdentification])

return(
    authenticated === true ? <Redirect to={{pathname: "/home"}}/> : <Redirect to={{pathname: "/"}}/>
);

}


export default Auth
