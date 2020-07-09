import React from 'react'
import Button from 'react-bootstrap/Button'

function CookToggle({cook, setCook, setModified}) {

    const notCook = (e) => {
        e.preventDefault()
        setCook(false)
        setModified(true)
    }

    const isCook = (e) => {
        e.preventDefault()
        setCook(true)
        setModified(true)
    }

    return (
        <div 
            style={{
                display: 'flex', 
                justifyContent: 'flex-end'
            }}
        >
            <span style={{
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                fontSize: '16px',
                marginRight: '5px'
            }}>Are you a Cook?  </span>
            {cook ? <Button variant="success" onClick={notCook}>Yes</Button> : <Button variant="secondary" onClick={isCook}>No</Button>}
        </div>
    )
}

export default CookToggle
