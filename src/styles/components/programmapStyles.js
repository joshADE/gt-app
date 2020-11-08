import styled from 'styled-components';
import { Table, Button } from 'reactstrap';
import { fadeinbottom } from './animations';


export const StyledMap = styled(Table)`
    ${'' /* border: 8px double black; */}
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.color};
    border-color: ${({ theme }) => theme.border} !important;
    border-radius: 5px;
`; 

export const StyledFocusElement = styled.td`
    position: absolute;
    z-index: 3;
    border-radius: 5px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    transition: all 0.5s cubic-bezier(0.71, 0.03, 0.56, 0.85);
    opacity: 0;
    display: none;
    pointer-events: none;
    overflow: hidden;
    border: 2px solid rgba(129, 255, 249, 1);
    box-shadow:0 0 14px 4px ${({ theme }) => theme.selectedCourse};
    &.active {
        opacity: 1;
        display: block;
    }

`;

export const StyledMapHead = styled.thead`
    text-align: center;
    
`; 

export const StyledMapBody = styled.tbody`
    height: 100%;
`; 


export const StyledMapHeading = styled.th`
    text-align: center;
    min-width: 50px;
    margin: 2px;
    font-weight: 900;
    max-height: 100%;
    border-radius: 5px;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    background-clip: padding-box;
    border: 1px solid ${({ theme }) => theme.border} !important;
    border-radius: .25rem;
    & svg {
        width: 20px;
        height: 20px;
        path {
            fill: ${({ theme, isEditing }) => isEditing?theme.button : 'grey'};
        }
    }
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

export const StyledCourseData = styled(StyledMapData)`
    transition: height 0.5s ease;
    height: ${({ isEditing }) => isEditing?'57vh':'30vh'};
    animation: ${fadeinbottom} 1s ease once;
`;


export const StyledMapRow = styled.tr`
    display: flex;


    &.selected-term th, &.selected-term td {
        background-color: ${({ theme }) => theme.selectedTerm};
    }

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
    border: 1px solid black;
    background: ${({ theme }) => theme.button};
    color: #fff;
    padding: 7px 20px;
    cursor: pointer;
    &:hover {
        background: ${({ theme }) => theme.buttonHover};
    }
    &:hover, &:active, &:focus, &:target { 
        background: ${({ theme }) => theme.buttonHover};
        border-color: black;
        box-shadow: none;
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




