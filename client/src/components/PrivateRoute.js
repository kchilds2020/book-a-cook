import React, {useEffect, useState} from 'react'
import {Redirect, Route, useHistory} from 'react-router-dom'
import axios from 'axios'
import {UserContext} from './UserContext'


function PrivateRoute({children, path, ...rest}) {
    let history = useHistory()

    const [user, setUser] = useState(null);
    const [menu, setMenu] = useState(null);


    useEffect(() => {
        let mounted = true
        
        axios.get(`/get-session`)
          .then(idRes => {
            
                console.log('PrivateRoute.js info',idRes)
                if(!idRes.data.userInfo){
                    console.log('Push')
                    localStorage.removeItem('user')
                    history.push('/login')
                }
                if(mounted){
                    setUser(idRes.data.userInfo)
                    setMenu(idRes.data.menuInfo)
                }            
          })

          return () => mounted = false
      },[history])


    return <UserContext.Provider value = {{user, menu}}><Route {...rest} render={({ location }) => localStorage.getItem('user') !== null ? (children) : ( <Redirect to={{ pathname: "/login", state: { from: location }}}/>)}/></UserContext.Provider>

}


export default PrivateRoute