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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var AccountRepository = /** @class */ (function () {
    function AccountRepository() {
        this.accounts = [];
    }
    AccountRepository.prototype.createAccounts = function (accounts) {
        this.accounts = __spreadArray(__spreadArray([], this.accounts, true), accounts, true);
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
        var result = this.accounts.filter(function (acc) { return acc.accountNumber === accountNumber; })[0];
        return result;
    };
    AccountRepository.prototype.createAccount = function (account) {
        this.accounts.push(account);
    };
    return AccountRepository;
}());
exports.default = AccountRepository;
