import styled from 'styled-components';
import { Button } from 'reactstrap';
import Select from 'react-select'

export const StyledContainer = styled.div`
    background: ${({theme})=>theme.sidePanel};
    width: 100%;
    text-align: center;
    border: 2px solid grey;   
    overflow-y: scroll;
    height: 100%; 
`;

export const StyledButtonShow = styled(Button)`
    border:1px outset black;
    border-radius:5px;
    padding: 5px;
    background: #677;
    &:hover {
        background: #788;
    }
`;



export const StyledSelect = styled(Select)`
    margin: 10px 20%;
    @media screen and (max-width: ${({ theme }) => theme.breakpoint}){
        margin: 10px 10%;
    }
    
`;

export const StyleResponsiveContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    & > * {
        width: 100%;
        padding: 5px;
    }
    
`;

export const StyledCanvasContainer = styled.div`
      position: relative;
        height: 200px;
        min-height: 50%;
        width: 500px;
        overflow: scroll;
        max-width: 100%;
        max-height: 100%;
        background-color: grey;
        margin: auto;
        text-align: left;
        
`;

export const StyledCanvasNode = styled.div`
      
        position: absolute;
        height: ${({radius}) => `${radius * 2}px`};
        width: ${({radius}) => `${radius * 2}px`};
        border: 2px solid black;
        border-radius: 50%;
        top: ${({y}) => `${y}px`};
        left: ${({x}) => `${x}px`};
        color: white;

        
`;