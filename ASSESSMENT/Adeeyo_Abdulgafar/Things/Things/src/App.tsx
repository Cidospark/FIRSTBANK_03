import React, { useState } from "react";
import ThingList from "./components/ThingList/thingList";
import type { Thing, ThingStatus } from "./models/thing.model";
import { getInitialThings } from "./services/thingServices";
import "./App.css";

const App: React.FC = () => {
  const [things, setThings] = useState<Thing[]>(getInitialThings());
  const [newThing, setNewThing] = useState<string>("");
  const [filter, setFilter] = useState<ThingStatus | "all">("all");

  const addThing = () => {
    if (newThing.trim() !== "") {
      const newItem: Thing = {
        id: Date.now(),
        text: newThing,
        status: "not-working",
      };
      setThings([...things, newItem]);
      setNewThing("");
    }
  };

  const toggleStatus = (id: number) => {
    setThings(
      things.map((thing) => {
        if (thing.id === id) {
          let nextStatus: ThingStatus;
          if (thing.status === "not-working") {
            nextStatus = "doing";
          } else if (thing.status === "doing") {
            nextStatus = "completed";
          } else {
            nextStatus = "not-working";
          }
          return { ...thing, status: nextStatus };
        }
        return thing;
      })
    );
  };

  
  const filteredThings = things.filter((thing) => {
    if (filter === "all") return true;
    return thing.status === filter;
  });

  const remaining = things.filter((t) => t.status !== "completed").length;

  return (
    <div className="app">
      <h1>THINGS TO DO</h1>

      <div className="input-section">
        <input
          type="text"
          value={newThing}
          onChange={(e) => setNewThing(e.target.value)}
          placeholder="Add New"
        />
        <button onClick={addThing}>+</button>
      </div>

      <ThingList things={filteredThings} onToggle={toggleStatus} />

      <div className="footer">
        <span>{remaining} items left</span>
        <div className="filters">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("doing")}>Active</button>
          <button onClick={() => setFilter("completed")}>Completed</button>
        </div>
      </div>
    </div>
  );
};

export default App;
