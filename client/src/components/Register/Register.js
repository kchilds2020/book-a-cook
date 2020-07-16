import React, {useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import InputWithLabels from '../InputComponents/Input'
import TextAreaWithLabels from '../InputComponents/TextArea'
import CookToggle from '../Profile/CookToggle'
import Spinner from 'react-bootstrap/Spinner'
import {Container} from '../GeneralStyles'
import styled from 'styled-components'
import {CenterSpinner, FlexDirectionRow} from '../GeneralStyles'
import ProfileImage from '../Profile/ProfileImage'
import checkValidation from './checkValidation'



export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 95%;
    max-width: 500px;
    padding: 20px;
    margin: 40px auto;
    background-color: white;
    border-radius: 6px;
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
    const [step, setStep] = useState(1)
    const [cookSpecialty, setCookSpecialty] = useState('')
    const [cookDescription, setCookDescription] = useState('')
    const [cookPrice, setCookPrice] = useState('')
    const [dob, setDob] = useState('')
    const [ssn, setSSN] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [routingNumber, setRoutingNumber] = useState('')
    const [picture, setPicture] = useState('')

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
                window.location.href=  '/home'
            }catch(error){console.log(error)}

        }
    }

    const registerCook = async (evt) =>{
        evt.preventDefault();
        console.log('register cook');
        const year = dob.slice(0,4)
        const month = dob.slice(5,7)
        const day = dob.slice(8)

        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password,
            number: number,
            day: day,
            month: month, 
            year: year,
            cook: cook,
            cookDescription: cookDescription,
            cookSpecialty: cookSpecialty,
            cookPrice: cookPrice,
            ssn: ssn,
            accountNumber: accountNumber,
            routingNumber: routingNumber,
            picture: picture
        }
        setLoading(true)
        let response = await checkValidation(data)
        if(response === true){
            try{
                let regResponse = await axios.post('/api/register-cook', data)
                setLoading(false)
                console.log(regResponse)
                if(regResponse.data.type === 'StripeInvalidRequestError'){
                    alert(regResponse.data.code)
                }else{
                    localStorage.setItem('user', regResponse.data._id)
                    window.location.href= '/home'
                }
            }catch(error){
                console.log(error)
                setLoading(false)
            }

        }else{setLoading(false)}
    }

    const nextStep = (e) => {
        e.preventDefault()
        console.log(cook)
        cook === true ? setStep(step + 1) : registerUser(e)
        window.scrollTo(0, 0)
    }

    return(
        <>
            <Container>

                {step === 1 ? (<FormContainer onSubmit={nextStep}>
                    <h2>Register</h2>
                    <InputWithLabels identifier='firstname' labelText = 'First Name' value = {firstname} setValue = {setFirstname}/>
                    <InputWithLabels identifier='lastname' labelText = 'Last Name' value = {lastname} setValue = {setLastname}/>
                    <InputWithLabels identifier='email' labelText = 'Email Address' value = {email} setValue = {setEmail} type="email"/>
                    <InputWithLabels identifier='number' labelText = 'Phone Number' value = {number} setValue = {setNumber} type="tel"/>
                    <InputWithLabels identifier='username' labelText = 'Username' value = {username} setValue = {setUsername}/>
                    <InputWithLabels identifier='password' labelText = 'Password' value = {password} setValue = {setPassword} type="password"/>
                    <CookToggle cook={cook} setCook ={setCook}/>
                    {cook === true ? <Button type="submit" variant="primary" >Next</Button> : <Button type="submit" variant="success" >Register!</Button>}
                </FormContainer>) :
                step === 2 ? (
                <FormContainer onSubmit={nextStep} id='cook-info'>
                    <h2>Cook information</h2>
                    <FlexDirectionRow><ProfileImage picture={picture} setPicture={setPicture} username={username} height='100px' width='100px'/></FlexDirectionRow>
                    <InputWithLabels identifier='cook-specialty' labelText = 'Cook Specialty' value = {cookSpecialty} setValue = {setCookSpecialty}/>
                    <TextAreaWithLabels identifier='cook-description' labelText = 'Cook Description' value = {cookDescription} setValue = {setCookDescription} height='100px'/>
                    <InputWithLabels identifier='cook-price' labelText = 'Catering Price Per Person' value = {cookPrice} setValue = {setCookPrice} type = 'number'/>
                    <FlexDirectionRow>
                    <Button onClick = {() => setStep(step - 1)} variant="secondary" style ={{marginRight: '10px', marginTop: '10px'}} block>Back</Button>
                    <Button type="submit" variant="primary" style ={{marginLeft: '10px', marginTop: '10px'}} block>Next</Button>
                    </FlexDirectionRow>
                </FormContainer> ) :
                step === 3 ? (
                <FormContainer onSubmit={registerCook} id='bank-info'>
                    <h2>Connect your bank account</h2>
                    <InputWithLabels value={dob} setValue={setDob} identifier='dob' labelText='Date of Birth' type="date"/>
                    <InputWithLabels value={ssn} setValue={setSSN} identifier='ssn' labelText='Social Security Number (Last Four Digits)' maxLength='4'/>
                    <InputWithLabels value={accountNumber} setValue={setAccountNumber} identifier='account-number' labelText='Account Number' maxLength='12'/>
                    <InputWithLabels value={routingNumber} setValue={setRoutingNumber} identifier='routing-number' labelText='Routing Number' maxLength='9' />
                    <FlexDirectionRow>
                    <Button onClick = {() => setStep(step - 1)} variant="secondary" style ={{marginRight: '10px', marginTop: '10px'}} block>Back</Button>
                    <Button type="submit" variant="success" style ={{marginLeft: '10px', marginTop: '10px'}} block>Register!</Button>
                    </FlexDirectionRow>
                </FormContainer>
                ) : <></>}
                {isLoading ? <CenterSpinner><Spinner animation="border" variant="info" /> </CenterSpinner> : <></>}
            </Container>
        </>
    );
};

export default Register;