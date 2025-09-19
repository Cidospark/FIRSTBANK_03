"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction = /** @class */ (function () {
    function Transaction(id, sender, transctionType, amount, mode, createdOn, meta) {
        this.id = id;
        this.sender = sender;
        this.transctionType = transctionType;
        this.amount = amount;
        this.mode = mode;
        this.createdOn = createdOn;
        this.meta = meta;
    }
    return Transaction;
}());
exports.default = Transaction;
