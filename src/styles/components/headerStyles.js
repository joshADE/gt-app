import styled from 'styled-components';

export const StyledHeaderWrapper = styled.div`
    padding: 5px;
    background-color: ${({ theme }) => theme.panelColor};
    height: 10vh;
`;

export const StyledHeader = styled.header`
    
    background-color: ${({ theme }) => theme.panelAlt};
    text-align: center;
    border-radius: 5px;
    color: ${({ theme }) => theme.textColor};
    padding: 1px;
    height: 100%;

    & a {
        color: #B6B2B3;
        border-radius: 5px;
        text-decoration: none;
        outline: none;
        padding: 5px 10px;
        font-weight: 700;
        border-radius: 5px;
        display: inline-block;
        & > * {
            margin: auto 5px;
        }
    }

    & a.current-link {
        background-color: ${({ theme }) => theme.primaryColor};
        color: #fff;

        & svg {
            fill: #fff;
        }
    }

    

    & svg {
        width: 10px;
        height: 10px;
    
        fill: #B6B2B3;
        
    }
`;