document.addEventListener("DOMContentLoaded", function () {
  fetch("plants.json")
    // Iteração do JSON
    .then((resposta) => resposta.json())
    .then((plantas) => {
      const sunOption = document.getElementById("sunlight");
      const waterOption = document.getElementById("water");
      const petOption = document.getElementById("pet");
      const noResultsContainer = document.querySelector(".no-results");
      const gridContainer = document.querySelector(".grid-container");
      const resultHeader = document.querySelector(".result-header");

      sunOption.addEventListener("change", filtrar);
      waterOption.addEventListener("change", filtrar);
      petOption.addEventListener("change", filtrar);
        
      // Função para filtrar os selects
      function filtrar() {
        const sun = sunOption.value;
        const water = waterOption.value;
        const pet = petOption.value;

        if (sun === "none" && water === "none" && pet === "none") {
          mostrarSemResultados();
          return;
        }

        const plantasFiltradas = plantas.filter((planta) => {
          const sunlightCondition = sun === "none" || planta.sun === sun;
          const waterCondition = water === "none" || planta.water === water;
          const petCondition =
            pet === "none" ||
            (planta.toxicity && pet === "true") ||
            (!planta.toxicity && pet === "false");

          return sunlightCondition && waterCondition && petCondition;
        });

        if (plantasFiltradas.length > 0) {
          ocultarSemResultados();
          mostrarHeader();
          mostrarPlantas(plantasFiltradas);
        } else {
          mostrarSemResultados();
        }
      }

      // Função para mostrar a div .no-results e limpar os resultados das plantas
      function mostrarSemResultados() {
        noResultsContainer.style.display = "flex";
        gridContainer.innerHTML = "";
        resultHeader.innerHTML = "";
      }

      // Função para esconder a div .no-results
      function ocultarSemResultados() {
        noResultsContainer.style.display = "none";
      }

      // Função para mostrar os cards com cada planta
      function mostrarPlantas(plantas) {
        gridContainer.innerHTML = "";

        gridContainer.innerHTML = "";

        for (const planta of plantas) {
          const card = document.createElement("div");
          card.className = "card";

          const image = document.createElement("img");
          image.src = planta.url;
          image.alt = planta.name;
          image.className = "card-image";

          const title = document.createElement("h2");
          title.className = "card-title";
          title.textContent = planta.name;

          const price = document.createElement("p");
          price.className = "card-price";
          price.textContent = "$" + planta.price;

          card.appendChild(image);
          card.appendChild(title);
          card.appendChild(price);

          gridContainer.appendChild(card);
        }
      }

      // Função para mostrar a div .result-header
      function mostrarHeader() {
        resultHeader.innerHTML = "";

        const div = document.createElement("div");

        const image = document.createElement("img");
        image.src = "images/illustrations/pick.png";
        image.alt = "Hand holding a sprout";
        image.className = "pick-image";

        const title = document.createElement("h2");
        title.className = "pick-title";
        title.textContent = "One picks for you";

        div.appendChild(image);
        div.appendChild(title);

        resultHeader.appendChild(div);
      }
    });
});
