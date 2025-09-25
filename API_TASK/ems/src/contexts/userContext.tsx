/*eslint-disable react-refresh/only-export-components */

import { createContext, useState, useEffect, useMemo, type ReactNode } from "react";
import type { User , UserContextData} from "../models/user.model";
import { getUsers } from "../services/userService";



export const UserContext = createContext<UserContextData | undefined>(undefined);

export const UserContextProvider = ({children}:{children: ReactNode}) => {
    const [userList, setUserList] = useState<User[]>([]);
    // code here

    useEffect(()=>{
        const loadUsers = async() => {
            const list = await getUsers();
            setUserList(list);
        }

        loadUsers();
   }, [])


    const search = (term: string): void => {
        (async () => {
            const users: User[] = await getUsers();
            const filteredResult = users.filter(u => {
                return `${u.firstName} ${u.lastName}`.toLowerCase()
                        .includes(term.toLowerCase()) || 
                        u.age == parseInt(term) ||
                        `${u.address.address}, ${u.address.city} ${u.address.state}, 
                        ${u.address.country}`.toLowerCase()
                        .includes(term.toLowerCase())
            });

            setUserList(filteredResult);
        })(); // an IIFE is used here because this search method returns void and is not marked as an async where it is called
    };

    function resetList(): void 
    {
        (async () =>{
            setUserList(await getUsers());
        })();
    }

    const values: UserContextData = useMemo(() => ({ userList, search, resetList }), [userList]);
    return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}