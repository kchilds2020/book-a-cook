import styled from 'styled-components'

export const PopUp = styled.div`
    background-color: #f4f4f4;
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
export const DeleteButton = styled.button`
    z-index: 300;
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 20;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50px;
    box-shadow: #333 2px 2px 4px;
    background-color: rgb(212, 35, 35);
    color: white;
    cursor: pointer;
`