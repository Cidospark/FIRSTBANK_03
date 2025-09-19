"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransactionRepository = /** @class */ (function () {
    function TransactionRepository() {
        this.transactions = [];
    }
    TransactionRepository.prototype.add = function (tansaction) {
        this.transactions.push(tansaction);
    };
    TransactionRepository.prototype.delete = function (id) {
        this.transactions = this.transactions.filter(function (t) { return t.id != id; });
    };
    return TransactionRepository;
}());
exports.default = TransactionRepository;
