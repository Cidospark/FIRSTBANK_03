export type TodoItemModel = {
    text: string;
    status: string;
    readonly id: number;
};


export type TodoItemListModel = {
  readonly list: readonly TodoItemModel[];
};