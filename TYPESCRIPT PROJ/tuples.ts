const  userInfo: [string, number, boolean] = ["Francis", 25, true];

// accessing tuple elements
const userName = userInfo[0];
const userAge = userInfo[1];
const isActive = userInfo[2];

console.log(`Name: ${userName}, Age: ${userAge}, Active: ${isActive}`);

// modifying tuple elements
userInfo[1] = 26; // updating age
console.log(`Updated Age: ${userInfo[1]}`);

// tuple with optional elements
let product: [string, number, string?];
product = ["Laptop", 1500];
console.log(`Product: ${product[0]}, Price: ${product[1]}`);

// readonly tuple
let coordinates: readonly [number, number] = [10, 20];
// coordinates[0] = 15; // Error: Cannot assign to '0' because it is a read-only property
console.log(`Coordinates: (${coordinates[0]}, ${coordinates[1]})`);