import React from 'react'
import '../styles/Confirm.css'
import Button from 'react-bootstrap/Button'

function Confirm({message, confirm, cancel }) {
    return (
        <div className="confirm-container">
                <div className="confirm-message">{message}</div>
                <div className="confirm-btns">
                    <Button variant="success" onClick={confirm}>Confirm</Button>
                    <Button variant="danger" onClick={cancel}>Cancel</Button>
                </div>
            </div>
    )
}

export default Confirm
