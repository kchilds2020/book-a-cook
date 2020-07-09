import React from 'react'
import Button from 'react-bootstrap/Button'

function CookToggle({cook, setCook}) {
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
            {cook ? <Button variant="success" onClick={e => setCook(false)}>Yes</Button> : <Button variant="secondary" onClick={e => setCook(true)}>No</Button>}
        </div>
    )
}

export default CookToggle
