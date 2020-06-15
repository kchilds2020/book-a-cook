import React from 'react';
import axios from 'axios'

function GetID(){

    let data;
    axios.get('/get-session')
    .then(response => {
        if(response.data !== 'undefined'){
            console.log('AUTHENTICATION',response.data);
            data = response.data

        }
    })
    .catch(err => console.log(err))
    return data;
}

export default GetID