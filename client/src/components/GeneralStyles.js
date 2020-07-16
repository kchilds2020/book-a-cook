import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    max-width: 900px;
    margin: auto;
`;

export const PageHeader = styled.h2`
    background-color: white;
    padding: 10px;
    width: 95%;
    margin: auto;
    margin-top: 10px;
    border-radius: 8px;
    background-color: white;
`;

export const ImagesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    background-color: white;
    padding-bottom: 100px;
    border-radius: 0px 0px 8px 8px
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

export const Input = styled.input`
    padding: 5px;
    fontSize: 18px;
    width: 100%;
    margin: 0px;
    margin-bottom: 5px;
    border: none;
    border-radius: 4px;
    background-color: rgb(232, 240, 254);

    :focus{
        outline: none;
    }
`;

export const TextArea = styled.textarea`
    padding: 5px;
    fontSize: 18px;
    width: 100%;
    margin: 0px;
    margin-bottom: 5px;
    border-radius: 4px;
    background-color: rgb(232, 240, 254);
    border: none;

    :focus{
        outline: none;
    }
`;

export const FlexDirectionColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FlexDirectionRow = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: space-evenly;
`;

export const NavBarOverlay = styled.div`
    position: sticky;
    z-index: 100;
    top: 0;
    background: linear-gradient(0.25turn, #964bb9, #7278cf, #3ca2f6);
    height: 65px;
    box-shadow: 0px 1px 6px #333;
`;