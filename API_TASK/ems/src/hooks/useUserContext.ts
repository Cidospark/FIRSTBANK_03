import { useContext } from "react"
import { UserContext } from "../contexts/userContext";

export const UseUserContext = () => {
    const context = useContext(UserContext);
    if(!context)
    {
        throw new Error("User context must be used inside provided")
    }
    return context;
}