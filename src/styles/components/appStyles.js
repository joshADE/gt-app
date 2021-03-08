import styled from 'styled-components';

export const StyledAppContainer = styled.div`
  padding: 0.2rem;
  width: 100%;
  min-height: 100vh;

  &  input:focus, & select:focus {
    border-color: #16123a;
    box-shadow: 0 0 0 .2rem rgba(128, 119, 212, 0.2);
  }
`;

export const StyledFileInput = styled.input`
  padding: 0.2rem;
  background-color: #eee;
  border-radius: 5px;
  border: 1px solid #444;
`;