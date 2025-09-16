// named functions
var sum = 0;
function add(a, b) {
    sum = a + b;
}
// anonymous functions
var multiply = function (a, b) {
    return a * b;
};
// parameterless functions
var greet = function () {
    return "Hello, World!";
};
// functions with optional parameters
function greetUpdated(name) {
    console.log("Hello, " + name);
}
greetUpdated("Alice");
greetUpdated("World");
