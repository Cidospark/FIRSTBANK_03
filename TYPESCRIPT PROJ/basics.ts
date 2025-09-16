 // basics


 // enums
 enum DaysOfTheWeek {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
 }
 console.log(DaysOfTheWeek.Monday); 
 //console.log(DaysOfTheWeek[1]); // Monday

 // enums string version
 enum StatusCodes {
    NotFound = "404",
    Success = "200",
    Accepted = "202",
    BadRequest = "400"
 }
 console.log(StatusCodes.Accepted); // 202
 //console.log(StatusCodes["202"]); // Accepted