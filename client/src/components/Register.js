import React, {useState} from 'react';
import axios from 'axios';
import "../styles/Register.css"
import {useHistory} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Input from './Input'
import CookToggle from './Profile/CookToggle'
import Spinner from 'react-bootstrap/Spinner'

export const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [cook, setCook] = useState(false)
    const [isLoading, setLoading] = useState(false)
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

        let checks = formatPhoneNumber(number)
        if(checks !== true){
            return false;
        }

        return true;
    }

    let formatPhoneNumber = (str) => {
        //Filter only numbers from the input
        let cleaned = ('' + str).replace(/\D/g, '');
        
        //Check if the input is of correct length
        let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      
        if (match) {
          setNumber('(' + match[1] + ') ' + match[2] + '-' + match[3])
          return true
        }
        else{
            alert('Invalid Phone Number')
            return false
        }
    };

    const registerUser = async (evt) =>{
        evt.preventDefault();
        console.log('register user');
        const user = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password,
            number: number,
            cook: cook

        }
        setLoading(true)
        let response = await checkValidation(user)
        if(response === true){
            let regResponse = await axios.post('/post/register', user)
            setLoading(false)

            localStorage.setItem('user', regResponse.data._id)
            window.location.href= cook === true ? '/payment-registration' : '/home'

        }
    }


    return(
        <>
            <div className = "container">
                <form className = "form-container" onSubmit = {registerUser}>
                    <h2>Register</h2>
                    <Input identifier='firstname' labelText = 'First Name' value = {firstname} setValue = {setFirstname}/>
                    <Input identifier='lastname' labelText = 'Last Name' value = {lastname} setValue = {setLastname}/>
                    <Input identifier='email' labelText = 'Email Address' value = {email} setValue = {setEmail} type="email"/>
                    <Input identifier='number' labelText = 'Phone Number' value = {number} setValue = {setNumber} type="tel"/>
                    <Input identifier='username' labelText = 'Username' value = {username} setValue = {setUsername}/>
                    <Input identifier='password' labelText = 'Password' value = {password} setValue = {setPassword} type="password"/>
                    <CookToggle cook={cook} setCook ={setCook}/>
                    {/* <input name = "firstname" type = "text" placeholder = 'First Name' className = "inputFields" maxLength = '40' value = {firstname} onChange={e => setFirstname(e.target.value)} required/>
                    <input name = "lastname" type = "text" placeholder = 'Last Name' className = "inputFields" maxLength = '40' value = {lastname} onChange={e => setLastname(e.target.value)} required/>
                    <input name = "email" type = "email" placeholder = 'Email' className = "inputFields" maxLength = '40' value = {email} onChange={e => setEmail(e.target.value)} required/>
                    <input name = "number" type = "tel" placeholder = 'Phone Number' className = "inputFields" maxLength = '15' value = {number} onChange = {e => setNumber(e.target.value)} required/>            
                    <input name = "username" type = "text" placeholder = 'Username' className = "inputFields" maxLength = '20' value = {username} onChange={e => setUsername(e.target.value)} required/>
                    <input name = "password" type = "password" placeholder = 'Password' className = "inputFields" value = {password} onChange={e => setPassword(e.target.value)} required/> */}
                    <Button type="submit" variant="primary" block>Register</Button>
                </form>
                {isLoading ? <div className="home-spinner"><Spinner animation="border" variant="info" /> </div> : <></>}
            </div>
        </>
    );
};

export default Register;