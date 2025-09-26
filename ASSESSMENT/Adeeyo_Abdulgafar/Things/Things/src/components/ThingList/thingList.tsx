import React from "react";
import ThingCard from "../ThingCard/thingCard";
import type { Thing } from "../../models/thing.model";
import "./thingList.css";

interface ThingListProps {
  things: Thing[];
  onToggle: (id: number) => void;
}

const ThingList: React.FC<ThingListProps> = ({ things, onToggle }) => {
  return (
    <ul className="thing-list">
      {things.map((thing) => (
        <ThingCard key={thing.id} thing={thing} onToggle={onToggle} />
      ))}
    </ul>
  );
};

export default ThingList;
