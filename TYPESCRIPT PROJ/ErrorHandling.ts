//import { Result, Ok, Err } from 'ts-results';

// handling Error

// const numerator = 10;
// let denomenator = 0;

// try{
//     const dividend = numerator / denomenator;

//     console.log(`answer = ${dividend}`)
// }
// catch(err: unknown){
//    if(err instanceof Error)
//      console.error(err.message)
// }

// finally{
//     denomenator += 1;
//     console.log(`denominator changed to ${denomenator}`);
// }


// Throwing error

type User =  {name:string}
const user : User = {name:""};

function createUser(user: User): void
{
    if(user.name == "")
        throw new Error("User object is invalid");

    console.log("user name is = " + user.name);
}

try{
    // call function here
    createUser(user);
}catch(err: unknown)
{
    if(err instanceof Error)
        console.error(err.message)
    else if(typeof err == "string")
        console.error(err)
}



// handling error using ts-results lib

