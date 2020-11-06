import styled from 'styled-components';
import { Button } from 'reactstrap';

export const StyledInner = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0%;
    justify-content: center;
    max-height: 89vh;
`;

export const StyledInnerTop = styled.div`
    background-color: ${({ theme }) => theme.bgAlt};
    height: auto;
    overflow-y: scroll;
    max-height: 80%;
    max-width: 100%;
    padding-bottom: 20%;
    border-left: 1px solid ${({ theme }) => theme.border};
    border-right: 1px solid ${({ theme }) => theme.border};
`;

export const StyledInnerBottomHeadContainer = styled.div`
    background: ${({ theme }) => theme.bgUI};
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
  width: 100%;
  background: ${({ theme }) => theme.bgUI};
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
  ${'' /* border-bottom: 1px solid black; */}
  ${'' /* transition: height 1s ease-in; */}
`;

export const StyledInnerBottomFoot = styled.div`
  height: 50px;
  transition: height 0.5s ease-out;
  
  border-radius: 0 0 15px 15px;
`;

export const StyledInnerBottom = styled.div`
  height: ${({ expanded }) => expanded?"300px":"100px"};
  max-height: 20%;
  ${'' /* border: 1px solid ${({ theme }) => theme.border}; */}
  ${'' /* background: black; */}
  border-radius: 0 0 15px 15px;
  /* used for animation of sideview, not implemented */
  transition: height 0.5s ease-out;

    & > ${StyledInnerBottomHead} {
        height: ${({ expanded }) => expanded?"40px":"40px"};
    }

    & > ${StyledInnerBottomFoot} {
        height: ${({ expanded }) => expanded?"250px":"50px"};
    }
  
 
`;



export const StyledButtonPrimary = styled(Button)`
    font-weight: 700;
    border-radius: 15px;
    border:1px solid #727272;
    background: #11A860;
    height: 100%;
    color: #ECECEC;
    &:hover {
        background: #788;
    }
`;

export const StyledButtonSecondary = styled(Button)`
    font-weight: 700;
    border-radius:15px;
    border:1px solid #727272;
    background: #A2E1CA;
    height: 100%;
    color: #11A860;
    &:hover {
        background: #788;
    }
`;
