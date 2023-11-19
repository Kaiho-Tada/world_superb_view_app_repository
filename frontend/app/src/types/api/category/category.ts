import { RefSuperbView } from "types/ref/refSuperbView";

export type Category = {
  id: number;
  name: string;
  classification: string;
  superbViews: Array<RefSuperbView>;
};
