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
`;


export const StyledInnerBottomHead = styled.div`
  display: flex;
  flex-direction: row;
  & > * {
    margin-right: 2px;
  }
  padding: 0 2px;
  height: 40%;
  width: 100%;
  background: ${({ theme }) => theme.button};
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
  transition: height 1s ease-in;
`;

export const StyledInnerBottomFoot = styled.div`
  height: 60%;
  transition: height 1s ease-in;
`;

export const StyledInnerBottom = styled.div`
  height: ${({ expanded }) => expanded?"30vh":"10vh"};
  max-height: 20%;
  border: 2px solid black;
  background: #677;
  border-radius: 5px;
  /* used for animation of sideview, not implemented */
  transition: height 0.5s ease-out;

    & > ${StyledInnerBottomHead} {
        height: ${({ expanded }) => expanded?"15%":"40%"};
    }

    & > ${StyledInnerBottomFoot} {
        height: ${({ expanded }) => expanded?"85%":"60%"};
    }
  
 
`;




