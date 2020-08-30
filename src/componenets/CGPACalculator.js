import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Input, Label } from 'reactstrap';

export class CGPACalculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: this.props.courses.length, // last term
            CGPA: 0,
        };
    }


    onSubmit = (e) => {
        e.preventDefault();
        const { courses } = this.props;
        const { term } = this.state;
        if (term > -1){
            let allcourses = courses.slice(0, term);
            allcourses = [].concat.apply([], allcourses); // flatten the 2d array
            console.log(allcourses);
            let totalPoints = allcourses.reduce((prev, curr) => prev + curr.grade * curr.credits, 0);
            let totalCredits = allcourses.reduce((prev, curr) => prev + curr.credits, 0);
            if (totalCredits === 0) totalCredits = 1; // to prevent divide by 0
            this.setState({
                CGPA: Math.round(totalPoints/ totalCredits* 100) / 100,
            });
        }else{
            this.setState({
                CGPA: 0
            });
        }
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value });

    
    render() {

        const { courses } = this.props;
        const { term } = this.state;

        const options = courses.map((cList, index) => {
            return <option key={index+1} value={index + 1}>{index + 1}</option>;
        });
        options.unshift(
            <option key={-1} value={-1}>Choose an option</option>
        );


        return (
            
            <form style={gradeFinderStyle}
            onSubmit={this.onSubmit}
            >
                
                <Label style={{width: 'auto' }}>GPA of the courses up to term:</Label>
                
                <Input type="select" id="exampleSelect"
                style={inputStyle} 
                name="term"
                onChange={this.onChange}
                defaultValue={term}
                >
                    {options}
                </Input>
                
                <input type="submit" style={btnStyle} value="Calculate"/>
                
                <Label style={{width: 'auto' }}>CGPA: {this.state.CGPA}</Label>
                
            </form>
            
        )
    }
}

// PropTypes
CGPACalculator.propType = {
    courses: PropTypes.array.isRequired,
}

const gradeFinderStyle = {
    padding: '0px 15px',
    borderRadius:'5px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    background: 'transparent',
    border: '2px outset black',
    color: 'white',
    height: '100%'
};

const btnStyle = {
    display: 'inline-block',
    border: '1px outset black',
    background: '#677',
    borderRadius: '5px',
    color: '#fff',
    padding: '2px 10px',
    cursor: 'pointer',
    height: 'auto',
    margin: '1px 10px',
};

const inputStyle = {
    background: 'lightgrey',
    borderRadius: '5px',
    height: 'auto',
    width: 'auto',
    margin: '1px 10px',
}


export default CGPACalculator
