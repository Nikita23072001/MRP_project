import { items } from "./mrp-data.js";
import { calculateMRPFirst } from "./calculate-mrp-first.js";
import { calculateMRPSecond } from "./calculate-mrp-second.js";

export function calculateMRPTables() {
  items.forEach((item) => {
    if (item.level === 1) calculateMRPFirst(item);
    if (item.level === 2) calculateMRPSecond(item);
  });
}
