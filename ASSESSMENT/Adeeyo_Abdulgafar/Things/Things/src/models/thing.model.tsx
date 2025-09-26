export type ThingStatus = "not-working" | "doing" | "completed";

export interface Thing {
  id: number;
  text: string;
  status: ThingStatus;
}