import React from 'react'
import { FlexDirectionColumn } from '../GeneralStyles'
import {NumInput, NumberInputContainer, NumberInputButtons} from './MenuItemStyles'

function NumberInput({qty, setQty}) {

    const increment = (event) => {
        event.preventDefault()
        setQty(qty + 1)
    }
    const decrement = (event) => {
        event.preventDefault()
        if(qty > 1){setQty(qty - 1)}
    }
    return (
        <NumberInputContainer>           
            <NumberInputButtons onClick={decrement}>-</NumberInputButtons>
                <FlexDirectionColumn>
                    <NumInput type="text" id="qty-input" readOnly={true} value={qty}/>
                </FlexDirectionColumn>
            <NumberInputButtons onClick={increment}>+</NumberInputButtons>
        </NumberInputContainer>
    )
}

export default NumberInput
