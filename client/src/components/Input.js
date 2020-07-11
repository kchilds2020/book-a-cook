import React from 'react'

function Input({value, setValue, identifier, labelText, setModified = (x) => null, type='text', maxLength='40'}) {

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
                padding: '5px 0px'
        }}>
            <label className="InputLabel" htmlFor={value}>{labelText}</label>
            <input className="InputTag" name = {identifier} id = {identifier} type = {type} maxLength = {maxLength} value = {value} onChange = {handleChange} required
                style={{
                    padding: '5px',
                    fontSize: '18px',
                    width: '100%',
                }}
            />
        </div>
    )
}

export default Input
