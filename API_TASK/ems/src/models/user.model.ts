export interface User{
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    address: Address,
    image: string,
    age: number,
    gender: string
}

export interface Address{
    address: string,
    city: string,
    state: string,
    stateCode: string,
    postalCode: string,
    country:string
}