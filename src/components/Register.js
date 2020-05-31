import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import UnauthenticatedNavBar from './UnauthenticatedNavBar'

export const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const formContainer = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '90%',
        maxWidth: '500px',
        padding: '20px',
        margin: 'auto',
        backgroundColor: '#f4f4f4',
        borderRadius: '6px'
    }

    const inputFields = {
        fontFamily: 'Raleway, Helvetica, sans-serif',
        fontSize: '18px',
        width: '100%',
        maxWidth: '500px',
        borderRadius: '6px',
        border: 'none',
        padding: '10px',
        margin: 'auto',
        marginTop: '10px',
    }

    const submitButton = {
        backgroundColor: 'rgb(73, 123, 189)',
        color:'white',
        cursor: 'pointer',
        borderRadius: '8px',
        WebkitAppearance: 'none',
        padding: '10px',
        border: 'none',
        fontSize: '18px',
        marginTop: '15px'
    }

    const container = {
        height: '70vh',
        display: 'flex',
        alignItems: 'center'

    }

    const registerUser = (evt) =>{
        evt.preventDefault();
        console.log(firstname,lastname,email,username,password);
        const user = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password

        }
        axios.post('/post/register', user)
            .then(function (response) {
                if(response.status === '200'){
                    console.log('FAILURE');
                }else{
                    console.log(response);
                    //window.location.href = '/home';
                    

                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return(
        <>
            <UnauthenticatedNavBar />
            <div style = {container}>
                <form style = {formContainer} onSubmit = {registerUser}>
                    <h2>Register</h2>
                    <input name = "firstname" type = "text" placeholder = 'First Name' style = {inputFields} maxLength = '40' onChange={e => setFirstname(e.target.value)}/>
                    <input name = "lastname" type = "text" placeholder = 'Last Name' style = {inputFields} maxLength = '40' onChange={e => setLastname(e.target.value)}/>
                    <input name = "email" type = "email" placeholder = 'Email' style = {inputFields} maxLength = '40' onChange={e => setEmail(e.target.value)}/>
                    <input name = "username" type = "text" placeholder = 'Username' style = {inputFields} maxLength = '20' onChange={e => setUsername(e.target.value)}/>
                    <input name = "password" type = "password" placeholder = 'Password' style = {inputFields} onChange={e => setPassword(e.target.value)}/>
                    <button style = {submitButton}>Register</button>
                </form>
            </div>
        </>
    );
};

export default Register;