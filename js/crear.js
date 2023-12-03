import { DatabaseManager } from "../js/indexDb.js";
const dbManager = DatabaseManager.getInstance();
let sendBtn=document.getElementById("enviar");

let agentName=document.getElementById("name");
let agentLore=document.getElementById("lore");
let agentAbility1=document.getElementById("ability1");
let agentAbility2=document.getElementById("ability2");
let agentAbility3=document.getElementById("ability3");
let agentUltimate=document.getElementById("ultimate");


sendBtn.addEventListener("click", insertAgent);



function insertAgent() {
    dbManager.open()
      .then(() => {
        let data = {
            "name": agentName.value,
            "lore": agentLore.value,
            "ability1": agentAbility1.value,
            "ability2": agentAbility2.value,
            "ability3": agentAbility3.value,
            "ultimate": agentUltimate.value,
          };
        dbManager.addData(data)
          .then(() => {
            dbManager.counter++;
            alert("agente insertado correctamente");
          })
          .catch((error) => {
            console.error("Error addData: " + error);
          });
      })
      .catch((error) => {
        console.error("Error open: " + error);
      });
  }