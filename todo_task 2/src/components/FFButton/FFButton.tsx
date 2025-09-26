import type { FFButtonFuncProps } from "../../models/FFButtonFuncProps";
import "./FFButton.css"

export default function FFButton(
    {text, funcHandler, functionHandleSearch}:Readonly<FFButtonFuncProps>
){
    return <button onClick={funcHandler} onChange={functionHandleSearch} className="normal-btn-style">
        {text}
    </button>;
}