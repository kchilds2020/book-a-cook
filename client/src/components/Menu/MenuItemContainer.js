import styled from 'styled-components'

const MenuItemContainer = styled.div`
    position: relative;
    background-color: white;
    margin: 10px;
    padding: 20px;
    width: 100%;
    max-height: 340px;
    max-width: 900px;
    box-shadow: 0px 0px 4px #333;
    display: flex;
    justify-content: space-between;
    border-radius: 8px;

    @media only screen and (max-width: 750px) {
        flex-direction: column;
        align-items: center;
        max-height: none;
    }
`;

export default MenuItemContainer