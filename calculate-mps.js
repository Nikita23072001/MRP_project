export function calculateMPSTable() {
  let inStock = parseInt(document.getElementById("inStock").value);
  let weeksNumber =
    parseInt(document.getElementById("weeksNumber").value) || 10;

  let demandMPS = Array.from(document.querySelectorAll(".demandMPS")).map(
    (el) => parseInt(el.value) || 0
  );
  let production = Array.from(document.querySelectorAll(".productionMPS")).map(
    (el) => parseInt(el.value) || 0
  );
  let availableMPS = Array(weeksNumber).fill(0);

  availableMPS[0] = inStock - demandMPS[0] + production[0];

  for (let t = 1; t < weeksNumber; t++) {
    availableMPS[t] = availableMPS[t - 1] - demandMPS[t] + production[t];
  }

  availableMPS.forEach((val, index) => {
    document.getElementById(`availableMPS-${index + 1}`).value = val;
  });
}
