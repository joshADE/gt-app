import styled from 'styled-components';

export const StyledInner = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0%;
    justify-content: center;
    max-height: 90vh;
`;

export const StyledInnerTop = styled.div`
    background-color: ${({ theme }) => theme.bgAlt};
    height: auto;
    overflow-y: scroll;
    max-height: 80%;
    max-width: 100%;
    padding-bottom: 20%;
    border-left: 2px solid black;
    border-right: 2px solid black;
    border-radius: 5px;
`;


export const StyledInnerBottomHead = styled.div`
  display: flex;
  flex-direction: row;
  & > * {
    margin-right: 2px;
  }
  padding: 2px;
  height: 40px;
  width: 100%;
  background: ${({ theme }) => theme.button};
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
  ${'' /* transition: height 1s ease-in; */}
`;

export const StyledInnerBottomFoot = styled.div`
  height: 60px;
  transition: height 0.5s ease-out;
`;

export const StyledInnerBottom = styled.div`
  height: ${({ expanded }) => expanded?"300px":"100px"};
  max-height: 20%;
  border: 2px solid black;
  background: #677;
  border-radius: 5px;
  /* used for animation of sideview, not implemented */
  transition: height 0.5s ease-out;

    & > ${StyledInnerBottomHead} {
        height: ${({ expanded }) => expanded?"40px":"40px"};
    }

    & > ${StyledInnerBottomFoot} {
        height: ${({ expanded }) => expanded?"260px":"60px"};
    }
  
 
`;




