import styled from 'styled-components'
export const PostContainer = styled.div`
    background-color: #f4f4f4;
    width: 95%;
    padding: 20px;
    margin: 10px auto;
    box-shadow: 0px 0px 4px #333;
    border-radius: 8px;
`;

export const Title = styled.div`
    font-size: 32px;
    color: black;
    padding: 5px;
`;

export const Description = styled.div`
    font-size: 20px;
    color: #888;
    padding: 5px;
    font-style: italic;
    max-height: 200px;
    overflow: hidden;
`;

export const Bold = styled.span`
    color: #333;
    font-weight: bold;
`;


export const SameLine = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const SubText = styled.div`
    font-size: 18px;
    color: #333;
    padding: 5px;
    font-style: italic;
`;