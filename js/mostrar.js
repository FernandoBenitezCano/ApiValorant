import { DatabaseManager } from "../js/indexDb.js";

const dbManager = DatabaseManager.getInstance();

async function getAgents() {
  try {
    const apiUrl = `https://valorant-api.com/v1/agents?language=es-ES&isPlayableCharacter=true`;
    const response = await fetch(apiUrl);
    const agentsData = await response.json();

    const divContainer = document.querySelector('main');

    if (response.ok) {
      agentsData.data.forEach(agent => {
        let agentDiv = document.createElement('div');
        agentDiv.classList.add('card', 'mt-4', 'mb-4', 'mx-1', 'col-3', 'agente');

        let image = document.createElement('img');
        image.classList.add('card-img-top', 'img-fluid', 'img-agente', 'pt-2');
        image.src = agent.displayIcon;

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'text-center', 'flex-grow-1');

        let name = document.createElement('h5');
        name.classList.add('card-title', 'mb-2');
        name.textContent = agent.displayName;

        let habilidadesDiv = document.createElement('div');
        habilidadesDiv.classList.add('habilidades', 'pb-3');

        agent.abilities.forEach(ability => {
          if (ability.displayIcon) {
            let abilityImg = document.createElement('img');
            abilityImg.classList.add('img-fluid', 'rounded-circle', 'habilidad');
            abilityImg.src = ability.displayIcon;
            abilityImg.style.maxWidth = '40px';
            habilidadesDiv.appendChild(abilityImg);
          }
        });

        cardBody.appendChild(name);
        cardBody.appendChild(habilidadesDiv);

        agentDiv.appendChild(image);
        agentDiv.appendChild(cardBody);
        divContainer.appendChild(agentDiv);
      });
    } else {
      console.error(`Error al obtener los datos de la API. Código de estado: ${response.status}`);
    }
  } catch (error) {
    console.error("Error al obtener agentes:", error);
  }
}

function showAllAction() {
  try {
    dbManager.open()
      .then(() => dbManager.getAllData())
      .then(allData => {
        const divContainer = document.querySelector('main');

        allData.forEach(data => {
          let agentDiv = document.createElement('div');
          agentDiv.classList.add('card', 'mt-4', 'mb-4', 'mx-1', 'col-3', 'agente');

          let image = document.createElement('img');
          image.classList.add('card-img-top', 'img-fluid', 'img-agente', 'pt-2');
          image.src = "../img/default.png";

          let cardBody = document.createElement('div');
          cardBody.classList.add('card-body', 'text-center', 'flex-grow-1');

          let name = document.createElement('h5');
          name.classList.add('card-title', 'mb-2');
          name.textContent = data.name;

          let habilidadesDiv = document.createElement('div');
          habilidadesDiv.classList.add('habilidades', 'pb-3');

          for (let index = 0; index < 4; index++) {
            let abilityImg = document.createElement('img');
            abilityImg.classList.add('img-fluid', 'rounded-circle', 'habilidad');
            abilityImg.src = "../img/habDef.jpg";
            abilityImg.style.maxWidth = '40px';
            habilidadesDiv.appendChild(abilityImg);
          }

          cardBody.appendChild(name);
          cardBody.appendChild(habilidadesDiv);

          agentDiv.appendChild(image);
          agentDiv.appendChild(cardBody);
          divContainer.appendChild(agentDiv);
        });
      })
      .catch(error => console.error("Error al obtener todos los elementos:", error));
  } catch (error) {
    console.error("Error al mostrar todos los agentes:", error);
  }
}

getAgents();
showAllAction();
