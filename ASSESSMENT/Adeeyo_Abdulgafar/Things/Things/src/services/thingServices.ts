import type { Thing } from "../models/thing.model";

export const getInitialThings = (): Thing[] => {
  return [
    { id: 1, text: "Learn Javascript", status: "not-working" },
    { id: 2, text: "Learn React", status: "doing" },
    { id: 3, text: "Build a React App", status: "completed" },
  ];
};