import { generateMPS } from "./generate-mps-item.js";
import { generateMPSTable } from "./generate-mps-table.js";
import { generateMRPItems } from "./generate-mrp-items.js";
import { generateMRPTables } from "./generate-mrp-tables.js";
import { calculateMPSTable } from "./calculate-mps.js";
import { calculateMRPTables } from "./calculate-mrp.js";

document.addEventListener("DOMContentLoaded", () => {
  generateMPS();

  generateMRPItems();

  function generateAllTables() {
    [generateMPSTable, generateMRPTables].forEach((fn) => fn());
  }

  generateAllTables();

  const weeksInput = document.getElementById("weeksNumber");
  weeksInput.addEventListener("input", generateAllTables);

  function calculateAllTables() {
    [calculateMPSTable, calculateMRPTables].forEach((fn) => fn());
  }

  document
    .getElementById("calculate-btn")
    .addEventListener("click", calculateAllTables);

  document.querySelectorAll(".calculate-all-btn").forEach((btn) => {
    btn.addEventListener("click", calculateAllTables);
  });
});
