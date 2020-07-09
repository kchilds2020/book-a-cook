import React from 'react'

function Input({value, setValue, identifier, labelText}) {


    return (
        <div className="InputContainer">
            <label className="InputLabel" htmlFor={value}>{labelText}</label>
            <input className="InputTag" name = {identifier} id = {identifier} type = "text" maxLength = '40' value = {value} onChange = {e => setValue(e.target.value)} required/>
        </div>
    )
}

export default Input
