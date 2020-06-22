  
export default class CourseClass {
    constructor(name, code, grade, credits){
        this.name = name;
        this.code = code;
        this.grade = grade;
        this.credits = credits;
    }

  static EmptyCourse()
  {
      return new CourseClass('NA', 'NA', 0.0, 1.0);
  }
};