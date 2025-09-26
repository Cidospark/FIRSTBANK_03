export type TodoItemProps = {
    readonly text: string;
    status: string;
    readonly id: number;
};


export type TodoItemListProps = {
  readonly list: readonly TodoItemProps[];
};