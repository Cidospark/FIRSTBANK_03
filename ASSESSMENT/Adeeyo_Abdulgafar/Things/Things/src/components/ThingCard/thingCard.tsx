import React from "react";
import type { Thing } from "../../models/thing.model";
import "./thingCard.css";

interface ThingCardProps {
  thing: Thing;
  onToggle: (id: number) => void;
}

const ThingCard: React.FC<ThingCardProps> = ({ thing, onToggle }) => {
  const getButtonLabel = () => {
    if (thing.status === "not-working") return "activate";
    if (thing.status === "doing") return "deactivate";
    return "activate"; 
  };

  return (
    <li className={`thing ${thing.status}`}>
      <input
        type="checkbox"
        checked={thing.status === "completed"}
        readOnly
        onClick={() => onToggle(thing.id)}
      />
      <span>{thing.text}</span>
      <button className="status-btn" onClick={() => onToggle(thing.id)}>
        {getButtonLabel()}
      </button>
      <button className="add-btn">+</button>
    </li>
  );
};

export default ThingCard;
