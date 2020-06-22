import React from 'react'
import '../../styles/NumberInput.css'

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
        <div className="num-input-container">
            
            <button className = "num-input-btns" style={{backgroundColor: "rgb(224, 115, 115)"}} onClick={decrement}>-</button>
            <div className="num-input">
                <input type="text" id="qty-input" readOnly={true} value={qty}/>
            </div>
            <button className = "num-input-btns" style={{backgroundColor: "rgb(107, 201, 107)"}} onClick={increment}>+</button>
        </div>
    )
}

export default NumberInput
