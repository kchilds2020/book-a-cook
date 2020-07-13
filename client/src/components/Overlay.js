import React from 'react'

function Overlay({setVisibility = (value) => console.log(value)}) {
    return (
        <div onClick={() => setVisibility(false)} className='overlay'></div>
    )
}

export default Overlay
