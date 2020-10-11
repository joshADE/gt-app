import React from 'react'
import { StyledButtonSecondary } from '../styles/components/homeStyles';
function ResetChanges(props) {
    return (
        <StyledButtonSecondary
            type="button"
            onClick={props.onResetClick}
            style={buttonStyle}
            //className="btn btn-reset"
            //value="Reset the changes"
        >
        Reset the changes
        </StyledButtonSecondary>
    )
}
const buttonStyle = {
    fontSize: '1.1rem',
};

export default ResetChanges;
