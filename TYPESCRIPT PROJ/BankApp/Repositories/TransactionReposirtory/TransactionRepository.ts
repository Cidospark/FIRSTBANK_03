import Transaction from "../../Domains/Entities/transactions";
import ITransactionRepository from "./ITransactionRepository";

export default class TransactionRepository implements ITransactionRepository{
    transactions: Transaction[] = [];
    
    add(tansaction: Transaction): void {
        this.transactions.push(tansaction)
    }
    delete(id: number): void {
        this.transactions = this.transactions.filter(t => t.id != id);
    }

}