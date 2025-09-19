"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var AccountRepository = /** @class */ (function () {
    function AccountRepository() {
        this.accounts = [];
    }
    AccountRepository.prototype.createAccounts = function (accounts) {
        this.accounts = accounts;
        // console.log("After add to account repo ")
        // console.log(this.accounts)
    };
    AccountRepository.prototype.updateAccount = function (account) {
        var dbAccount = this.getAccountByNumber(account.accountNumber);
        if (dbAccount) {
            dbAccount.balance = account.balance;
        }
        // update account in Account[]
        this.accounts.map(function (acc) { return acc.accountNumber === account.accountNumber ? __assign(__assign({}, acc), account) : acc; });
    };
    AccountRepository.prototype.getAccountByNumber = function (accountNumber) {
        //let acc: Account = { accountNumber : "", balance : 0, accountType : "", ownerId: 0 };
        var result = this.accounts.map(function (a) {
            if (a.accountNumber === accountNumber) {
                return a;
            }
        });
        return result[0];
    };
    AccountRepository.prototype.createAccount = function (account) {
        this.accounts.push(account);
    };
    return AccountRepository;
}());
exports.default = AccountRepository;
