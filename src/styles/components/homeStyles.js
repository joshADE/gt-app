import styled from 'styled-components';
import { Button, Input } from 'reactstrap';

export const StyledInner = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0%;
    justify-content: center;
    max-height: 89vh;
`;

export const StyledInnerTop = styled.div`
    background-color: ${({ theme }) => theme.bgAlt};
    height: 100vh; ${'' /*  a fix */}
    overflow-y: scroll;
    max-height: 80%;
    max-width: 100%;
    border-left: 1px solid ${({ theme }) => theme.border};
    border-right: 1px solid ${({ theme }) => theme.border};
`;

export const StyledInnerBottomHeadItem = styled.form`
    padding: 0px 15px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    width: auto;
    background: ${({ theme }) => theme.panelColor};
    color: ${({ theme }) => theme.textColor};
    height: 100%;
    font-weight: 700;

    label {
        white-space: nowrap;
    }
`;

export const StyledButton = styled.input`
    display: inline-block;
    border: 1px solid #9C9C9C;
    background: ${({ theme }) => theme.tertiaryColor};
    border-radius: 15px;
    color: #fff;
    padding: 2px 10px;
    cursor: pointer;
    height: auto;
    margin: 1px 10px;
`;

export const StyledInput = styled(Input)`
    background: darkgrey;
    border-radius: 5px;
    height: auto;
    width: auto;
    margin: 1px 10px;
`;

export const StyledInnerBottomHeadContainer = styled.div`
    background: ${({ theme }) => theme.panelAlt};
    border: 1px solid #EEE;
    border-radius: 5px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const StyledInnerBottomHead = styled.div`
  display: flex;
  flex-direction: row;
  & > * {
    margin: 1px 5px;
  }
  padding: 1px;
  height: 40px;
  background: ${({ theme }) => theme.panelAlt};
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
  ${'' /* overflow-x: hidden; */}
  ${'' /* border-bottom: 1px solid black; */}
  ${'' /* transition: height 1s ease-in; */}
`;

export const StyledHorizontalNavButton = styled.button`
    margin: 0 5px;
    width: 20px;
    border-radius: 10px;
    height: 30px;
    display: block;
    border: 2px solid grey;
    outline: none;
    font-weight: bolder;
    font-size: 15px;
    color: grey;
`;

export const StyledScrollIndicator = styled.div`
    width: 30px;
    color: #000;
    background-color: #e5e5e5;
    border-radius: 5px;
    border: 2px solid grey;
    padding: 5px;
    margin: 5px;
`;

export const StyledInnerBottomFoot = styled.div`
  height: 50px;
  transition: height 0.5s ease-out;
  
  border-radius: 0 0 15px 15px;
`;

export const StyledInnerBottom = styled.div`
  height: ${({ expanded }) => expanded?"310px":"110px"};
  max-height: 20%;
  ${'' /* border: 1px solid ${({ theme }) => theme.border}; */}
  ${'' /* background: black; */}
  border-radius: 0 0 15px 15px;
  /* used for animation of sideview, not implemented */
  transition: height 0.5s ease-out;

    & ${StyledInnerBottomHead} {
        height: ${({ expanded }) => expanded?"40px":"40px"};
    }

    & ${StyledInnerBottomFoot} {
        height: ${({ expanded }) => expanded?"250px":"50px"};
    }
  
 
`;

export const StyledInnerBottomWrapper = styled.div`
    background-color: ${({ theme }) => theme.panelColor};
    padding: 5px;
    height: 100%;
`;



export const StyledButtonPrimary = styled(Button)`
    font-weight: 700;
    border-radius: 15px;
    background: ${({ theme }) => theme.primaryColor};
    height: 100%;
    color: #FFF;
    &:hover {
        background: #788;
    }
`;

export const StyledButtonSecondary = styled(Button)`
    font-weight: 700;
    border-radius:15px;
    background: ${({ theme }) => theme.secondaryColor};
    height: 100%;
    color: #FFF;
    &:hover {
        background: #788;
    }
`;
