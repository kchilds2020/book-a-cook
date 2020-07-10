import React, {useState} from 'react';
import axios from 'axios'
import '../styles/Login.css'
import { useHistory, useLocation} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Input from './Input'


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
                    <h2 style={{textAlign: 'center'}}>LOGIN</h2>
                    <Input identifier='username' labelText = 'Username' value = {username} setValue = {setUsername}/>
                    <Input identifier='password' labelText = 'Password' value = {password} setValue = {setPassword} type="password"/>
                    <div style={{margin: '10px 0px'}}><a href="/register">Dont have an account? Register</a></div>
                    <Button type="submit" variant="primary" block>Login</Button>
                </form>
            </div>
        </>
    );
};

export default Login;