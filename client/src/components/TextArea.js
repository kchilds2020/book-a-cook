import React from 'react'

function TextArea({identifier, labelText, value, setValue}) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '5px'
        }}>
            <label 
                htmlFor={identifier}>
                    {labelText}
            </label>
            <textarea 
                name = {identifier} 
                id = {identifier} 
                type = "text" 
                placeholder = {labelText} 
                value = {value} 
                onChange = {e => setValue(e.target.value)}
                style={{
                    padding: '5px 0px',
                    fontSize: '18px',
                    width: '100%',
                    height: '150px'
                }}
                />
        </div>
    )
}

export default TextArea
