import React, {useState, useEffect} from 'react';
import axios from 'axios'
import '../styles/Login.css'
import { useHistory, useLocation} from 'react-router-dom'


export const Login = ({setAuthentication, setIdentification}) => {

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
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
                    setIdentification(response.data._id);
                    setAuthentication(true);
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
                    <button className = 'submitButton'>Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;