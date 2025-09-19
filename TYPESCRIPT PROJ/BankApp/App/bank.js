"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DIConfig_1 = require("./DIConfig");
DIConfig_1.default.Initialize();
var users = [
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
];
// register user
users.map(function (user) {
    DIConfig_1.default.userService.createUser(user);
});
// Withdraw from user 1
DIConfig_1.default.accountService.withdraw("000000", 5);
console.log(DIConfig_1.default.accountService.getAccounts());
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
