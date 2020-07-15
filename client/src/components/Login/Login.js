import React, {useState} from 'react';
import axios from 'axios'
import { useHistory, useLocation} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {Input, Container} from '../GeneralStyles'
import styled from 'styled-components'


export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 95%;
    max-width: 500px;
    padding: 20px;
    margin: auto;
    margin-top: 150px;
    background-color: #f4f4f4;
    border-radius: 6px;
    box-shadow: 0px 0px 4px #333;
`;

export const Login = () => {

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/home" } };
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (evt) => {
        evt.preventDefault();

        navigator.geolocation.getCurrentPosition((position) => {
            console.log('Latitude',position.coords.latitude,'Longitude',position.coords.longitude)
        
            const postRequest = async() => {
                const user = {
                    username: username,
                    password: password,
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
        
                }

                try {
                    const response = await axios.post('/login-user', user)
        
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
                } catch (error) {
                    console.log(error)
                }
            }
            postRequest()
            
        
        });
        
    }

    return(
        <>
            <Container>
                <FormContainer onSubmit = {loginUser}>
                    <h2>Login</h2>
                    <Input identifier='username' labelText = 'Username' value = {username} onChange = {(e) => setUsername(e.target.value)}/>
                    <Input identifier='password' labelText = 'Password' value = {password} onChange = {(e) => setPassword(e.target.value)} type="password"/>
                    <div style={{margin: '10px 0px'}}><a href="/register">Dont have an account? Register</a></div>
                    <Button type="submit" variant="primary" block>Login</Button>
                </FormContainer>
            </Container>
        </>
    );
};

export default Login;