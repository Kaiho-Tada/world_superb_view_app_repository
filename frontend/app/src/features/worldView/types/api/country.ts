import { RefState } from "features/worldView/types/ref/refState";

export type Country = {
  id: number;
  name: string;
  state: RefState;
};
