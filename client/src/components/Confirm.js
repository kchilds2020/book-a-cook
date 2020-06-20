import React from 'react'
import '../styles/Confirm.css'

function Confirm({message, confirm, cancel }) {
    return (
        <div className="confirm-container">
                <div className="confirm-message">{message}</div>
                <div className="confirm-btns">
                    <button onClick={confirm}>Confirm</button>
                    <button onClick={cancel}>Cancel</button>
                </div>
            </div>
    )
}

export default Confirm
