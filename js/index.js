

function prueba() {
 console.log("entra");
}


const dexTop = document.getElementById("topDex")
const dexBoot = document.getElementById("bootDex")

const contenedor= document.getElementById("pokemonList");
const btnPagRetro = document.getElementById("btnPagRetro");
const btnPagAdd = document.getElementById("btnPagAdd");

function showBtn() {
    btnPagRetro.style.display = "block";
    btnPagAdd.style.display = "block";
}

function animacionRemove(div1,div2) {

    showBtn();

    document.getElementById(div1).style.animation = "moveUp 0.5s ease-in-out forwards";
    document.getElementById(div2).style.animation = "moveDown 0.5s ease-in-out forwards";

    let centerDiv = document.getElementById("circ");
    let centrodivPrincipal = document.getElementById("cenBgCol");
        centerDiv.remove();
        centrodivPrincipal.remove();
        contenedor.style.display = "flex";
    //setTimeout(nextPage, 1000);
}


let currenPage = 1;
const porPagina = 10;

function cambiarPagina(direc) {
    if (direc === 'anterior') {
        if (currenPage > 1) {
            currenPage--;
        }
    }else if(direc === 'siguiente'){
        currenPage++;
    }
    mostrarData()
}

function mostrarData () {
    fetch(`http://localhost:3000/datos?page=${currenPage}&porPagina=${porPagina}`)
        .then(response => response.json())
        .then(data => {
            
           
            contenedor.innerHTML = ""
            console.log(data);

            if (Array.isArray(data)){

                data.forEach(pokemon => {
                    const type = Array.isArray(pokemon.type) ? pokemon.type.join(", ") : "Tipo no disponible";
                    const abilities = Array.isArray(pokemon.abilities) ? pokemon.abilities.join(", ") : "Habilidad no disponible";
                    const weaknesses = Array.isArray(pokemon.weaknesses) ? pokemon.weaknesses.join(", ") : "Debilidades no disponibles";
                    const card = document.createElement("div");
                    card.classList.add('cardPokemons');
                    card.innerHTML = `
                    <!--<h3>${pokemon.name}</h3>-->
                    <!--<p>Type: ${type}</p>-->
                    <!--<p>Abilities: ${abilities}</p>-->
                    <!--<p>Weaknesses: ${weaknesses}</p>-->
                    <img src="${pokemon.thumbnail}" alt="${pokemon.name}">
                    <p>${pokemon.number}</p>
                        <!--<p><a href="${pokemon.detailPageURL}" target="_blank">More Details</a></p>-->
                        
                    `;
                    contenedor.appendChild(card);
                
                });
                }else {
                    console.error("La respuesta de la API no es un array:", lista);
                }
            

        })
        .catch(error => {
            console.error("error fetch data ", error);
        })   





    

    
    
}

fetch("http://localhost:3000/datos")
        .then(response => response.json())
        .then(data => {
            mostrarData(data);
        })
        .catch(error => {
            console.error("error fetch data ", error);
        })   
