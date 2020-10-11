import React from 'react';
import { StyledButtonPrimary } from '../styles/components/homeStyles';
function SaveChanges(props) {
    return (
        <StyledButtonPrimary
            onClick={props.onSaveClick}
            style={buttonStyle}
            //className="btn btn-save"
            type="button"
        >
        Save the changes
        </StyledButtonPrimary>
    )
}
const buttonStyle = {
    fontSize: '1.1rem',
};

export default SaveChanges;
