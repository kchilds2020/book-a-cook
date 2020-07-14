import React, {useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import InputWithLabels from '../InputComponents/Input'
import CookToggle from '../Profile/CookToggle'
import Spinner from 'react-bootstrap/Spinner'
import {Container} from '../GeneralStyles'
import styled from 'styled-components'
import {CenterSpinner} from '../GeneralStyles'


export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 95%;
    max-width: 500px;
    padding: 20px;
    margin: auto;
    margin-top: 100px;
    background-color: #f4f4f4;
    border-radius: 6px;
    box-shadow: 0px 0px 4px #333;
`;

export const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [cook, setCook] = useState(false)
    const [isLoading, setLoading] = useState(false)

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
        try{
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
        }catch(error) {console.log(error)}

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
            try{
                let regResponse = await axios.post('/post/register', user)
                setLoading(false)

                localStorage.setItem('user', regResponse.data._id)
                window.location.href= cook === true ? '/payment-registration' : '/home'
            }catch(error){console.log(error)}

        }
    }


    return(
        <>
            <Container>
                <FormContainer onSubmit = {registerUser}>
                    <h2>Register</h2>
                    <InputWithLabels identifier='firstname' labelText = 'First Name' value = {firstname} setValue = {setFirstname}/>
                    <InputWithLabels identifier='lastname' labelText = 'Last Name' value = {lastname} setValue = {setLastname}/>
                    <InputWithLabels identifier='email' labelText = 'Email Address' value = {email} setValue = {setEmail} type="email"/>
                    <InputWithLabels identifier='number' labelText = 'Phone Number' value = {number} setValue = {setNumber} type="tel"/>
                    <InputWithLabels identifier='username' labelText = 'Username' value = {username} setValue = {setUsername}/>
                    <InputWithLabels identifier='password' labelText = 'Password' value = {password} setValue = {setPassword} type="password"/>
                    <CookToggle cook={cook} setCook ={setCook}/>
                    <Button type="submit" variant="primary" block>Register</Button>
                </FormContainer>
                {isLoading ? <CenterSpinner><Spinner animation="border" variant="info" /> </CenterSpinner> : <></>}
            </Container>
        </>
    );
};

export default Register;