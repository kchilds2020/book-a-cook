import React from 'react';

export const Register = () => {
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

    return(
        <div style = {container}>
            <form style = {formContainer}>
                <h2>Register</h2>
                <input name = "firstname" type = "text" placeholder = 'First Name' style = {inputFields} maxLength = '40'/>
                <input name = "lastname" type = "text" placeholder = 'Last Name' style = {inputFields} maxLength = '40'/>
                <input name = "email" type = "email" placeholder = 'Email' style = {inputFields} maxLength = '40'/>
                <input name = "username" type = "text" placeholder = 'Username' style = {inputFields} maxLength = '20'/>
                <input name = "password" type = "password" placeholder = 'Password' style = {inputFields}/>
                <button style = {submitButton}>Register</button>
            </form>
        </div>
    );
};

export default Register;