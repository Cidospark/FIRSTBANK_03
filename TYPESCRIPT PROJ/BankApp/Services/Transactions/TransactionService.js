"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TransactionService = /** @class */ (function () {
    /**
     *
     */
    function TransactionService(transactionRepo) {
        this.transactionRepo = transactionRepo;
    }
    TransactionService.prototype.getTransactions = function () {
        return this.transactionRepo.transactions;
    };
    TransactionService.prototype.addTransaction = function (transaction) {
        this.transactionRepo.add(transaction);
    };
    TransactionService.prototype.removeTransaction = function (id) {
        this.transactionRepo.delete(id);
    };
    return TransactionService;
}());
exports.default = TransactionService;
