var GradeSchema;
(function (GradeSchema) {
    GradeSchema[GradeSchema["A"] = 5] = "A";
    GradeSchema[GradeSchema["B"] = 4] = "B";
    GradeSchema[GradeSchema["C"] = 3] = "C";
    GradeSchema[GradeSchema["D"] = 2] = "D";
    GradeSchema[GradeSchema["E"] = 1] = "E";
    GradeSchema[GradeSchema["F"] = 0] = "F";
})(GradeSchema || (GradeSchema = {}));
var inputs = [
    {
        courseName: "Maths",
        courseUnit: 3,
        score: 24
    },
    {
        courseName: "English",
        courseUnit: 2,
        score: 85
    },
    {
        courseName: "Biology",
        courseUnit: 4,
        score: 56
    }
];
function calculatGrade(score) {
    if (score <= 0 || score > 100) {
        throw new Error("Invalid score");
    }
    if (score >= 70) {
        return { grade: GradeSchema[5], gradeUnit: GradeSchema.A };
    }
    else if (score >= 60) {
        return { grade: GradeSchema[4], gradeUnit: GradeSchema.B };
    }
    else if (score >= 50) {
        return { grade: GradeSchema[3], gradeUnit: GradeSchema.C };
    }
    else if (score >= 45) {
        return { grade: GradeSchema[2], gradeUnit: GradeSchema.D };
    }
    else if (score >= 40) {
        return { grade: GradeSchema[1], gradeUnit: GradeSchema.E };
    }
    else {
        return { grade: GradeSchema[0], gradeUnit: GradeSchema.F };
    }
}
function calculateGPA(inputs) {
    var totalQualityPoint = 0;
    var totalGradeUnit = 0;
    var result = [];
    inputs.map(function (course) {
        var grade = calculatGrade(course.score);
        console.log(grade);
        var qualityPoint = course.courseUnit * grade.gradeUnit;
        totalQualityPoint += qualityPoint;
        totalGradeUnit += course.courseUnit;
        console.log({
            courseName: course.courseName,
            courseUnit: course.courseUnit,
            score: course.score,
            grade: grade.grade,
            gradeUnit: grade.gradeUnit
        });
        result.push({
            courseName: course.courseName,
            courseUnit: course.courseUnit,
            score: course.score,
            grade: grade.grade,
            gradeUnit: grade.gradeUnit
        });
    });
    //console.log(totalQualityPoint);
    //console.log(totalGradeUnit);
    console.table(result);
    return totalQualityPoint / totalGradeUnit;
}
console.log("GPA: ", calculateGPA(inputs));
