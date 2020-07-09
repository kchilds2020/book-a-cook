import React from 'react'

function TextArea({identifier, labelText, value, setValue, setModified}) {
    
    const handleChange = (e) => {
        e.preventDefault()
        setValue(e.target.value)
        setModified(true)
    }
    
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
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
                onChange = {handleChange}
                style={{
                    padding: '5px',
                    fontSize: '18px',
                    width: '100%',
                    height: '150px'
                }}
                />
        </div>
    )
}

export default TextArea
