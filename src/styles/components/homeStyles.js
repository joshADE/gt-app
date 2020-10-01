import styled from 'styled-components';

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
  border-bottom: 1px solid black;
  ${'' /* transition: height 1s ease-in; */}
`;

export const StyledInnerBottomFoot = styled.div`
  height: 50px;
  transition: height 0.5s ease-out;
`;

export const StyledInnerBottom = styled.div`
  height: ${({ expanded }) => expanded?"300px":"100px"};
  max-height: 20%;
  border: 1px solid ${({ theme }) => theme.border};
  background: #677;
  border-radius: 0 0 5px 5px;
  /* used for animation of sideview, not implemented */
  transition: height 0.5s ease-out;

    & > ${StyledInnerBottomHead} {
        height: ${({ expanded }) => expanded?"40px":"40px"};
    }

    & > ${StyledInnerBottomFoot} {
        height: ${({ expanded }) => expanded?"250px":"50px"};
    }
  
 
`;




