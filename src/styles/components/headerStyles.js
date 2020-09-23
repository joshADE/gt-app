import styled from 'styled-components';

export const StyledHeader = styled.header`
    border: 2px solid black;
    background-color: ${({ theme }) => theme.button};
    text-align: center;
    border-radius: 5px;
    color: #fff;
    padding: 10px;
`;