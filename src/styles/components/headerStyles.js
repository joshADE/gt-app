import styled from 'styled-components';

export const StyledHeader = styled.header`
    border: 2px solid black;
    background-color: ${({ theme }) => theme.button};
    text-align: center;
    color: #fff;
    padding: 10px;
`;