import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    max-width: 900px;
    margin: auto;
`;

export const PageHeader = styled.h2`
    background-color: white;
    padding: 10px;
    box-shadow: 0px 0px 4px #333;
    width: 95%;
    margin: auto;
    margin-top: 10px;
    border-radius: 8px;
    background-color: #333;
    color:white;
`;

export const ImagesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    background-color: #f4f4f4;
`;


export const UserPhotoContainer = styled.div`
    position: relative;
    width: 250px;
    height: 250px;
    display: flex;
    justify-content: center;
    margin: 10px;
    cursor: pointer;
`;
export const UserPhoto = styled.img`
    width: 250px;
    height: 250px;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0px 0px 4px #333;
`;

export const FixedCenter = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    z-index: 100;
`;


export const CenterSpinner = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
`;
