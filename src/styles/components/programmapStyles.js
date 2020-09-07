import styled from 'styled-components';
import { Table, Button } from 'reactstrap';
import { popin } from './animations';


export const StyledMap = styled(Table)`
    ${'' /* border: 8px double black; */}
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.color};
    border-color: ${({ theme }) => theme.border} !important;
`; 

export const StyledMapHead = styled.thead`
    text-align: center;
    
`; 

export const StyledMapBody = styled.tbody`
    
`; 


export const StyledMapHeading = styled.th`
    text-align: center;
    min-width: 50px;
    margin: 2px;
    font-weight: 900;
    max-height: 100%;
    border-radius: 5px;
    border-color: ${({ theme }) => theme.border} !important;
    
    @media screen and (max-width: ${({ theme }) => theme.breakpoint}){
        max-height: 70px;
    }
`; 

export const StyledMapData = styled.td`
     width: 200px;
     margin: 2px;
     border-radius: 5px;
     border-color: ${({ theme }) => theme.border} !important;
    
`; 

export const StyledMapDataAnimated = styled(StyledMapData)`
    animation: ${popin} 0.5s ease once;
`;

export const StyledMapRow = styled.tr`
    display: flex;
    @media screen and (max-width: ${({ theme }) => theme.breakpoint}){
        align-items: center;
        padding: 2% 25%;
        & > * {
            width: 100%;
        }
        & > ${StyledMapHeading}:first-of-type {
            background: ${({ theme }) => theme.bgAlt};
            color: ${({ theme }) => theme.bg};
        }
    }
`;

export const StyledMapRowResponsive = styled(StyledMapRow)`
    
        
    @media screen and (max-width: ${({ theme }) => theme.breakpoint}){
        width: 100%;
        
        flex-direction: column;
        justify-content: flex-start;
        ${'' /* flex-wrap: wrap; */}
        ${'' /* width: 100%; */}
    }
`;

export const StyledTermRow = styled(StyledMapRowResponsive)`
    
    height: auto;
    @media screen and (max-width: ${({ theme }) => theme.breakpoint}){
        height: auto;
        
    }
`;

export const StyledButton = styled(Button)`
    
    display: inline-block;
    border: none;
    background: ${({ theme }) => theme.button};
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.buttonHover};
    }
    &:hover, &:active, &:focus, &:target { 
        background: ${({ theme }) => theme.buttonHover};
    }
    
`;

export const StyledButtonAdd = styled(StyledButton)`
    &:hover {
        background: rgb(130, 230, 210);
    }
`;

export const StyledButtonDelete = styled(StyledButton)`
    &:hover {
        background: rgb(247, 154, 154);
    }
`;

export const StyledButtonSave = styled(StyledButton)`
    &:hover {
        background: rgb(180, 200, 200);
    }
`;

export const StyledButtonReset = styled(StyledButton)`
    &:hover {
        background: rgb(228, 27, 27);
    }
`;




