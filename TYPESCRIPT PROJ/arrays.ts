
// arrays declaration in typescript
const numbers: number[] = [];
const numbers1 = [1,2,3,4,5];

let fruits: {
    name: string,
    color: string
}[] = [];

fruits = [{name:"Apple", color:"green"}];

// access array elements
const thirdNumber = numbers1[2];
console.log(thirdNumber); // 3


// adding items to an array
numbers.push(6);
console.log(numbers); // [6]

numbers1.unshift(6);


// printing array elements
numbers1.map((x) => {
    console.log(`number ${x}`); // string interpolation
});


// accumulate values in an array
const total = numbers1.reduce((acc, x) => acc + x, 0);

console.log(total)
