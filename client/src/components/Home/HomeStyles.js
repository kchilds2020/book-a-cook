import styled from 'styled-components'

export const HomeContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

export const HomeSectionContainer = styled.div`
    width: 100%;
    max-width: 600px;
    border-radius: 8px;  
    padding: 20px;
    min-height: 300px;
`;

export const HomeGreeting = styled.div`
    width: 100%;
    max-width: 1160px;
    padding: 10px;
    text-align: center;
    background-color: #fff;
    margin-top:20px;
    border-radius: 4px;


    @media only screen and (max-width: 1218px) {
        max-width: 560px;
    }
    
`;


export const HomeHeader = styled.h3`
        width: 100%;
        text-align: center;
        background-color: white;
        border-radius: 4px;
        margin-top: 10px;
        padding: 10px;
`;

export const NumColorDark = styled.span`
    color: green;
`;

export const NumColorLight = styled.span`
    color: green;
`;


export const UpcomingJobContainer = styled.span`
    border-radius: 4px;
    margin: 10px 0px;
`;

export const JobPostContainer = styled.div`
    width: 100%;
    height: 58px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    border-bottom: rgb(221, 221, 221) 1px solid;
    background-color: white;

    cursor: pointer;
    margin: 5px 0px;
    border-radius: 4px;
`;

export const ApplicationContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: rgb(230, 230, 230);
    border-radius: 4px;
`;


export const LinkToProfile = styled.a`
    padding: 10px;
    color: rgb(13, 73, 151);
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
`;

export const JobPostTitle = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    margin-left: 10px;
`;

export const EventContainer = styled.div`
    width: 100%;
    text-align: center;
    background-color: white;
    border: #ccc 1px solid;
    border-radius: 4px;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;
export const EventImg = styled.img`
    width: 80%;
    max-width: 400px;
`;
export const EventDetails = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const EventSummary = styled.div`
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 800;
    text-align: center;
    border-radius: 6px 6px 0px 0px;
`;

export const EventInfo = styled.div`
    padding: 5px 20px;
    font-size: 18px;
    text-align: left;
`;