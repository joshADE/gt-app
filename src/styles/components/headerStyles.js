import styled from 'styled-components';

export const StyledHeader = styled.header`
    border: 1px solid ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.button};
    text-align: center;
    border-radius: 5px 5px 0 0;
    color: #fff;
    padding: 5px;
    height: 10vh;

    & a {
        background-color: rgba(255, 255, 255, 0.1);
        padding: 5px;
        font-weight: 700;
        border-radius: 5px;
        display: inline-block;
        & > * {
            margin: auto 5px;
        }
    }

    

    & svg {
        width: 3vmin;
        height: 3vmin;
        
        fill: white;
        transition: all 1s ease;
        &:hover {
            fill: rgb(196, 243, 231);
        }
    }
`;