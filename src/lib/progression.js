export const buildTreeObject = (prereq, courseCode) => {
    let treeObject = {};
        buildTreeNode(prereq, courseCode, treeObject);
    return treeObject;
}

export const buildTreeNode = (prereq, courseCode, treeObject) => {
    treeObject["courseCode"] = courseCode;
    if (prereq.hasOwnProperty(courseCode)){
        treeObject["prerequisites"] = [];
        prereq[courseCode].forEach(course => {
            treeObject["prerequisites"].push({});
            buildTreeNode(prereq, course, treeObject["prerequisites"][treeObject["prerequisites"].length - 1]);
        });
        
    }
}

export const recommendCourse = (courses, prereq, term) => {
    
}