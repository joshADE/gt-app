import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import { v3, v4, v5 } from 'uuid'
import './App.css';
import CourseClass from './componenets/data/CourseClass';
import ProgramMap from './componenets/ProgramMap';
import Header from './componenets/layout/Header';
import About from './componenets/pages/About';
import SaveChanges from './componenets/SaveChanges';
import GradeFilter from './componenets/GradeFilter';
import SideView from './componenets/SideView';

class App extends Component {
  static apiurlpartial = '';
  static localStorageKey = 'courses';
  constructor(props){
    super(props);
    this.state = { 
      courses: [[]], // 2d array, 1st dim = terms, 2nd dim = courses
      filteredCourses: [], // array of courses to highlight
      prereq: {}, // will be treated as a map/dictionary, stores all prerequisites for each course, values are arrays
      coreq: [], // will be treated as an array of sets(but implmented as a 2d array)
      selectedCourse: null, // current selected course
      selectedTerm: null // current selected term
    };
    
  }

  componentDidMount(){
    this.populateCourseData();
  }


  /* Local Storage Saving / Retrieving */
  populateCourseData(){
    const dataStringCourses = localStorage.getItem(App.localStorageKey);
    const dataStringPrereq = localStorage.getItem(App.localStorageKey+"prereq");
    const dataStringCoreq = localStorage.getItem(App.localStorageKey+"coreq");
    //alert("retrieved " + JSON.parse(dataString) + " from localStorage.");
    if (!dataStringCourses){
      return;
    }
    const dataObjectCourses = JSON.parse(dataStringCourses);
    const dataObjectPrereq = JSON.parse(dataStringPrereq);
    const dataObjectCoreq = JSON.parse(dataStringCoreq);


    this.setState({
      courses: dataObjectCourses,
      prereq: (dataObjectPrereq)?dataObjectPrereq:this.state.prereq,
      coreq: (dataObjectCoreq)?dataObjectCoreq:this.state.coreq,
    });
    

  }

  saveCourseData(){
    //alert("saving " + JSON.stringify(this.state.courses) + " into localStorage.");
    localStorage.setItem(App.localStorageKey, JSON.stringify(this.state.courses));
    localStorage.setItem(App.localStorageKey+"prereq", JSON.stringify(this.state.prereq));
    localStorage.setItem(App.localStorageKey+"coreq", JSON.stringify(this.state.coreq));
  }


  /* Basic Edits (Used in Course) */

  // Adding a new term
  handleClickAddTerm = () => {
    //console.log("Adding a term");
    let newCourses = this.state.courses.slice();
    newCourses.push([]);
    this.setState({
        courses: newCourses,
    });
    
  }

  // Removing th last term
  handleClickRemoveTerm = () => {
    if (this.state.courses.length === 0){
      return;
    }
   
    this.setState({
      courses: this.state.courses.slice(0, this.state.courses.length - 1),
    });
  }

  // Adding a new course
  handleClickAddCourse = (term, courseCode) => {
        
    let courseList = this.state.courses.slice();
    let course = CourseClass.EmptyCourse();
    course.code = courseCode;
    courseList[term].push(course);
    this.setState({
        courses: courseList,
    });
  }

  // Editing an existing course
  handleClickEditCourse = (term, editedCourse) => {
    let courseList = this.state.courses.slice();
    courseList[term] = courseList[term].map(c => {
      if (c.code === editedCourse.code){
        return editedCourse;
      }else{
        return c;
      }
    });
    this.setState({
        courses: courseList,
    });
  }

  // Deleting an existing course
  handleClickDeleteCourse = (term, courseCode) => {
    let courseList = this.state.courses.slice();
    let i = courseList[term].findIndex(course => course.code === courseCode);
    if (i >= 0){
      courseList[term].splice(i, 1);
      this.setState({
          courses: courseList,
      });
    }
  }

  // Finding/Filtering course with specific GPA
  handleOnClickFilterByCategory = (category, value) => {
    this.setState({
      selectedCourse: null, // current selected course
      selectedTerm: null // current selected term
    });
    const unfiltered = [].concat.apply([], this.state.courses);
    let filtered = [];
    //console.log(unfiltered);
    switch(category){
      case '1': // greater than
        filtered = unfiltered.filter(val => (val.grade > value));
        break;
      case '2': // less than
      filtered = unfiltered.filter(val => (val.grade < value));
          break;
      case '3': // equal
      filtered = unfiltered.filter(val => (val.grade === value));
        break;
      case '4': // greater than or equal to
        filtered = unfiltered.filter(val => (val.grade >= value));
            break;
      case '5': // less than or equal to
        filtered = unfiltered.filter(val => (val.grade <= value));
          break;
      default:
        
    }
    //console.log(filtered);

    this.setState({
      filteredCourses: filtered,
    });
    //console.log(this.state.filteredCourses);

  }

  // Clear all the course that were filtered and highlighted
  clearFilteredCourses(){
    this.setState({
      filteredCourses: [],
    });
  }

  // Finding the max number of courses out of all terms
  getMaxCourseForYears(){
      const max = Math.max(...this.state.courses.map((val, index) => val.length));
      return max;
  }



  /* Advanced Edit (Used in SideView) */

  // Selecting a course given courseCode
  handleClickSelectCourse = (courseCode) => {
    let allcourses = this.state.courses;
    let i;
    let j;
    console.log(courseCode);

    for (i = 0; i < allcourses.length; i++){
        j = allcourses[i].findIndex(val => val.code.trim() === courseCode.trim());

        if (j >= 0){

          console.log("found at " + i + " " + j);
          this.setState({
            selectedCourse: allcourses[i][j],
            selectedTerm: i,  
            filteredCourses: [],
          });
          //console.log(this.state.selectedCourse);
          break;
        }
      }
    
    
  }

  // Editing the prerequisites given a the courseCode and a list of courseCodes of the prerequisites courses
  // GUI side (component) enforces whether two courses are prerequisites
  handleClickEditPrereq = (courseCode, prereqCourses) => {
    console.log("Setting prereq of course: " + courseCode + " to " + prereqCourses);
    let prereqcopy = this.state.prereq;
    prereqcopy[courseCode] = prereqCourses;
    this.setState({
      prereq: prereqcopy
    });

    //console.log(this.state.prereq);
  }

  // Same as above except with corequisites
  handleClickEditCoreq = (courseCode, coreqCourses) => {
    
    console.log("Setting coreq of course: " + courseCode + " to " + coreqCourses);
    let coreqcopy = this.state.coreq.slice();
    let index = coreqcopy.findIndex(cList => cList.includes(courseCode));
    console.log(index);
    
    if (coreqCourses.length === 0){
      // if there are no coreq courses
      // we want to delete the entry with the courseCode
      if (index >= 0){
        coreqcopy[index].splice(coreqcopy[index].findIndex(c => c.code === courseCode), 1);
        if (coreqcopy[index].length === 0 || coreqcopy[index].length === 1){
          coreqcopy.splice(index, 1);
        }
        
        console.log(coreqcopy);
        this.setState({
          coreq: coreqcopy,
        });
      }
      return;
    }
    
    // if there supplied coreqCourses


    // if the course is not in the coreq list
    if (index < 0){
      // check if any of the coreq courses are already in the list 
      for (let i = 0; i < coreqcopy.length; i++){
        if (coreqcopy[i].findIndex(c => coreqCourses.includes(c)) >= 0){
          index = i;
          console.log("found a match at index: " + index);
          break;
        }
      }
    }
    
    if (index < 0){
      // not in the list
      coreqcopy.push([]);
      coreqcopy[coreqcopy.length - 1].push(...coreqCourses, courseCode);
    }else{
      // if within the list
      // concat the coreqlist 

      //coreqcopy[index].push(...coreqCourses, courseCode); // behaviour 1 (if a coreq b & a coreq c then b coreq c) 
      coreqcopy[index] = [...coreqCourses, courseCode]; // behaviour 2 (allows for deleting courses not in coreCourses)
      
      // remove duplicate values
      coreqcopy[index] = [...new Set(coreqcopy[index])];
    }



    console.log(coreqcopy);
    this.setState({
      // function directly below helps prevent double entries
      // if there are two sets that intersect,it will combine them
      // (if you combine a set with a single course, the set will be destroyed)
      // this function could behave weirdly with the code above that looks like:
      // coreqcopy[index] = [...coreqCourses, courseCode]
      // as that code deletes the previous set
      coreq: this.combineCoreqSets(coreqcopy), 
    });
    
    
  }

  // Goes through each of the sets in the coreq and combines them if they intersects with another
  combineCoreqSets(inputCoreq){
    if (inputCoreq === null || inputCoreq.length === 0) return [];
    let allcoreq = inputCoreq.slice();
    
    for (let i = 0; i < allcoreq.length; i++){
      let first = allcoreq[i];
      
      for (let j = allcoreq.length - 1; j > i; j--){
        let second = allcoreq[j];
        if (this.intersects(first, second)){
          allcoreq[i] = [...new Set(first.concat(second))];
          allcoreq.splice(j,1);
        }
      }
    }
    console.log("all coreq are:");
    console.log(allcoreq);
    return allcoreq;
  }

  intersects(first, second){
    if (first === null || second === null) return false;
    return first.findIndex(value => second.includes(value)) !== -1;
  }





  // Takes a list of the course codes and converts them into full course object 
  // Disregards the codes that have no associated matching course in the state
  getCoursesFromCodes(codes){
    const allcourses = [].concat.apply([], this.state.courses);
    let filtered = allcourses.filter(c => (codes.includes(c.code)));
    return filtered;
  } 


  // Highlghts the prerequisite courses given the course code
  handleClickShowPrereq = (courseCode) => {
    this.clearFilteredCourses();
    const val = this.state.prereq[courseCode];
    if (val !== undefined){
      let filtered = this.getCoursesFromCodes(val);
      this.setState({
        filteredCourses: filtered,
      });
    }
  }
  // Same as above except for corequisites
  handleClickShowCoreq = (courseCode) => {
    this.clearFilteredCourses();
    let selectedCoreqIndex = this.state.coreq
    .findIndex(cl => cl.includes(courseCode));
    if (selectedCoreqIndex >= 0){
      let list = this.state.coreq[selectedCoreqIndex];
      list = list.filter(li => (li !== courseCode));
      let filtered = this.getCoursesFromCodes(list);
      this.setState({
        filteredCourses: filtered,
      });
    }
  }

  render(){
      return(
        <Router>
          <div className="App">
            <div className="container">
              <Header />
              <Route exact path="/"
              render={props => (
                <React.Fragment>
                  <div className="inner">
                    <div className="inner-top">
                    
                      <ProgramMap 
                        handleClickAddTerm={this.handleClickAddTerm}
                        handleClickRemoveTerm={this.handleClickRemoveTerm}
                        handleClickAddCourse={this.handleClickAddCourse}
                        handleClickEditCourse={this.handleClickEditCourse}
                        handleClickSelectCourse={this.handleClickSelectCourse}
                        handleClickDeleteCourse={this.handleClickDeleteCourse}
                        maxCourseYears={this.getMaxCourseForYears()}
                        courses={this.state.courses}
                        selectedCourse={this.state.selectedCourse}
                        filteredCourses={this.state.filteredCourses}
                      />
        
                    </div>
                    <div className="inner-bottom">
                      <div className="inner-bottom-head">
                        <SaveChanges
                          onSaveClick={() => this.saveCourseData()}
                        />
                        <GradeFilter
                          onClickFilterByCategory={this.handleOnClickFilterByCategory}
                        />
                      </div>
                      <SideView 
                        handleClickEditCourse={this.handleClickEditCourse}
                        courses={this.state.courses}
                        selectedTerm={(this.state.selectedCourse)? this.state.selectedTerm : null}
                        selectedCourse={this.state.selectedCourse}
                        prereq={this.state.prereq}
                        coreq={this.state.coreq}
                        handleClickEditPrereq={this.handleClickEditPrereq}
                        handleClickEditCoreq={this.handleClickEditCoreq}
                        handleClickShowPrereq={this.handleClickShowPrereq}
                        handleClickShowCoreq={this.handleClickShowCoreq}
                      />
                    </div>
                  </div>
                </React.Fragment>
              )} />
              <Route path="/about" component={About} />
            </div>
          </div>
        </Router>
      );
  }
}

export default App;
