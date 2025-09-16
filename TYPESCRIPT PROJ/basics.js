// basics
// enums
var DaysOfTheWeek;
(function (DaysOfTheWeek) {
    DaysOfTheWeek[DaysOfTheWeek["Sunday"] = 0] = "Sunday";
    DaysOfTheWeek[DaysOfTheWeek["Monday"] = 1] = "Monday";
    DaysOfTheWeek[DaysOfTheWeek["Tuesday"] = 2] = "Tuesday";
    DaysOfTheWeek[DaysOfTheWeek["Wednesday"] = 3] = "Wednesday";
    DaysOfTheWeek[DaysOfTheWeek["Thursday"] = 4] = "Thursday";
    DaysOfTheWeek[DaysOfTheWeek["Friday"] = 5] = "Friday";
    DaysOfTheWeek[DaysOfTheWeek["Saturday"] = 6] = "Saturday";
})(DaysOfTheWeek || (DaysOfTheWeek = {}));
console.log(DaysOfTheWeek.Monday);
//console.log(DaysOfTheWeek[1]); // Monday
// enums string version
var StatusCodes;
(function (StatusCodes) {
    StatusCodes["NotFound"] = "404";
    StatusCodes["Success"] = "200";
    StatusCodes["Accepted"] = "202";
    StatusCodes["BadRequest"] = "400";
})(StatusCodes || (StatusCodes = {}));
console.log(StatusCodes.Accepted); // 202
//console.log(StatusCodes["202"]); // Accepted
