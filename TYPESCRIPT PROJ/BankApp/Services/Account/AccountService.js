"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var account_1 = require("../../Domains/Entities/account");
var transactions_1 = require("../../Domains/Entities/transactions");
var transactionTypes_1 = require("../../Commons/transactionTypes");
var AccountService = /** @class */ (function () {
    function AccountService(accRepo, transactionRepo) {
        this.accRepo = accRepo;
        this.transactionRepo = transactionRepo;
    }
    AccountService.prototype.getAccountDetails = function (accountNumber) {
        return this.accRepo.getAccountByNumber(accountNumber);
    };
    AccountService.prototype.createNewAccount = function (accountNumber, initialBalance, ownerId, accountType) {
        this.accRepo.createAccount(new account_1.default(accountNumber, initialBalance, accountType, ownerId));
    };
    AccountService.prototype.deposit = function (accountNumber, amount) {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive.");
        }
        var account = this.accRepo.getAccountByNumber(accountNumber);
        if (!account) {
            throw new Error("Account not found.");
        }
        account.balance += amount;
        this.accRepo.updateAccount(account);
        this.transactionRepo.add(new transactions_1.default(Math.random() + 1, accountNumber, transactionTypes_1.TransactionTypes.deposit, amount, "card", Date.now().toString()));
    };
    AccountService.prototype.withdraw = function (accountNumber, amount) {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive.");
        }
        var account = this.accRepo.getAccountByNumber(accountNumber);
        if (!account) {
            throw new Error("Account not found.");
        }
        if (account.balance < amount) {
            throw new Error("Insufficient funds.");
        }
        account.balance -= amount;
        this.accRepo.updateAccount(account);
        this.transactionRepo.add(new transactions_1.default(Math.random() + 1, accountNumber, transactionTypes_1.TransactionTypes.withdrawal, amount, "card", Date.now().toString()));
    };
    AccountService.prototype.transfer = function (fromAccountNumber, toAccountNumber, amount) {
        var fromAccount = this.accRepo.getAccountByNumber(fromAccountNumber);
        if (!fromAccount) {
            throw new Error("Sender with ".concat(fromAccountNumber, " not found."));
        }
        var toAccount = this.accRepo.getAccountByNumber(toAccountNumber);
        if (!toAccount) {
            throw new Error("Receiver with ".concat(toAccountNumber, " not found."));
        }
        // perform withdrawal and deposit
        this.withdraw(fromAccountNumber, amount);
        this.deposit(toAccountNumber, amount);
        // add transaction to db
        this.transactionRepo.add(new transactions_1.default(Math.random() + 1, fromAccountNumber, transactionTypes_1.TransactionTypes.transfer, amount, "card", Date.now().toString(), toAccountNumber));
    };
    AccountService.prototype.getAccounts = function () {
        return this.accRepo.accounts;
    };
    return AccountService;
}());
exports.default = AccountService;
