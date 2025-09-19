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


// deposit into account for user 2 - 0020030
DIConfig.accountService.deposit("0020030", 500)


// Transfer funds from user 1 to user 2
DIConfig.accountService.transfer("123456", "000000", 500)


 console.log("\nAfter transfer.\n")

 console.log(DIConfig.accountService.getAccounts())







type tableRow = {
    id : number;
    sender : string;
    transctionType : string;
    amount : string;
    mode : string;
    createdOn : string;
    meta : string | undefined;
}

let tableResult: tableRow[] = [];

var transactionHistory = DIConfig.transactionService.getTransactions();

transactionHistory.map(u => {
    let amount: string = u.transctionType == "deposit"? 
    `+${u.amount}`: u.transctionType == "withdrawal"? `-${u.amount}` : `${u.amount}`

        tableResult.push({ 
                id: u.id, 
                sender: u.sender, 
                transctionType: u.transctionType, 
                amount: amount,
                mode: u.mode, 
                createdOn: u.createdOn,
                meta: u.meta
            }) })
        
 console.log("\nTransaction History\n");
console.table(tableResult)


