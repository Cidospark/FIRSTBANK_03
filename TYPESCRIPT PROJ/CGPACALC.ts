enum GradeSchema{
    "A" = 5,
    "B" = 4,
    "C" = 3,
    "D" = 2,
    "E" = 1,
    "F" = 0
}

const inputs:{
    courseName: string,
    courseUnit: number,
    score: number
}[] = [
    {
        courseName : "Maths",
        courseUnit : 3,
        score : 24
    },
    {
        courseName : "English",
        courseUnit : 2,
        score : 85
    },
    {
        courseName : "Biology",
        courseUnit : 4,
        score : 56
    }
]


function calculatGrade(score: number): {grade: string, gradeUnit: number}{ 
    if(score <= 0 || score > 100){
        throw new Error("Invalid score");
    }

    if(score >= 70){
        return {grade: GradeSchema[5], gradeUnit: GradeSchema.A};
    }
    else if(score >= 60){
        return {grade: GradeSchema[4], gradeUnit: GradeSchema.B};
    }
    else if(score >= 50){
        return {grade: GradeSchema[3], gradeUnit: GradeSchema.C};
    }
    else if(score >= 45){
        return {grade: GradeSchema[2], gradeUnit: GradeSchema.D};
    }
    else if(score >= 40){
        return {grade: GradeSchema[1], gradeUnit: GradeSchema.E};
    }
    else{
        return {grade: GradeSchema[0], gradeUnit: GradeSchema.F};
    }   
}

function calculateGPA(inputs:{courseName: string, courseUnit: number, score: number}[]): number {
    let totalQualityPoint = 0;
    let totalGradeUnit = 0;

    let result:{
        courseName: string,
        courseUnit: number,
        score: number,
        grade: string,
        gradeUnit: number
    }[] = [];

    inputs.map(
        (course) => {
            let grade = calculatGrade(course.score);
            console.log(grade);
            let qualityPoint = course.courseUnit * grade.gradeUnit;
            totalQualityPoint += qualityPoint;
            totalGradeUnit += grade.gradeUnit;
            console.log({
                courseName: course.courseName,
                courseUnit: course.courseUnit,
                score: course.score,
                grade: grade.grade,
                gradeUnit: grade.gradeUnit
            })
            result.push({
                courseName: course.courseName,
                courseUnit: course.courseUnit,
                score: course.score,
                grade: grade.grade,
                gradeUnit: grade.gradeUnit
            });
        }
    );
    //console.log(totalQualityPoint);
    //console.log(totalGradeUnit);
    console.table(result);
    return totalQualityPoint / totalGradeUnit;
}
console.log("GPA: ", calculateGPA(inputs));