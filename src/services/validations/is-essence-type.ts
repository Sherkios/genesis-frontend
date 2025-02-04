import { TEssenceType } from "store/types";

export default function isEssenceType(value: any): value is TEssenceType {
  return [1, 2, 3].includes(value);
}
