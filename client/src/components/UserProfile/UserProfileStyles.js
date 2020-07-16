import styled from 'styled-components'

export const UserSectionContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

export const UserDetails = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

export const ProfileContainer = styled.div`
    width: 95%;
    margin: 20px auto;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
`;

export const UserDetail = styled.div`
    font-size: 24px;
    font-weight: 400;
    text-align: center;
`;
export const UserName = styled.div`
    font-size: 28px;
    font-weight: 800;
    text-align: center;
`;
export const ContactInfo = styled.div`
    
`;

export const ReviewContainer = styled.div`
    width: 100%;
    border-bottom: #ccc 1px solid;
`;

export const ReviewCustomer = styled.div`
    font-weight: bold;
`;
export const ReviewDescription = styled.div`
   
`;

export const CookDetails = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    text-align: left;
`;

export const CookDetail = styled.div`
    font-size: 18px;
    padding: 20px 0px;
`;

export const ContactButtons = styled.div`
    width: 100%;
    margin: 20px;
`;


export const ReviewForm = styled.form`
   background-color: white;
    padding: 20px;
    position: fixed;
    max-width: 400px;
    z-index: 300;
    top: 50%;
    left: 50%;
      -webkit-transform: translate(-50%,calc(-50% - .5px));
      -moz-transform: translate(-50%,calc(-50% - .5px));
      -ms-transform: translate(-50%,calc(-50% - .5px));
      -o-transform: translate(-50%,calc(-50% - .5px));
      transform: translate(-50%,calc(-50% - .5px));
      box-shadow: 0px 0px 8px #333;
      border-radius: 8px;

      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
`;

