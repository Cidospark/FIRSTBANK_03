import User from "../Domains/Entities/user";
import IUserService from "../Services/User/IUserService";
import DIConfig from "./DIConfig";

DIConfig.Initialize();

const users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com", 
        accounts: [{
            accountNumber: "123456",
            ownerId: 1,
            balance: 1000,
            accountType: "savings"
        },
        {
            accountNumber: "098765",
            ownerId: 1,
            balance: 1000,
            accountType: "current"
        }]    
    },
    { id: 2, name: "Francis", email: "francis@example.com", 
        accounts: [{
            accountNumber: "000000",
            ownerId: 2,
            balance: 10,
            accountType: "savings"
        },
        {
            accountNumber: "0020030",
            ownerId: 2,
            balance: 200,
            accountType: "current"
        }]    
    }
]

// register user
users.map((user) => {
    DIConfig.userService.createUser(user)
})

// Withdraw from user 1
 DIConfig.accountService.withdraw("000000", 5)

console.log(DIConfig.accountService.getAccounts())







// type tableRow = {
//     userId: number,
//     name: string,
//     accountNumberS: string
//     accountTypeS: string,
//     accountTypeC: string, 
//     accountNumberC: string
// }

// let tableResult: tableRow[] = [];

//  var usersFromDb = DIConfig.userService.getUsers();

// usersFromDb.map(u => {
//         tableResult.push({ 
//                 userId: u.id, 
//                 name: u.name, 
//                 accountTypeS: u.accounts[0].accountType, 
//                 accountNumberS:u.accounts[0].accountNumber,
//                 accountTypeC: u.accounts[1].accountType, 
//                 accountNumberC:u.accounts[1].accountNumber,
//             }) })
        
// console.log("Users created:");
// console.table(tableResult)


