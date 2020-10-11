import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Input, Label } from 'reactstrap';

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
            
            <form style={gradeFilterStyle}
            onSubmit={this.onSubmit}

            >
                <Label style={{lineHeight: '15px', width: 'auto', alignSelf: 'center' }}>Courses with grade </Label>
                <Input 
                type="select"
                style={inputStyle}
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
                </Input>
                <Input style={inputStyle} type="text" onChange={this.onChange}  name="val" value={this.state.value} placeholder={0.0} />
                <input style={btnStyle} type="submit" value="Filter"/>
            </form>
            
        )
    }
}

// PropTypes
GradeFilter.propType = {
    onClickFilterByCategory: PropTypes.func.isRequired,
}

const gradeFilterStyle = {
    fontWeight: 700,
    padding: '0px 15px',
    borderRadius:'5px',
    display: 'flex',
    width: 'auto',
    background: '#727272',
    // border: '1px solid black',
    color: 'white',
    height: '100%'
};

const inputStyle = {
    background: 'lightgrey',
    borderRadius: '5px',
    alignSelf: 'center',
    height: 'auto',
    width: 'auto',
    margin: '1px 10px',
}

const btnStyle = {
    display: 'inline-block',
    border: '1px solid #9C9C9C',
    background: '#64AA8E',
    borderRadius: '15px',
    alignSelf: 'center',
    color: '#fff',
    padding: '2px 10px',
    cursor: 'pointer',
    height: 'auto',
    margin: '1px 10px',
};

export default GradeFilter
