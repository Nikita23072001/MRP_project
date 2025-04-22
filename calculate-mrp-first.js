import { categoriesData, productionParameters } from "./mrp-data.js";

export function calculateMRPFirst(item) {
  if (item.level !== 1) return;

  let weeksNumber =
    parseInt(document.getElementById("weeksNumber").value) || 10;

  const leadTimeMPS =
    parseInt(
      document.getElementById(productionParameters[0].className).value
    ) || 0;

  const productionMPS = Array.from(
    document.querySelectorAll(".productionMPS")
  ).map((el) => parseInt(el.value) || 0);

  const itemClassName = item.className;

  let inStock = parseInt(
    document.getElementById(
      `${productionParameters[3].className}-${itemClassName}`
    ).value
  );
  let leadTime = parseInt(
    document.getElementById(
      `${productionParameters[0].className}-${itemClassName}`
    ).value
  );

  let lotSize = parseInt(
    document.getElementById(
      `${productionParameters[1].className}-${itemClassName}`
    ).value
  );
  // console.log("Lot Size: " + lotSize);
  let quantity = parseInt(
    document.getElementById(
      `${productionParameters[2].className}-${itemClassName}`
    ).value
  );

  let demand = Array(weeksNumber).fill(0);

  for (let i = 0; i < weeksNumber - leadTimeMPS; i++) {
    demand[i] = productionMPS[i + leadTimeMPS] * quantity;
  }
  demand.forEach((val, index) => {
    let el = document.getElementById(
      `${categoriesData[0].className}-${itemClassName}-${index + 1}`
    );
    el.value = val;
    val === 0 && (el.value = null);
    el.classList.remove("border");
  });

  let scheduledReceipts = Array.from(
    document.querySelectorAll(
      `.${categoriesData[1].className}-${itemClassName}`
    )
  ).map((el) => parseInt(el.value) || 0);

  let netRequirements = Array(weeksNumber).fill(0);

  let plannedOrderReleases = Array(weeksNumber).fill(0);

  let plannedOrderReceipts = Array(weeksNumber).fill(0);

  let projectedAvailable = Array(weeksNumber).fill(0);
  projectedAvailable[0] = inStock + scheduledReceipts[0] - productionMPS[0];

  let colorWarning = Array(weeksNumber).fill(false);

  function calculateProjectedAvailable() {
    for (let t = 1; t < weeksNumber; t++) {
      let currentValue =
        projectedAvailable[t - 1] +
        scheduledReceipts[t] +
        plannedOrderReceipts[t] -
        demand[t];
      if (currentValue >= 0) {
        projectedAvailable[t] = currentValue;
      } else {
        netRequirements[t] = -currentValue;
        colorWarning[t] = true;
        plannedOrderReceipts[t] = lotSize;

        let releaseIndex = t - leadTime;
        if (releaseIndex >= 0) {
          plannedOrderReleases[releaseIndex] = lotSize;
          let newCurrentValue =
            projectedAvailable[t - 1] +
            scheduledReceipts[t] +
            plannedOrderReceipts[t] -
            demand[t];
          projectedAvailable[t] = newCurrentValue;
          // Can't if the thable start (1st columns)
        } else {
          projectedAvailable[t] = currentValue;
        }
      }
    }
  }
  calculateProjectedAvailable();

  projectedAvailable.forEach((val, index) => {
    document.getElementById(
      `${categoriesData[2].className}-${itemClassName}-${index + 1}`
    ).value = val;
  });

  netRequirements.forEach((val, index) => {
    let el = document.getElementById(
      `${categoriesData[3].className}-${itemClassName}-${index + 1}`
    );
    el.value = val;
    if (colorWarning[index]) {
      el.classList.add("bg-red-600");
    } else {
      el.classList.remove("bg-red-600");
    }
  });

  // plannedOrderReleases.forEach((val, index) => {
  //   document.getElementById(
  //     `${categoriesData[4].className}-${itemClassName}-${index + 1}`
  //   ).value = val;
  // });

  // plannedOrderReceipts.forEach((val, index) => {
  //   document.getElementById(
  //     `${categoriesData[5].className}-${itemClassName}-${index + 1}`
  //   ).value = val;
  // });

  function updateTableValues(itemClassName, dataArrays) {
    categoriesData.slice(3).forEach((category, index) => {
      dataArrays[index].forEach((val, t) => {
        const element = document.getElementById(
          `${category.className}-${itemClassName}-${t + 1}`
        );
        if (element) {
          element.value = val;
          val === 0 && (element.value = null);
          element.classList.remove("border");
        }
      });
    });
  }

  updateTableValues(itemClassName, [
    netRequirements, // categoriesData[3] - "Zapotrzebowanie netto"
    plannedOrderReleases, // categoriesData[4] - "Planowane zamówienia"
    plannedOrderReceipts, // categoriesData[5] - "Planowane przyjęcie zamówień"
  ]);
}
