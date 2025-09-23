import { useEffect, useState } from "react";
import UserCard from "../../components/UserCard/userCard";
import { getSingleUser } from "../../services/userService";
import type { User } from "../../models/user.model";
import { useParams } from "react-router-dom";
import "./UserProfile.css"

function UserProfile(){
    // setup a state to hold the single user data coming from the api
    const [user, setSingleUser] = useState<User>({
                                                    id:0,
                                                    firstName: "",
                                                    lastName: "",
                                                    email: "",
                                                    address: {
                                                        address: "",
                                                        city: "",
                                                        state: "",
                                                        stateCode: "",
                                                        postalCode: "",
                                                        country:""
                                                    },
                                                    image: "",
                                                    age: 0,
                                                    gender: ""
                                                });

    // trap the user id param from the url
    const {id} = useParams();

    useEffect(() => {
        // call the api to get single user
        const handleGetSingleUser = async () => {
            const singleUser = await getSingleUser(id);
                setSingleUser(singleUser);
        }

        // call the handler to trigger api call
        handleGetSingleUser();
    }, [])

    // render the user card component with the user data
    return <><div className="my-contaier profile-box">
            <UserCard 
                key={user.id}
                id={user.id}
                firstName={user.firstName}  
                lastName={user.lastName}
                email={user.email}
                address={user.address}
                image={user.image}
                age={user.age}
                gender={user.gender}
                />
        </div></>
}

export default UserProfile;