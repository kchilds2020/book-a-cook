import React from 'react'
import styled from 'styled-components'

export const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: .7;
    z-index: 50;
`;

function Overlay({setVisibility = (value) => console.log(value)}) {
    return (
        <Background onClick={() => setVisibility(false)}></Background>
    )
}

export default Overlay
