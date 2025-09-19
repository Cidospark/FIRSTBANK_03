import Transaction from "../../Domains/Entities/transactions";

export default interface ITransactionService{
    getTransactions(): Transaction[]
    addTransaction(transaction: Transaction): void
    removeTransaction(id: number): void
}