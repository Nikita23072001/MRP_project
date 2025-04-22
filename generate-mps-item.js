import { productMPS, productionParametersMPS } from "./mps-data.js";

export const generateMPS = () => {
  const container = document.getElementById("mps-item-container");
  if (container) {
    container.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl text-center font-semibold mb-4">MPS - Główny Harmonogram Produkcji dla ${
          productMPS.name
        }</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          ${productionParametersMPS
            .map(
              (param) => `
                <div>
                  <label class="block text-gray-700">${param.name}:</label>
                  <input
                    type="number"
                    id="${param.className}"
                    value="${param.value}"
                    class="w-full p-2 border rounded"
                  />
                </div>
              `
            )
            .join("")}
        </div>
        <div class="overflow-x-auto">
          <table class="w-full mt-4 border border-gray-600">
            <thead id="table-head" class="bg-gray-200 border-gray-600"></thead>
            <tbody id="table-body"></tbody>
          </table>
        </div>
        <button
          id="calculate-btn"
          class="calculate-all-btn mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Oblicz
        </button>
      </div>
    `;
  }
};
