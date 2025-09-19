
interface AnimalMotionFeatures{
    move(): string;
}

abstract class Animal{
    name: string;
    age: number;
    isAlive: boolean;

    constructor (name, age){
        this.name = name;
        this.age = age;
        this.isAlive = true;
    }

}

class Dog extends Animal{

}

class Fish extends Animal implements AnimalMotionFeatures{
    move(): string {
        return "swimming";
    }
}

const dog = new Dog("Bingo", 2);
const fish = new Fish("Nemo", 1);

console.log(`${dog.name} is ${dog.age} years old and is ${dog.isAlive? 'alive': 'dead'}`);
console.log(`${fish.name} is ${fish.age} years old and is ${fish.isAlive? 'alive': 'dead'} and is ${fish.move()}`);
