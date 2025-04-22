import { categoriesData, productionParameters } from "./mrp-data.js";

export function calculateMRPSecond(item) {
  console.log("Calculating second");
  if (item.level !== 2) return;
  let itemClassName = item.className;
  const parentClassName = item.parentClassName;

  let weeksNumber =
    parseInt(document.getElementById("weeksNumber").value) || 10;
  const leadTimeParent =
    parseInt(
      document.getElementById(
        `${productionParameters[0].className}-${parentClassName}`
      ).value
    ) || 0;

  const plannedOrderReleasesParent = Array.from(
    document.querySelectorAll(
      `.${categoriesData[4].className}-${parentClassName}`
    )
  ).map((el) => parseInt(el.value) || 0);

  plannedOrderReleasesParent.forEach((val, index) => {
    document.getElementById(
      `${categoriesData[0].className}-${itemClassName}-${index + 1}`
    ).value = val;
  });

  console.log(
    "Parent Order Releases ",
    parentClassName,
    plannedOrderReleasesParent
  );

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

  let colorWarning = Array(weeksNumber).fill(false);

  let demand = Array(weeksNumber).fill(0);

  for (let i = 0; i < weeksNumber; i++) {
    demand[i] = plannedOrderReleasesParent[i] * quantity;
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
  projectedAvailable[0] = inStock + scheduledReceipts[0] - demand[0];

  projectedAvailable[0] < 0 &&
    ((netRequirements[0] = -projectedAvailable[0]), (colorWarning[0] = true));

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

        let releaseIndex = t - leadTime;
        if (releaseIndex >= 0) {
          plannedOrderReceipts[t] = lotSize;
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

  //   Update values in the tables

  projectedAvailable.forEach((val, index) => {
    document.getElementById(
      `${categoriesData[2].className}-${itemClassName}-${index + 1}`
    ).value = val;
  });

  netRequirements.forEach((val, index) => {
    let elementId = `${categoriesData[3].className}-${itemClassName}-${
      index + 1
    }`;
    let element = document.getElementById(elementId);
    if (element) {
      if (colorWarning[index]) {
        element.classList.add("bg-red-600");
      } else {
        element.classList.remove("bg-red-600");
      }
      element.value = val;
      val === 0 && (element.value = null);
      element.classList.remove("border");
    }
  });

  plannedOrderReleases.forEach((val, index) => {
    let elementId = `${categoriesData[4].className}-${itemClassName}-${
      index + 1
    }`;
    let element = document.getElementById(elementId);
    if (element) {
      element.value = val;
      val === 0 && (element.value = null);
      element.classList.remove("border");
    }
  });

  plannedOrderReceipts.forEach((val, index) => {
    let elementId = `${categoriesData[5].className}-${itemClassName}-${
      index + 1
    }`;
    let element = document.getElementById(elementId);
    if (element) {
      element.value = val;
      val === 0 && (element.value = null);
      element.classList.remove("border");
    }
  });
}
