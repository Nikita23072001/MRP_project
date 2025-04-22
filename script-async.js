import { generateMPS } from "./generate-mps-item.js";
import { generateMPSTable } from "./generate-mps-table.js";
import { generateMRPItems } from "./generate-mrp-items.js";
import { generateMRPTables } from "./generate-mrp-tables.js";
import { calculateMPSTable } from "./calculate-mps.js";
import { calculateMRPTables } from "./calculate-mrp.js";

document.addEventListener("DOMContentLoaded", () => {
  // Zakładając, że generateMPS() i generateMRPItems() są asynchroniczne i zwracają Promisy
  generateMPS()
    .then(() => {
      // Po zakończeniu generateMPS(), wywołujemy generateMRPItems()
      return generateMRPItems();
    })
    .then(() => {
      // Po zakończeniu generateMRPItems(), wywołujemy generateAllTables()
      generateAllTables();
    })
    .catch((error) => {
      console.error("Błąd podczas generowania MPS lub MRP:", error);
    });

  // Funkcja generująca wszystkie tabele
  function generateAllTables() {
    Promise.all([generateMPSTable(), generateMRPTables()])
      .then(() => {
        console.log("Tabele zostały wygenerowane");
      })
      .catch((error) => {
        console.error("Błąd podczas generowania tabel:", error);
      });
  }

  // Obsługa zmian w input
  const weeksInput = document.getElementById("weeksNumber");
  weeksInput.addEventListener("input", () => {
    // Zakładając, że generowanie tabeli zależy od zmiany inputu
    generateAllTables();
  });

  // Funkcja do obliczeń
  function calculateAllTables() {
    Promise.all([calculateMPSTable(), calculateMRPTables()])
      .then(() => {
        console.log("Obliczenia zakończone");
      })
      .catch((error) => {
        console.error("Błąd podczas obliczeń:", error);
      });
  }

  // Obsługa kliknięcia przycisku "Oblicz"
  document
    .getElementById("calculate-btn")
    .addEventListener("click", calculateAllTables);

  // Obsługa kliknięć na innych przyciskach "calculate-all-btn"
  document.querySelectorAll(".calculate-all-btn").forEach((btn) => {
    btn.addEventListener("click", calculateAllTables);
  });
});
