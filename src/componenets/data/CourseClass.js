  
export default class CourseClass {
    constructor(name, code, grade){
        this.name = name;
        this.code = code;
        this.grade = grade;
    }

  static EmptyCourse()
  {
      return new CourseClass('NA', 'NA', 0.0);
  }
};