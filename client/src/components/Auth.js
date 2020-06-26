import React, {useEffect, useState} from 'react'
import {Redirect, Route} from 'react-router-dom'
import axios from 'axios'


function Auth({children,path,authenticated, setAuthentication, ...rest}) {

useEffect(() => {
    let mounted = true
    console.log('1',mounted,authenticated)
    axios.get('/check-session')
    .then(response => {
        console.log('2',mounted,authenticated)
        if(mounted){
            setAuthentication(response.data)
        }
    })
    .then(res =>{
        mounted = false
    })
    .catch(err => {
        mounted = false
    })

    return () => mounted
}, [authenticated])


console.log('authenticated', authenticated)


return(
        <Route {...rest} render={({ location }) => authenticated ? ( children ) : ( <Redirect to={{ pathname: "/login", state: { from: location }}}/>)}/>
);

}


export default Auth
