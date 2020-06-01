import React, {useState} from 'react';
import UnauthenticatedNavBar from './UnauthenticatedNavBar';
import axios from 'axios'

export const Login = ({setAuthentication}) => {

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

    const loginUser = (evt) => {
        evt.preventDefault();
        const user = {
            username: username,
            password: password

        }

        axios.post('/login-user', user)
            .then(function (response) {
                if(response.data === "invalid username"){
                    console.log('invalid username')

                }else if(response.data === "invalid password"){
                    console.log('invalid password')
                }else{
                    console.log(response)
                    setAuthentication(true);
                    //go to home
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
                <form style = {formContainer} onSubmit = {loginUser}>
                    <h2>LOGIN</h2>
                    <input name = "username" type = "text" placeholder = 'Username' style = {inputFields} maxLength = '20' onChange={e => setUsername(e.target.value)}/>
                    <input name = "password" type = "password" placeholder = 'Password' style = {inputFields} onChange={e => setPassword(e.target.value)}/>
                    <button style = {submitButton}>Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;