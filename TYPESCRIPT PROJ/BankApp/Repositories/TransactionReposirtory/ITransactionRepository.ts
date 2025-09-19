import Transaction from "../../Domains/Entities/transactions"

export default interface ITransactionRepository{
    transactions: Transaction[];
    add(tansaction: Transaction): void;
    delete(id:number):void;
}