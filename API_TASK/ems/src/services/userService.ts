import type { User } from "../models/user.model";
import { base_url } from "./apiBase";
const endpoint = "/users";
const urlPath = `${base_url}${endpoint}`;



export const getUsers = async () => {
    try{
        const res = await fetch(`${urlPath}`);
        const json = await res.json();
        return json.users;
    }catch(e: unknown){
        if(e instanceof Error){ console.log(e.message)}
        console.log(e)
    }
}

export const getSingleUser = async (id:string | undefined) => {
    try{
        const res = await fetch(`${urlPath}/${id}`);
        const json = await res.json();
        return json;
    }catch(e: unknown){
        if(e instanceof Error){ console.log(e.message)}
        console.log(e)
    }
}

export const search = async (term: string) => {
    const users:User[] = await getUsers();
    const filteredResult = users.filter(u => {
        return `${u.firstName} ${u.lastName}`.toLowerCase()
                .includes(term.toLowerCase()) || 
                u.age == parseInt(term) ||
                `${u.address.address}, ${u.address.city} ${u.address.state}, ${u.address.country}`.toLowerCase()
                .includes(term.toLowerCase())
    })

    return filteredResult
}