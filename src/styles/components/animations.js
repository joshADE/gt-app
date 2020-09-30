import { keyframes } from 'styled-components';

export const popin = keyframes`
    0% { opacity: 0; -webkit-transform: scale(0.5); }
	80% { opacity: 0.5; -webkit-transform: scale(1.1); }
	100% { opacity: 1; -webkit-transform: scale(1); }
`; 

export const fadeinbottom = keyframes`
    0% { opacity: 0; -webkit-transform: translateY(50%); }
	80% { opacity: 0.5; -webkit-transform: translateY(25%); }
	100% { opacity: 1; -webkit-transform: translateY(0%); }
`; 