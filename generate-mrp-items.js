import { items, productionParameters } from "./mrp-data.js";

export const generateMRPItems = () => {
  const container = document.getElementById("mrp-tables-container");
  if (container) {
    container.innerHTML = items
      .map(
        (item) => `
            <div class='bg-white p-6 rounded-lg shadow-md'>
              <h3 class='text-xl text-center font-semibold mb-4'>MRP Iteracja dla ${
                item.name
              }</h3>
              <div class='grid grid-cols-2 md:grid-cols-4 gap-4'>
                ${productionParameters
                  .map(
                    (param) => `
                    <div>
                      <label class='block text-gray-700'>${param.name}:</label>
                      <input type='number' id='${param.className}-${
                      item.className
                    }' 
                      value='${
                        item[param.className]
                      }' class='w-full p-2 border rounded' />
                    </div>
                  `
                  )
                  .join("")}
              </div>
              <div class="overflow-x-auto">
                <table class='w-full mt-4 border border-gray-900'>
                  <thead id='table-head-${
                    item.className
                  }' class='bg-gray-200'></thead>
                  <tbody id='table-body-${item.className}'></tbody>
                </table>
              </div>
              <button id='calculate-btn-${
                item.className
              }' class='calculate-all-btn mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Oblicz</button>
            </div>
          `
      )
      .join("");
  }
};
