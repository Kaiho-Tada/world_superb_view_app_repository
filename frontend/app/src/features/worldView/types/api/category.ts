import { RefSuperbView } from "features/worldView/types/ref/refSuperbView";

export type Category = {
  id: number;
  name: string;
  classification: string;
  superbViews: Array<RefSuperbView>;
};
