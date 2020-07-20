import styled from 'styled-components'
import img from '../../images/landing.jpg'

export const LandingBody = styled.div`
    height: 95vh;
    width: 100%;
    
    background-image: url(${img});
    background-size: fill;
    background-position: top left;
    z-index: -1;

    @media only screen and (max-width: 1260px) {
        background-position-y: bottom;
    }
`;

export const LandingOverlay = styled.div`
    height: 95vh;
    width: 100%;
    background-color: rgba(0,0,0,.6);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

export const LandingContainer = styled.div`
    width: 100%;
    height: 95vh;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    z-index: 100;

    @media only screen and (max-width: 1260px) {
        flex-direction: column-reverse;
        justify-content: center;
    }
`;

export const LandingDescription = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 20px;
    width: 600px;
    color: white;
    padding: 20px;
    border-radius: 8px;

    @media only screen and (max-width: 1260px) {
        padding: 10px;
        margin-top: 40px;
        width: 95%;
        max-width: 600px;
        text-align: center;
    }
`;
export const LandingTitle = styled.h1`
    letter-spacing: 4px;
    font-size: 64px;
    font-weight: bold;

    @media only screen and (max-width: 1260px) {
        font-size: 40px;
        letter-spacing: 0px;
    }
`;
export const LandingTagline = styled.h2`
    font-style: italic;
    text-align: center;

    @media only screen and (max-width: 1260px) {
        font-size: 24px;
    }
`;

export const LandingSection = styled.div`
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 20px;

    @media only screen and (max-width: 1260px) {
        width: 95%;
        max-width: 600px;
        text-align: center;
    }
`;
