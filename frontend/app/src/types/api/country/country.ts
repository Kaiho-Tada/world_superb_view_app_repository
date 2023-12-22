import { RefState } from "types/ref/refState";
import { RefSuperbView } from "types/ref/refSuperbView";

export type Country = {
  id: number;
  name: string;
  code: string;
  riskLevel: number;
  state: RefState;
  bmi: number;
  superbViews: Array<RefSuperbView>;
};
