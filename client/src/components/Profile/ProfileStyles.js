import styled from 'styled-components'

export const ProfileForm = styled.form`
    margin: auto;
    margin-top: 20px;
    margin-bottom: 100px;
    border-radius: 8px;
    box-shadow: 0px 0px 4px #333;
    width: 95%;
    background-color: #f4f4f4;
`;

export const ProfilePhoto = styled.img`
    margin: auto 20px;    
    border-radius: 8px;
    width: 300px;
    height: 300px;
    object-fit: cover;
    cursor: pointer;


    @media only screen and (max-width: 700px) {
        margin: 20px;
    }

   
`;

export const BasicInfo = styled.div`
    display: flex;
    justify-content: space-around;

    @media only screen and (max-width: 700px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const BasicDetails = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
`;

export const ProfileHeader = styled.div`
    text-align: center;
    font-size: 24px;
    padding: 10px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const UpdateButton = styled.button`
    position: fixed;
    z-index: 20;
    bottom: 10px;
    left: 50%;
    width: 300px;
    -webkit-transform: translate(-50%,calc(-50% - .5px));
      -moz-transform: translate(-50%,calc(-50% - .5px));
      -ms-transform: translate(-50%,calc(-50% - .5px));
      -o-transform: translate(-50%,calc(-50% - .5px));
      transform: translate(-50%,calc(-50% - .5px));
    height: 50px;
    border: none;
    margin: auto;
    margin-top: 10px;
    background-color: #007bff;
    border: none;
    color: white;
    border-radius: 6px;
    box-shadow: 0px 0px 4px #333;

    :disabled{
        background-color: rgba(0,123,255,.4)
    }
`;

