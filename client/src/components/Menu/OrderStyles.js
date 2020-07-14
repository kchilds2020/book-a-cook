import styled from 'styled-components'

export const OrderTitleContainer = styled.div`
    width: 100%;
    height: 100px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    border-radius: 8px;
    position: relative;
`;

export const OrderTitle = styled.div`
    font-size: 24px;
    color: white;
    position: absolute;
    top: 0px;
    left: 10px;
`;

export const OrderTitleImg = styled.img`
    opacity: .3;
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
}
`;

export const OrderInput = styled.input`
   width: 100%;
   margin-top: 5px;
   padding: 5px;
   border: #aaa 1px solid;
   border-radius: 8px;
   font-size: 14px;
   :focus{
       outline: none;
   }
}
`;

export const OrderHeader = styled.div`
    width: 100%;
    font-weight: 400;
    font-size: 18px;
    padding: 5px;
    margin: 10px 0px;
    margin: 0px;
    text-align: center;
`;

export const OrderPrice = styled.div`
    padding: 10px;
    font-size: 20px;
    text-align: center;
`;

export const Span = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 5px 0px;
`;

export const CardElementContainer = styled.div`
    border: #aaa 1px solid;
    border-radius: 8px;
    padding: 10px 5px; 
    margin: 5px 0px;
    font-size: 16px;
    background-color: white;
`;
