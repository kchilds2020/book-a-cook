import styled from 'styled-components'

const MenuItemDetails = styled.div`
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

export default MenuItemDetails