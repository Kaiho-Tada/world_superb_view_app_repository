import { RefSuperbView } from "types/ref/refSuperbView";

export type Characteristic = {
  id: number;
  name: string;
  superbViews: Array<RefSuperbView>;
};
