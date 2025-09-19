import Transaction from "../../Domains/Entities/transactions";
import ITransactionRepository from "../../Repositories/TransactionReposirtory/ITransactionRepository";
import ITransactionService from "./ITransactionService";

export default class TransactionService implements ITransactionService{
    /**
     *
     */
    constructor(private readonly transactionRepo: ITransactionRepository) {
        
    }

    getTransactions(): Transaction[] {
        return this.transactionRepo.transactions
    }
    addTransaction(transaction: Transaction): void {
        this.transactionRepo.add(transaction);
    }
    removeTransaction(id: number): void {
        this.transactionRepo.delete(id);
    }

}