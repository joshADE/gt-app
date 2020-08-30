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