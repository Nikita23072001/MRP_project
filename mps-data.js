export const productMPS = {
  name: "Window",
  className: "window",
};

export const categoriesMPS = [
  {
    demandMPS: { name: "Przewidywany Popyt", className: "demandMPS" },
    productionMPS: { name: "Produkcja", className: "productionMPS" },
    availableMPS: { name: "Dostępne", className: "availableMPS" },
  },
];

// export const categoriesMPS = [
//   {
//     name: "Przewidywany Popyt",
//     className: "demandMPS",
//   },
//   {
//     name: "Produkcja",
//     className: "productionMPS",
//   },
//   {
//     name: "Dostępne",
//     className: "availableMPS",
//   },
// ];

// export const categoriesMPS = {
//   demandMPS: "Przewidywany Popyt",
//   productionMPS: "Produkcja",
//   availableMPS: "Dostępne",
// };

export const productionParametersMPS = [
  {
    name: "Na stanie",
    className: "inStock",
    value: 2,
  },
  {
    name: "Czas realizacji",
    className: "leadTime",
    value: 1,
  },
  {
    name: "Liczba tygodni",
    className: "weeksNumber",
    value: 10,
  },
];
