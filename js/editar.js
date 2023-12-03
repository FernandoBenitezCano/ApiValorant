import { DatabaseManager } from "../js/indexDb.js";
const dbManager = DatabaseManager.getInstance();
let id;
let divEdit=document.getElementById("editar");
let divForm=document.getElementById("formEdit");
let agentName=document.getElementById("name");
let agentLore=document.getElementById("lore");
let agentAbility1=document.getElementById("ability1");
let agentAbility2=document.getElementById("ability2");
let agentAbility3=document.getElementById("ability3");
let agentUltimate=document.getElementById("ultimate");
let sendBtn=document.getElementById("enviar");


sendBtn.addEventListener("click", updateAgent);

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

              // Agrega un evento de clic a cada fila
              row.addEventListener("click", () => {
                handleRowClick(data["id"]);
                id=parseInt(data["id"]);
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


// Función para manejar el clic en una fila
function handleRowClick(idValue) {
  divEdit.classList.add("hide");
  divForm.classList.remove("hide");
}
function updateAgent() {
  dbManager.open()
    .then(() => {


      let data = {
        "name": agentName.value,
        "lore": agentLore.value,
        "ability1": agentAbility1.value,
        "ability2": agentAbility2.value,
        "ability3": agentAbility3.value,
        "ultimate": agentUltimate.value,
      }
      dbManager.updateData(id, data)
        .then(() => {
          alert("agente actualizado con exito")
        })
        .catch((error) => {
          console.error("Error al actualizar elemento: " + error);
        });
    })
    .catch((error) => {
      console.error("Error al abrir la base de datos: " + error);
    });
}


showAllAction();
