import * as courseTypes from './courseTypes';

import CourseClass from '../../componenets/model/CourseClass';

const initialState = {
    courses: [[]], // 2d array, 1st dim = terms, 2nd dim = courses
    filteredCourses: [], // array of courses to highlight
    prereq: {}, // will be treated as a map/dictionary, stores all prerequisites for each course, values are arrays
    coreq: [], // will be treated as an array of sets(but implmented as a 2d array)
    selectedCourse: null, // current selected course
    selectedTerm: null
}


const concatAtIndex = (list, index, item) => {
    const listAlt = list.slice();
    listAlt.slice(index, 0, item);
    return listAlt;
} 

const removeAtIndex = (list, index) => {
    const listAlt = list.slice();
    listAlt.splice(index, 1);
    return listAlt;
} 

  // Goes through each of the sets in the coreq and combines them if they intersects with another
 const combineCoreqSets = (inputCoreq) => {
    if (inputCoreq === null || inputCoreq.length === 0) return [];
    let allcoreq = inputCoreq.slice();
    
    for (let i = 0; i < allcoreq.length; i++){
      let first = allcoreq[i];
      
      for (let j = allcoreq.length - 1; j > i; j--){
        let second = allcoreq[j];
        if (intersects(first, second)){
          allcoreq[i] = [...new Set(first.concat(second))];
          allcoreq.splice(j,1);
        }
      }
    }
    return allcoreq;
  }

const intersects = (first, second) => {
    if (first === null || second === null) return false;
    return first.findIndex(value => second.includes(value)) !== -1;
  }

const getCoursesFromCodes = (codes, allcourses) =>{
    allcourses = [].concat.apply([], allcourses);
    let filtered = allcourses.filter(c => (codes.includes(c.code)));
    return filtered;
} 



const courseReducer = (state = initialState, action) => {
    let term, termList, courseCode, i;
    switch(action.type){
        case courseTypes.ADD_TERM: 
            return {
                ...state,
                courses: 
                action.payload === -1
                ? state.courses.concat([[]])
                : concatAtIndex(state.courses, action.payload, []) // Not Tested
            };
        case courseTypes.REMOVE_TERM: 
            return {
                ...state,
                courses: action.payload === -1
                ? state.courses.slice(0, state.courses.length - 1)
                : removeAtIndex(state.courses, action.payload)  // Not Tested
            };

        case courseTypes.ADD_COURSE:
            courseCode = action.payload.courseCode;
            term = action.payload.term;
            const course = CourseClass.EmptyCourse();
            course.code = courseCode;
            termList = state.courses.slice();
            termList[term].push(course);
            return {
                ...state,
                courses: termList
            }
        case courseTypes.EDIT_COURSE:
            let { editedCourse } = action.payload;
            term = action.payload.term;
            termList = state.courses.slice();
            termList[term] = termList[term].map(course => {
                if (course.code === editedCourse.code){
                    return editedCourse;
                }else{
                    return course;
                } 
            });

            return {
                ...state,
                courses: termList
            }

        case courseTypes.DELETE_COURSE:
            termList = state.courses.slice();
            term = action.payload.term;
            i = termList[term].findIndex(course => course.code === action.payload.courseCode);
            termList[term].splice(i, 1);
            return {
                ...state,
                courses: termList
            }
        case courseTypes.FILTER:
            let { category, value } = action.payload;
            const unfiltered = [].concat.apply([], state.courses);
            let filtered;
            if(category === '1'){
                filtered = unfiltered.filter(val => (val.grade > value));
            }else if(category === '2'){
                filtered = unfiltered.filter(val => (val.grade < value));
            }else if(category === '3'){
                filtered = unfiltered.filter(val => (val.grade === value));
            }else if(category === '4'){
                filtered = unfiltered.filter(val => (val.grade >= value));
            }else if(category === '5'){
                filtered = unfiltered.filter(val => (val.grade <= value));
            }else{
                filtered = unfiltered;
            }

            return {
                ...state,
                filteredCourses: filtered
            }
        case courseTypes.CLEAR_FILTER:
            return {
                ...state,
                filteredCourses: []
            }
        case courseTypes.TOGGLE_SELECT:
            const { selectedCourse } = state;
            if(selectedCourse && selectedCourse.code === action.payload){
                return {
                    ...state,
                    selectedCourse: null,
                    selectedTerm: null,  
                    filteredCourses: [],
                }
            }
            let x, y;
            for (x = 0; x < state.courses.length; x++){
                y = state.courses[x].findIndex(val => val.code.trim() === action.payload.trim());
        
                if (y >= 0){
        
                  
                  return{
                      ...state,
                    selectedCourse: state.courses[x][y],
                    selectedTerm: x,  
                    filteredCourses: []
                  };
                  
                }
              }
        

              return state;
        case courseTypes.CLEAR_SELECT:
            return {
                ...state,
                selectedCourse: null,
                selectedTerm: null
            }

        case courseTypes.EDIT_PREREQ:
            let prereqcopy = state.prereq;
            prereqcopy[action.payload.courseCode] = action.payload.prereqCourses;
            return {
                ...state,
                prereq: prereqcopy
            }
        case courseTypes.EDIT_COREQ:
            courseCode = action.payload.courseCode;
            let coreqCourses = action.payload.coreqCourses;
            let coreqcopy = state.coreq.slice();
            // find the index of the 'set' that contains the courseCode, -1 if the code is not in any set
            let index = coreqcopy.findIndex(courseSet => courseSet.includes(courseCode));

            // if there are no supplied coreqs
            // the user wants there to be no coreqCourses for this course
            if (coreqCourses.length === 0){
            
                // delete the courseCode if index >= 0
                if (index >= 0){
                    coreqcopy[index].splice(coreqcopy[index].findIndex(c => c.code === courseCode), 1);
                    if (coreqcopy[index].length === 0 || coreqcopy[index].length === 1){
                        coreqcopy.splice(index, 1);
                    }
                    return {
                        ...state,
                        coreq: coreqcopy
                    }
                }
                return state;
            }

            // if there are supplied coreqCourses


            // if the course is not in the coreq list
            if (index < 0){
                // check if any of the coreq courses are already in the list. 
                // want to maintain only one set with each course
                for (i = 0; i < coreqcopy.length; i++){
                    if (coreqcopy[i].findIndex(c => coreqCourses.includes(c)) >= 0){
                        index = i;
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
        
                // line below allows for deleting courses not found in coreqCourses 
                // in the case where the user is removing a course from the set
                coreqcopy[index] = [...coreqCourses, courseCode];
                
                // remove duplicate values
                coreqcopy[index] = [...new Set(coreqcopy[index])];
            }

            return {
                ...state,
                // function directly below helps prevent double entries
                // If there are two sets that intersect,it will combine them.
                // And if the user is combining a set with a single course, the set will be destroyed.
                // (i.e. selecting a course that is not in a set and combining it with another that 
                // is in a set, the set of the later course will be destroyed, 
                // if both courses are each within different sets both sets will be combined)
                // this function could behave weirdly with the code above that looks like:
                // coreqcopy[index] = [...coreqCourses, courseCode]
                // as that code deletes the previous set
                coreq: combineCoreqSets(coreqcopy), 
            };

        case courseTypes.SHOW_PREREQ:
            const val = state.prereq[action.payload];
            if (val !== undefined){
                let filtered = getCoursesFromCodes(val, state.courses);
                return {
                    ...state,
                    filteredCourses: filtered,
                };
            }
            return {
                ...state,
                filteredCourses: []
            };

        case courseTypes.SHOW_COREQ:
            
            let selectedCoreqIndex = state.coreq
            .findIndex(cl => cl.includes(action.payload));
            
            if (selectedCoreqIndex >= 0){
                let list = state.coreq[selectedCoreqIndex];
                list = list.filter(li => (li !== courseCode));
                let filtered = getCoursesFromCodes(list, state.courses);
                return{
                    ...state,
                    filteredCourses: filtered,
                };
            }
            return {
                ...state,
                filteredCourses: []
            };

        case courseTypes.LOAD_COURSES:
            return {
                ...state,
                courses: action.payload.courses,
                prereq: action.payload.prereq,
                coreq: action.payload.coreq
            }

        case courseTypes.DRAG_ENTER:
            const newCourses = JSON.parse(JSON.stringify(state.courses));
            const {params, currentItem} = action.payload;
            newCourses[params.termI].splice(params.courseI, 0, newCourses[currentItem.termI].splice(currentItem.courseI, 1)[0]);
            return {
                ...state,
                courses: newCourses,
                selectedCourse: null,
                selectedTerm: null,
                filteredCourses: []
            }

        default: return state
    }
}

export default courseReducer;



