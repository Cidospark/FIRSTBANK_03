import { useState } from "react";
import type { User } from "../../models/user.model";
import {getUsers} from "../../services/userService"
import UserCard from "../UserCard/userCard";
import "./userList.css"

function UserList(){
    const [users, setUsers] = useState<User[]>([]);
   
    const loadUsers = async() => {
      const list = await getUsers();
      setUsers(list);
   }

   loadUsers();

    return(
        <>
            <div className="list-container">
                {
                 users.map(user => <UserCard 
                    key={user.id}
                    id={user.id}
                    firstName={user.firstName}  
                    lastName={user.lastName}
                    email={user.email}
                    address={user.address}
                    image={user.image}
                    age={user.age}
                    gender={user.gender}
                    />)
            }
            </div>
        </>
    );
}

export default UserList;