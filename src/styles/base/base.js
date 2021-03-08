import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 10px;
    }

    body{
    font-family: 'Roboto', sans-serif;
    line-height: 1.4;
    font-size: 10px;
    ${'' /* background: ${({ theme }) => theme.bgBody}; */}
    }

    a {
    color: #333;
    text-decoration: none;
    }



    h1{ font-size: 20px; }
    h2{ font-size: 16px; }
    h3{ font-size: 12px; }
    h4{ font-size: 8px; }
    input{font-size: 10px; padding: 0;}

`;


export default GlobalStyles;