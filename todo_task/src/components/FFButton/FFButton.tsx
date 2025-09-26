import type { FFButtonFuncProps } from "../../models/FFButtonFuncProps";
import "./FFButton.css"

export default function FFButton({text, funcHandler}:Readonly<FFButtonFuncProps>){
    return <button onClick={funcHandler} className="normal-btn-style">
        {text}
    </button>;
}