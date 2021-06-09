import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';
import { StyledInnerBottomHeadItem, StyledButton, StyledInput } from '../styles/components/homeStyles';

export class GradeFilter extends Component {
        

    constructor(props){
        super(props);
        this.state = {
            category: '2',
            val: 0.0
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {category, val} = this.state;
        this.props.onClickFilterByCategory(category, val);
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value });

    
    render() {
        return (
            
            <StyledInnerBottomHeadItem
            onSubmit={this.onSubmit}

            >
                <Label>Courses with grade </Label>
                <StyledInput 
                type="select"
                id="filter"
                name="category"
                onChange={this.onChange}
                defaultValue={this.state.category}
                >
                    <option value={1}>greater than</option>
                    <option value={2}>less than</option>
                    <option value={3}>equal to</option>
                    <option value={4}>greater than or equal to</option>
                    <option value={5}>less than or equal to</option>
                </StyledInput>
                <StyledInput type="text" onChange={this.onChange}  name="val" value={this.state.value} placeholder={0.0} />
                <StyledButton type="submit" value="Filter"/>
            </StyledInnerBottomHeadItem>
            
        )
    }
}

// PropTypes
GradeFilter.propType = {
    onClickFilterByCategory: PropTypes.func.isRequired,
}


export default GradeFilter
