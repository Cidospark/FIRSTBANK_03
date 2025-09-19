// handling Error
var user = { name: "" };
function createUser(user) {
    if (user.name == "")
        throw new Error("User object is invalid");
    console.log("user name is = " + user.name);
}
try {
    // call function here
    createUser(user);
}
catch (err) {
    if (err instanceof Error)
        console.error(err.message);
    else if (typeof err == "string")
        console.error(err);
}
