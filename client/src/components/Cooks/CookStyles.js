import styled from 'styled-components'

export const CookContainer = styled.div`
    display: flex;
    background-color: white;
    width: 95%;
    border-radius: 8px;
    max-width: 1000px;
    margin: 10px auto;
    padding: 20px;
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
`;

export const CookPhoto = styled.img`
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 8px; 

    @media only screen and (max-width: 750px) {
        width: 100%;
        margin-bottom: 20px;
    }


`;

export const CookName = styled.h2`
`;

export const CookDetails = styled.div`
    padding: 0px 10px;
    width: 100%;
`;
export const CookTitle = styled.h3`
    font-size: 24px;
`;
export const CookPrice = styled.h4`
    color: green;
`;

export const CookLocation = styled.div`
    font-size: 24px;
    color: #17a2b8;
`;
export const CookDescription = styled.p`
    height: 100px;
    overflow: hidden;
    margin-bottom: 20px;
`;


