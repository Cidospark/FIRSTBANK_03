// arrays declaration in typescript
var numbers = [];
var numbers1 = [1, 2, 3, 4, 5];
var fruits = [];
fruits = [{ name: "Apple", color: "green" }];
// access array elements
var thirdNumber = numbers1[2];
console.log(thirdNumber); // 3
// adding items to an array
numbers.push(6);
console.log(numbers); // [6]
numbers1.unshift(6);
// printing array elements
numbers1.map(function (x) {
    console.log("number ".concat(x)); // string interpolation
});
// accumulate values in an array
var total = numbers1.reduce(function (acc, x) { return acc + x; }, 0);
console.log(total);
