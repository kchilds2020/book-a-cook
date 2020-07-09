import React from 'react'

function Input({value, setValue, identifier, labelText}) {


    return (
        <div className="InputContainer" 
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '5px 0px'
        }}>
            <label className="InputLabel" htmlFor={value}>{labelText}</label>
            <input className="InputTag" name = {identifier} id = {identifier} type = "text" maxLength = '40' value = {value} onChange = {e => setValue(e.target.value)} required
                style={{
                    padding: '5px',
                    fontSize: '18px',
                    width: '100%'
                }}
            />
        </div>
    )
}

export default Input
