import React from 'react'
import Button from 'react-bootstrap/Button'
import {PopUp} from './PopUpStyles'

function Confirm({message, confirm, cancel }) {
    return (
            <PopUp>
                    <div style={{padding: '10px'}}>{message}</div>
                    <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
                        <Button variant="success" onClick={confirm}>Confirm</Button>
                        <Button variant="danger" onClick={cancel}>Cancel</Button>
                    </div>
            </PopUp>
    )
}

export default Confirm
