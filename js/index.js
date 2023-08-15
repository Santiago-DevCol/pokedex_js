

function prueba() {
 console.log("entra");
}


const dexTop = document.getElementById("topDex")
const dexBoot = document.getElementById("bootDex")

function animacionRemove(div1,div2) {


    document.getElementById(div1).style.animation = "moveUp 0.5s ease-in-out forwards";
    document.getElementById(div2).style.animation = "moveDown 0.5s ease-in-out forwards";

    let centerDiv = document.getElementById("circ");
    let centrodivPrincipal = document.getElementById("cenBgCol");
        centerDiv.remove();
        centrodivPrincipal.remove();
        const contenedor= document.getElementById("pokemonList");
    
        contenedor.style.display = "flex";
    //setTimeout(nextPage, 1000);
}

function mostrarData (lista) {
    const contenedor= document.getElementById("pokemonList");
    
    contenedor.style.display = "none";
    contenedor.innerHTML = ""
    console.log(lista);

    if (Array.isArray(lista)){

    lista.forEach(pokemon => {
        const type = Array.isArray(pokemon.type) ? pokemon.type.join(", ") : "Tipo no disponible";
        const abilities = Array.isArray(pokemon.abilities) ? pokemon.abilities.join(", ") : "Habilidad no disponible";
        const weaknesses = Array.isArray(pokemon.weaknesses) ? pokemon.weaknesses.join(", ") : "Debilidades no disponibles";
        const card = document.createElement("div");
        card.innerHTML = `
          <h3>${pokemon.name}</h3>
          <p>Number: ${pokemon.number}</p>
          <p>Type: ${type}</p>
          <p>Abilities: ${abilities}</p>
          <p>Weaknesses: ${weaknesses}</p>
          <img src="${pokemon.thumbnail}" alt="${pokemon.name}">
          <p><a href="${pokemon.detailPageURL}" target="_blank">More Details</a></p>
          <hr>
        `;
        contenedor.appendChild(card);
    
    });
    }else {
        console.error("La respuesta de la API no es un array:", lista);
      }

    
}

fetch("http://localhost:3000/datos")
        .then(response => response.json())
        .then(data => {
            mostrarData(data);
        })
        .catch(error => {
            console.error("error fetch data ", error);
        })   
function nextPage() {
    location.href="./pokedexLista.html"
}