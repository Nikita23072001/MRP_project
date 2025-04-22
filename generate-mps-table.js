import { categoriesMPS } from "./mps-data.js";
console.log("$", categoriesMPS);

export function generateMPSTable() {
  const tbody = document.getElementById("table-body");
  const thead = document.getElementById("table-head");
  const weeksInput = document.getElementById("weeksNumber");

  let weeksNumber = parseInt(weeksInput.value) || 10;

  // Generowanie nagłówka tabeli
  thead.innerHTML = "";
  const headerRow = document.createElement("tr");
  const thLabel = document.createElement("th");

  const upperDiv = document.createElement("div");
  upperDiv.textContent = "Okres";
  upperDiv.classList.add("text-right", "block");

  const lowerDiv = document.createElement("div");
  lowerDiv.textContent = "Dane produkcyjne";
  lowerDiv.classList.add("text-left", "block");

  thLabel.appendChild(upperDiv);
  thLabel.appendChild(lowerDiv);

  // thLabel.textContent = "Tydzień";
  thLabel.classList.add(
    "max-w-24",
    "py-2",
    "border-gray-600",
    "border-b",
    "border-r",
    "text-center"
  );
  headerRow.appendChild(thLabel);

  for (let i = 1; i <= weeksNumber; i++) {
    const th = document.createElement("th");
    th.textContent = i;
    th.classList.add(
      "max-w-14",
      "py-2",
      "border-gray-600",
      "border-b",
      "border-r",
      "text-center"
    );
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);

  // Generowanie wierszy tabeli
  tbody.innerHTML = "";

  categoriesMPS.forEach((categoryObj) => {
    Object.entries(categoryObj).forEach(([key, category]) => {
      console.log(category);
      console.log(key);
      let className = category.className;

      const tr = document.createElement("tr");
      const tdLabel = document.createElement("td");

      tdLabel.textContent = category.name;
      tdLabel.classList.add(
        "max-w-24",
        "py-2",
        "border-gray-400",
        "border-r",
        "border-b",
        "text-left"
      );
      tr.appendChild(tdLabel);

      for (let i = 1; i <= weeksNumber; i++) {
        const td = document.createElement("td");
        td.classList.add(
          "text-center",
          "border-gray-400",
          "border-r",
          "border-b"
        );
        const input = document.createElement("input");

        input.type = "number";
        input.className = className; // Teraz używamy className, które jest camelCase
        input.id = `${className}-${i}`;
        input.classList.add(
          className,
          "max-w-14",
          "py-2",
          "border",
          "text-center",
          "rounded"
        );

        if (className === "availableMPS") {
          // "Dostępne"
          input.readOnly = true;
          input.placeholder = "?";
        } else if (className === "demandMPS") {
          // "Przewidywany Popyt"
          input.value = i === 5 ? 20 : i === 7 ? 40 : 0; // Wartości domyślne
        } else if (className === "productionMPS") {
          // "Produkcja"
          tdLabel.classList.add("bg-yellow-300");
          td.classList.add("bg-yellow-300");
          input.classList.add("bg-yellow-300");
          input.value = i === 5 ? 18 : i === 7 ? 40 : 0; // Wartości domyślne
        } else {
          input.value = 0;
        }

        td.appendChild(input);
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    });
  });
}
