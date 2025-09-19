"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserService_1 = require("../Services/User/UserService");
var AccountService_1 = require("../Services/Account/AccountService");
var UserRepository_1 = require("../Repositories/UserRepository/UserRepository");
var AccountRepository_1 = require("../Repositories/AccountRepository/AccountRepository");
var TransactionRepository_1 = require("../Repositories/TransactionReposirtory/TransactionRepository");
var TransactionService_1 = require("../Services/Transactions/TransactionService");
var DIConfig = /** @class */ (function () {
    function DIConfig() {
    }
    DIConfig.Initialize = function () {
        this.userRepository = new UserRepository_1.default();
        this.accountRepository = new AccountRepository_1.default();
        this.userService = new UserService_1.default(this.userRepository, this.accountRepository);
        this.accountService = new AccountService_1.default(this.accountRepository, this.transactionRepository);
        this.transactionService = new TransactionService_1.default(this.transactionRepository);
    };
    DIConfig.userRepository = new UserRepository_1.default();
    DIConfig.accountRepository = new AccountRepository_1.default();
    DIConfig.transactionRepository = new TransactionRepository_1.default();
    return DIConfig;
}());
exports.default = DIConfig;
