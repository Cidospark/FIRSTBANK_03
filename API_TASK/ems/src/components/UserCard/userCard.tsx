import type { User } from "../../models/user.model";
import "./userCard.css"

function UserCard(props:User){
    return(
        <>
        <div className="card-box">
            <div className="img-box">
                <img src={props.image} alt="" />
            </div>
            <h2>{`${props.firstName} ${props.lastName}`}</h2>
            <p>
                <span>{props.age}</span>&nbsp;&nbsp;<span>{props.gender}</span>
            </p>
            <div className="desc">
                <p>{props.email}</p>
                <p>{`${props.address.address}, ${props.address.city} ${props.address.state}, ${props.address.country}`}</p>
            </div>
        </div>
        </>
    );
}

export default UserCard;