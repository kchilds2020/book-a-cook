import styled from 'styled-components'

export const PopUp = styled.div`
    background-color: white;
    padding: 20px;
    position: fixed;
    width: 100%;
    max-width: 300px;
    z-index: 100;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,calc(-50% - .5px));
    -moz-transform: translate(-50%,calc(-50% - .5px));
    -ms-transform: translate(-50%,calc(-50% - .5px));
    -o-transform: translate(-50%,calc(-50% - .5px));
    transform: translate(-50%,calc(-50% - .5px));
    box-shadow: 0px 0px 8px #333;
    border-radius: 8px;
    /* visibility: hidden; */

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;