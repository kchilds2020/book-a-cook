import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UserProfile() {
    const [profileName, setProfileName] = useState('');

    useEffect(() =>{
        //get user from url
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        setProfileName(urlParams.get('user'));

        //get info of user
        axios.get(`/api/get/username/${profileName}`)
        .then(response => console.log(response.data))
        .catch(err => console.log(err))

    },[profileName])

    return (
        <div>
            {profileName} account
        </div>
    )
}

export default UserProfile
