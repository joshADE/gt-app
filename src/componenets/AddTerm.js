import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { StyledButtonAdd } from '../styles/components/programmapStyles';


export class AddTerm extends Component {
    render() {
        return (
            
        <StyledButtonAdd 
        type="button" 
        onClick={this.props.handleClickAddTerm} 
        style={addNewTermStyle}
        >
            Add a new term
        </StyledButtonAdd>
        )
    }
}



// PropTypes
AddTerm.propType = {
    termNumber: PropTypes.number.isRequired,
    handleClickAddTerm: PropTypes.func.isRequired,
}

const addNewTermStyle = {
    width:'100%',
};


export default  AddTerm;