export default interface GradeInput
{
    courseName: string,
    courseUnit: number,
    score: number
}

export interface GradeResult{
    courseName: string,
    courseUnit: number,
    score: number,
    grade: string,
    gradeUnit: number,
    qualityPoint: number
}