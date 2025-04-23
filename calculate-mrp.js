import { items } from "./data.js";
import { calculateMRPFirst, calculateMRPSecond } from "./calculate-mrp-func.js";

export function calculateMRPTables() {
  items.forEach((item) => {
    if (item.level === 1) calculateMRPFirst(item);
    if (item.level === 2) calculateMRPSecond(item);
  });
}
