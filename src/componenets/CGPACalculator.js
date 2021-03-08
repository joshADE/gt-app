import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Label } from 'reactstrap';
//import * as AllActionsCreators from '../redux/index';
import { StyledInnerBottomHeadItem, StyledButton, StyledInput } from '../styles/components/homeStyles';

export class CGPACalculator extends Component {
    constructor(props){
        super(props);
        this.state = {
            term: this.props.courses.length, // last term
            CGPA: 0,
            type: 'up to'
        };
    }

    convertNumericToGradePoint = (numericGrade, GPAStops) => {
        let gradepoint = 0;
        GPAStops.forEach(stop => {
            //console.log(stop.lower, stop.upper, stop.gradepoint);
            if (numericGrade >= stop.lower && numericGrade <= stop.upper){
                gradepoint = stop.gradepoint;
            }
        });
        return gradepoint;

    }


    onSubmit = (e) => {
        e.preventDefault();
        const { courses, schools, currentSchool } = this.props;
        const { term, type } = this.state;
        if (term > -1){
            let allcourses = [];
            if (type === 'up to'){
                allcourses = courses.slice(0, term);
                allcourses = [].concat.apply([], allcourses); // flatten the 2d array
            }else if (type === 'at'){
                allcourses = courses[term - 1];
            }
            if (schools[currentSchool] && schools[currentSchool].length !== 0){
                let GPAStops = schools[currentSchool];
                GPAStops = GPAStops.sort((a, b) => b.upper - a.upper);
        
                // convert numeric grades to grade points
                allcourses = allcourses.map(course => ({grade: this.convertNumericToGradePoint(course.grade, GPAStops), credits: course.credits}));
            }

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

    onChange = (e) => this.setState({[e.target.name]: e.target.value, CGPA: 0 });

    
    render() {

        const { courses, currentSchool, schools } = this.props;
        const { term } = this.state;

        const options = courses.map((cList, index) => {
            return <option key={index+1} value={index + 1}>{index + 1}</option>;
        });
        options.unshift(
            <option key={-1} value={-1}>Choose an option</option>
        );


        return (
            
            <StyledInnerBottomHeadItem
            onSubmit={this.onSubmit}
            >
                <Label>Using {!schools[currentSchool] ||schools[currentSchool].length === 0? 'no grade point conversion': currentSchool + '\'s grade point conversion'}, </Label>
                <Label style={{width: 'auto' }}>GPA of the courses|</Label>
                {' '}
                <Label><input type="radio" name="type" value="up to" onChange={this.onChange} checked={this.state.type === 'up to'} /> up to </Label>{' '} 
                {' '}
                <Label><input type="radio" name="type" value="at" onChange={this.onChange} checked={this.state.type === 'at'} /> at </Label>{' '}
                {' '}
                <Label>|term:</Label>
                
                <StyledInput type="select" id="exampleSelect" 
                name="term"
                onChange={this.onChange}
                defaultValue={term}
                >
                    {options}
                </StyledInput>
                
                <StyledButton type="submit" value="Calculate"/>
                
                <Label style={{width: 'auto' }}>{(this.state.type === 'up to' ? 'CGPA': 'GPA')}: {this.state.CGPA}</Label>
            </StyledInnerBottomHeadItem>
            
        )
    }
}

// PropTypes
CGPACalculator.propType = {
    courses: PropTypes.array.isRequired,
}




const mapStateToProps = state => {
    return {
      schools: state.settings.schools,
      currentSchool: state.settings.currentSchool,
    }
  }
  
  
  const mapDispatchToProps = dispatch => {
    return {

    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CGPACalculator);
