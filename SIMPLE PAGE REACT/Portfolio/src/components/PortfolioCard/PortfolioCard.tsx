import './Portfolio.css';
export default function PortfolioCard({name, photo, profession, location}){
    return(
        <>
        <div className="profile-card">
            <img id="img" src={photo} />

            <h2>{name}</h2>
            <p>{profession}</p>
            <p>{location}</p>
        </div>
        </>
    );
}
