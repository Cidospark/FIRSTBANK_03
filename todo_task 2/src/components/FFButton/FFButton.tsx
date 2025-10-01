import type { FFButtonFuncProps } from "../../models/FFButtonFuncProps";
import "./FFButton.css"

export default function FFButton({text, funcHandler, activeBtn}:Readonly<FFButtonFuncProps>){
    console.log(activeBtn)
    return <button onClick={funcHandler} className={`${activeBtn} normal-btn-style`}>
        {text}
    </button>;
}