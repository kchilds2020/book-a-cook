import React, {useEffect} from 'react'
import {Redirect, Route, useHistory} from 'react-router-dom'
import axios from 'axios'



function PrivateRoute({children,path,authenticated, setAuthentication, ...rest}) {

    let history = useHistory()
    useEffect(() => {
        axios.get(`/get-session`)
                .then(idRes => {
                    console.log('PRIVATE ROUTE',idRes)
                    if(idRes.data.userInfo === null){
                        localStorage.removeItem('user')
                        history.push('/login')
                    }
                })
    }, [])

return(
        <Route {...rest} render={({ location }) => localStorage.getItem('user') !== null ? ( children ) : ( <Redirect to={{ pathname: "/login", state: { from: location }}}/>)}/>
);

}


export default PrivateRoute