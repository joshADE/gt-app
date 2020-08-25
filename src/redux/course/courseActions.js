import * as courseTypes from './courseTypes';

export const addCourse = (term, courseCode) => {
    return {
        type: courseTypes.ADD_COURSE,
        payload: { term, courseCode }
    }
}

export const editCourse = (term, editedCourse) => {
    return {
        type: courseTypes.EDIT_COURSE,
        payload: { term, editedCourse }
    }
}

export const deleteCourse = (term, courseCode) => {
    return {
        type: courseTypes.DELETE_COURSE,
        payload: { term, courseCode }
    }
}

export const addTerm = (index = -1) => {
    return {
        type: courseTypes.ADD_TERM,
        payload: index
    }
}

export const removeTerm = (index = -1) => {
    return {
        type: courseTypes.REMOVE_TERM,
        payload: index
    }
}

export const filterByCategory = (category, value) => {
    return {
        type: courseTypes.FILTER,
        payload: {category, value}
    }
}

export const clearFilter = () => {
    return {
        type: courseTypes.CLEAR_FILTER
    }
}


export const toggleSelectCourse = (courseCode) => {
    return {
        type: courseTypes.TOGGLE_SELECT,
        payload: courseCode
    }
}

export const clearSelected = () => {
    return {
        type: courseTypes.CLEAR_SELECT
    }
}

export const editPrereq = (courseCode, prereqCourses) => {
    return {
        type: courseTypes.EDIT_PREREQ,
        payload: { courseCode, prereqCourses }
    }
}

export const editCoreq = (courseCode, coreqCourses) => {
    return {
        type: courseTypes.EDIT_COREQ,
        payload: { courseCode, coreqCourses }
    }
}

export const showPrereq = (courseCode) => {
    
    return {
        type: courseTypes.SHOW_PREREQ,
        payload: courseCode
    }
}

export const showCoreq = (courseCode) => {
    
    return {
        type: courseTypes.SHOW_COREQ,
        payload: courseCode
    }
}

export const loadCourses = (courses, prereq, coreq) => {
    return {
        type: courseTypes.LOAD_COURSES,
        payload: { courses, prereq, coreq }
    }
}

export const dragEnter = (params, currentItem) => {
    return {
        type: courseTypes.DRAG_ENTER,
        payload: {params, currentItem}
    }
}




