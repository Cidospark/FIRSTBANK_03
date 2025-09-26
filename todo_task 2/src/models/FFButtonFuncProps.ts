export interface FFButtonFuncProps{
    text: string | HTMLElement, 
    funcHandler?: ()=>void,
    functionHandleSearch: (e: React.ChangeEvent<HTMLInputElement>)=>void
}