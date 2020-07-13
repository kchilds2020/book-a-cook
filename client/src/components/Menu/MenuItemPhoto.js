import styled from 'styled-components'

const MenuItemPhoto = styled.img`
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;


    @media only screen and (max-width: 750px) {
        width: 100%;
    }
`;

export default MenuItemPhoto