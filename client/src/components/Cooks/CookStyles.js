import styled from 'styled-components'

export const CookContainer = styled.div`
    display: flex;
    background-color: white;
    width: 95%;
    border-radius: 8px;
    max-width: 1000px;
    margin: auto;
    margin-top: 5px;
    padding: 20px;
    padding-bottom: 0px;
    box-shadow: 0px 0px 4px #333;

    @media only screen and (max-width: 750px) {
        flex-direction: column;
        align-items: center;
        max-height: none;
    }
`;

export const CookHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
`;

export const CookPhoto = styled.img`
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 8px; 
`;

export const CookName = styled.h2`
    padding: 10px 0px;
    margin-left: 10px;
    text-align: center;
`;

export const CookDetails = styled.div`
    padding: 10px;
    width: 100%;
`;
export const CookTitle = styled.h3`
    
`;
export const CookPrice = styled.h4`
    color: green;
`;

export const CookLocation = styled.div`
    font-size: 18px;
    color: rgb(25, 66, 94);
`;
export const CookDescription = styled.p`
    
`;


