import React, { useEffect } from 'react'
import {Redirect, Route} from 'react-router-dom'
import axios from 'axios'



function PrivateRoute({children,path,authenticated, setAuthentication, ...rest}) {

    
        useEffect(() => {
            let mounted = true

            axios.get('/get-session')
            .then(res=> {
                if(mounted){
                    res.data.userInfo !== null ? setAuthentication(true) : setAuthentication(false)
                }
            })

            return () => mounted = false
        }, [setAuthentication, authenticated])


console.log('authenticated', authenticated)


return(
        <Route {...rest} render={({ location }) => authenticated ? ( children ) : ( <Redirect to={{ pathname: "/login", state: { from: location }}}/>)}/>
);

}


export default PrivateRoute