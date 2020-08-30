import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 1.5vmin;
    }

    body{
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
    font-size: 1.5vmin;
    }

    a {
    color: #333;
    text-decoration: none;
    }



    h1{ font-size: 20px; }
    h2{ font-size: 16px; }
    h3{ font-size: 12px; }
    h4{ font-size: 8px; }
    input{font-size: 1.5vmin; padding: 0;}

`;


export default GlobalStyles;