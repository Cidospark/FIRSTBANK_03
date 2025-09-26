export type TodoItemProps = {
    readonly text: string;
    status: string;
    readonly id: number;
    onUpdateChild?: (id:number, statusType:string) => void;
    onRemoveChild?: (id:number) => void;
};


export type TodoItemListProps = {
  readonly list: readonly TodoItemProps[];
};