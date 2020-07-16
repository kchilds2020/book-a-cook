import styled from 'styled-components'

export const MenuItemContainer = styled.div`
    position: relative;
    background-color: white;
    
    padding: 20px;
    width: 95%;
    margin: 10px auto;;
    max-height: 340px;
    max-width: 900px;
    display: flex;
    justify-content: space-between;
    border-radius: 8px;

    @media only screen and (max-width: 750px) {
        flex-direction: column;
        align-items: center;
        max-height: none;
    }
`;

export const MenuItemDescription = styled.div`
    font-size: 18px;
    max-height: 200px;
    overflow: hidden;
    color: #777;
    font-style: italic;
`;

export const MenuItemSpan = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
`;

export const MenuItemPrice = styled.div`
    font-size: 32px;
    color: green;
    ${'' /* background-color: #f4f4f4;
    border-radius: 8px;
    border: green 2px dashed; */}
    padding: 3px;
    margin-left: 5px;
`;

export const MenuItemLocation = styled.div`
font-size: 24px;
color: #17a2b8;
`;

export const MenuItemPhoto = styled.img`
width: 300px;
height: 300px;
object-fit: cover;
border-radius: 8px;


@media only screen and (max-width: 750px) {
    width: 100%;
}
`;

export const MenuItemDetails = styled.div`
width: 100%;
max-width: 600px;
margin-left: 20px;
display: flex;
flex-direction: column;
justify-content: space-between;

@media only screen and (max-width: 750px) {
    margin: 0px;

}
`;

export const MenuItemTitle = styled.div`
font-size: 32px;
`;


export const NumberInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 10px;
`;

export const NumInput = styled.input`
    width: 40px;
    text-align: center;
    font-size: 20px;
    margin: 0px 5px;
    border: none;
    background-color: transparent;
`;

export const NumberInputButtons = styled.button`
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0px 0px 8px #ddd;
    background-color: #17a2b8;
    color: #333;
`;