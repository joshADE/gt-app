import React from 'react'
import { Link } from 'react-router-dom';
import { StyledHeader } from '../../styles/components/headerStyles';
function Header() {
    return (
        <StyledHeader>
            <h1>Grade Tracker</h1>
            <Link style={linkStyle} to="/">Home</Link> | {' '}  
            <Link style={linkStyle} to="/about">About</Link> | {' '}  
            <Link style={linkStyle} to="/instructions">Instructions</Link> | {' '}
            <Link style={linkStyle} to="/settings">Settings</Link>
        </StyledHeader>
    )
}


const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

export default Header;
