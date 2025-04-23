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

export const productionParametersMPS = [
  {
    name: "Na stanie",
    className: "inStock",
    value: 10,
  },
  {
    name: "Czas realizacji",
    className: "leadTime",
    value: 1,
  },
];
