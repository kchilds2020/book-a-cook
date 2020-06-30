import React, {useState} from 'react';
import axios from 'axios';
import "../styles/Register.css"
import {useHistory} from 'react-router-dom'

export const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let history = useHistory()

    const checkValidation = async (user) => {

    
        // check for non letters in firstname and last name

        console.log(!user.firstname.match(/^[0-9a-zA-Z]+$/));
        if(!user.firstname.match(/^[0-9a-zA-Z]+$/)){
            alert('First Name must only have alphanumeric characters');
            setFirstname('');
            return false;
        }
        console.log(!user.lastname.match(/^[0-9a-zA-Z]+$/));
        if(!user.lastname.match(/^[0-9a-zA-Z]+$/)){
            alert('Last Name must only have alphanumeric characters');
            setLastname('');
            return false;
        }
        console.log(!user.username.match(/^[0-9a-zA-Z]+$/));
        if(!user.username.match(/^[0-9a-zA-Z]+$/)){
            alert('Username must only have alphanumeric characters');
            setUsername('');
            return false;
        }
        
        //check if username or email exists
        let response = await axios.get(`/api/get/username/${user.username}`);
            console.log(response.data !== null);
            if(response.data !== null){
                alert('Username already exists in the system. Please choose another username');
                return false;
            }

            
            response = await axios.get(`/api/get/email/${user.email}`);
            console.log(response.data !== null);
            if(response.data !== null){
                alert('Email already exists in the system. Please choose another email');
                return false;
            }
        console.log(user.password.length < 8);
        //check if Password has upper character/special character/ > 7
        if(user.password.length < 8){
            alert('Password must be atleast 8 characters');
            return false;
        }

        return true;
    }

    const registerUser = async (evt) =>{
        evt.preventDefault();
        console.log('register user');
        const user = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password

        }
        let response = await checkValidation(user)
        if(response === true){
            console.log('post started')
            axios.post('/post/register', user)
                .then(function (response) {
                    if(response.status === '200'){
                        console.log('FAILURE');
                    }else{
                        console.log(response);
                        history.push('/home')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return(
        <>
            <div className = "container">
                <form className = "form-container" onSubmit = {registerUser}>
                    <h2>Register</h2>
                    <input name = "firstname" type = "text" placeholder = 'First Name' className = "inputFields" maxLength = '40' value = {firstname} onChange={e => setFirstname(e.target.value)} required/>
                    <input name = "lastname" type = "text" placeholder = 'Last Name' className = "inputFields" maxLength = '40' value = {lastname} onChange={e => setLastname(e.target.value)} required/>
                    <input name = "email" type = "email" placeholder = 'Email' className = "inputFields" maxLength = '40' value = {email} onChange={e => setEmail(e.target.value)} required/>
                    <input name = "username" type = "text" placeholder = 'Username' className = "inputFields" maxLength = '20' value = {username} onChange={e => setUsername(e.target.value)} required/>
                    <input name = "password" type = "password" placeholder = 'Password' className = "inputFields" value = {password} onChange={e => setPassword(e.target.value)} required/>
                    <button className = "submitButton">Register</button>
                </form>
            </div>
        </>
    );
};

export default Register;