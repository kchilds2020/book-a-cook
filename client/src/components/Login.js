import React, {useState} from 'react';
import axios from 'axios'
import '../styles/Login.css'
import { useHistory, useLocation} from 'react-router-dom'


export const Login = () => {

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/home" } };
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = (evt) => {
        evt.preventDefault();
        const user = {
            username: username,
            password: password

        }

        axios.post('/login-user', user)
            .then(function (response) {
                if(response.data === "invalid username"){
                    setUsername('');
                    setPassword('');
                    alert('That username does not exist in our system')
                    
                }else if(response.data === "invalid password"){
                    setPassword('');
                    alert('Invalid password')
                    
                }else{
                    localStorage.setItem('user', response.data._id)
                    //go to home
                    history.replace(from)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return(
        <>
            <div className = 'container'>
                <form className = 'form-container' onSubmit = {loginUser}>
                    <h2>LOGIN</h2>
                    <input className = 'inputFields' name = "username" type = "text" placeholder = 'Username'  maxLength = '20' value = {username} onChange={e => setUsername(e.target.value)}/>
                    <input className = 'inputFields' name = "password" type = "password" placeholder = 'Password' value = {password} onChange={e => setPassword(e.target.value)}/>
                    <a href="/register">Dont have an account? Register</a>
                    <button className = 'submitButton'>Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;