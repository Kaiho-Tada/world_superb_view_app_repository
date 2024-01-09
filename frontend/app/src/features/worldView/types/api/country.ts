import { RefState } from "features/worldView/types/ref/refState";
import { RefSuperbView } from "features/worldView/types/ref/refSuperbView";

export type Country = {
  id: number;
  name: string;
  code: string;
  riskLevel: number;
  state: RefState;
  bmi: number;
  superbViews: Array<RefSuperbView>;
};
