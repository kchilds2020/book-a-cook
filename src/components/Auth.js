import React, {useEffect, useState} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'


function Auth() {

const [authenticated, setAuthentication] = useState(false);



useEffect(() => {
    axios.get('/get-session')
    .then(response => {
        if(response.data !== 'undefined'){
            setAuthentication(true);
        }
    })
    .catch(err => console.log(err))
})

return(
    authenticated === true ? <Redirect to={{pathname: "/home"}}/> : <Redirect to={{pathname: "/"}}/>
);

}


export default Auth
