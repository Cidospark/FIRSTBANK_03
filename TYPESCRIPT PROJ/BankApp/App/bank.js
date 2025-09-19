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
// deposit into account for user 2 - 0020030
DIConfig_1.default.accountService.deposit("0020030", 500);
// Transfer funds from user 1 to user 2
DIConfig_1.default.accountService.transfer("123456", "000000", 500);
console.log("\nAfter transfer.\n");
console.log(DIConfig_1.default.accountService.getAccounts());
var tableResult = [];
var transactionHistory = DIConfig_1.default.transactionService.getTransactions();
transactionHistory.map(function (u) {
    var amount = u.transctionType == "deposit" ?
        "+".concat(u.amount) : u.transctionType == "withdrawal" ? "-".concat(u.amount) : "".concat(u.amount);
    tableResult.push({
        id: u.id,
        sender: u.sender,
        transctionType: u.transctionType,
        amount: amount,
        mode: u.mode,
        createdOn: u.createdOn,
        meta: u.meta
    });
});
console.log("\nTransaction History\n");
console.table(tableResult);
