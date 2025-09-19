export default class Transaction{
    constructor(
        public id: number, 
        public sender: string,
        public transctionType: string, 
        public amount: number,
        public mode: string ,
        public createdOn: string, 
        public meta?: string
    ){}
}