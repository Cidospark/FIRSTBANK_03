// named functions
let sum = 0;

function add(a: number, b: number): void {
     sum = a + b;
}

// anonymous functions
let multiply = function (a: number, b: number): number {
     return a * b;
};


// parameterless functions
let greet = function (): string {
     return "Hello, World!";
};

// functions with optional parameters
function greetUpdated(name:string){
    console.log("Hello, " + name);
}

greetUpdated("Alice");
greetUpdated("World");