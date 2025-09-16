import { portfolios } from "../../api/dummyData/portfolios";
import PortfolioCard from "../PortfolioCard/PortfolioCard";
import './PortfolioList.css';

export default function PortfolioList(){

    return (
       <div className="portfolio-list">
         {
            portfolios.map((portfolio, index)=> (
                <PortfolioCard key={index} 
                name={portfolio.name} 
                photo={portfolio.photo} 
                profession={portfolio.profession} 
                location={portfolio.location}/>
            ))
         }
       </div>
    )
}   