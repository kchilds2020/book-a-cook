import React from 'react'
import {Input} from './GeneralStyles'

function InputWithLabel({value, setValue, identifier, labelText, setModified = (x) => null, type='text', maxLength='40'}) {

    const handleChange = (e) => {
        e.preventDefault()
        setValue(e.target.value)
        setModified(true)
    }

    return (
        <div className="InputContainer" 
            style={{
                display: 'flex',
                flexDirection: 'column',
        }}>
            <label htmlFor={value}>{labelText}</label>
            <Input name = {identifier} id = {identifier} type = {type} maxLength = {maxLength} value = {value} onChange = {handleChange} required
                style={{
                    padding: '5px',
                    fontSize: '18px',
                    width: '100%',
                }}
            />
        </div>
    )
}

export default InputWithLabel
