import React, {useEffect, useState} from 'react'
import {Redirect, Route, useHistory} from 'react-router-dom'
import axios from 'axios'
import {UserContext} from './UserContext'


function PrivateRoute({children, path, authenticated, setAuthentication, ...rest}) {
    let history = useHistory()

    const [user, setUser] = useState(null);
    const [menu, setMenu] = useState(null);


    useEffect(() => {
        let mounted = true
        
        axios.get(`/get-session`)
          .then(idRes => {
            if(mounted){
                console.log('PrivateRoute.js info',idRes)
                if(!idRes.userInfo){
                    console.log('Push')
                    localStorage.removeItem('user')
                    history.push('/login')
                }
                setUser(idRes.data.userInfo)
                setMenu(idRes.data.menuInfo)
            }            
          })

          return () => mounted = false
      },[])
      {/* <UserContext.Provider value = {{user, menu}}> */}


    return <Route {...rest} render={({ location }) => localStorage.getItem('user') !== null ? (children) : ( <Redirect to={{ pathname: "/login", state: { from: location }}}/>)}/>

}


export default PrivateRoute