import { DatabaseManager } from "../js/indexDb.js";
const dbManager = DatabaseManager.getInstance();
let id;

function showAllAction() {
  const tableContainer = document.getElementById("table-container");

  dbManager.open()
    .then(() => {
      dbManager.getAllData()
        .then((allData) => {
          // Verifica si hay datos para mostrar
          if (allData.length > 0) {
            // Construye la tabla HTML
            const table = document.createElement("table");
            table.classList.add("table");
            table.classList.add("table-striped");
            table.classList.add("table-hover");
            table.classList.add("table-bordered");
            const thead = document.createElement("thead");
            const tbody = document.createElement("tbody");

            // Crea la fila de encabezado con los nombres de las propiedades (columnas)
            const headerRow = document.createElement("tr");

            // Añade primero la columna del ID
            const idTh = document.createElement("th");
            idTh.textContent = "id";
            headerRow.appendChild(idTh);

            // Luego, agrega las demás columnas
            Object.keys(allData[0]).forEach((property) => {
              if (property !== "id") {
                const th = document.createElement("th");
                th.textContent = property;
                headerRow.appendChild(th);
              }
            });

            thead.appendChild(headerRow);

            // Crea las filas de datos
            allData.forEach((data, index) => {
              const row = document.createElement("tr");

              // Añade primero la celda del ID
              const idTd = document.createElement("td");
              idTd.textContent = data["id"];
              row.appendChild(idTd);

              // Luego, agrega las demás celdas
              Object.keys(data).forEach((property) => {
                if (property !== "id") {
                  const td = document.createElement("td");
                  td.textContent = data[property];
                  row.appendChild(td);
                }
              });

              // Añade un evento de clic a cada fila
              row.addEventListener("click", () => {
                id = parseInt(data["id"]);
                deleteAction(id, row); // Pass the row to the deleteAction function
              });

              tbody.appendChild(row);
            });

            // Añade la tabla al contenedor
            table.appendChild(thead);
            table.appendChild(tbody);
            tableContainer.appendChild(table);
          } else {
            // Muestra un mensaje si no hay datos
            tableContainer.textContent = "No hay datos en la base de datos.";
          }
        })
        .catch((error) => {
          console.error("Error al obtener todos los elementos: " + error);
        });
    })
    .catch((error) => {
      console.error("Error al abrir la base de datos: " + error);
    });
}



showAllAction();

function deleteAction(id, row) {
  dbManager.open()
    .then(() => {
      dbManager.deleteData(id)
        .then(() => {
          alert("Agentge eliminado correctamente");
          location.reload();
        })
        .catch((error) => {
          console.error("Error deleteData: " + error);
        });
    })
    .catch((error) => {
      console.error("Error open: " + error);
    });
}
