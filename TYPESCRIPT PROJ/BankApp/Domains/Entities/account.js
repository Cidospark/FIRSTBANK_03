"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Account = /** @class */ (function () {
    function Account(accountNumber, balance, accountType, ownerId) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.accountType = accountType;
        this.ownerId = ownerId;
    }
    return Account;
}());
exports.default = Account;
