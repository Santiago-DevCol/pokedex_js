function prueba() {
 console.log("entra");
}

const dexTop = document.getElementById("topDex")
const dexBoot = document.getElementById("bootDex")

function animacionRemove(div1,div2) {
    let centerDiv = document.getElementById("circ");
    let centrodivPrincipal = document.getElementById("cenBgCol");
    centerDiv.remove();
    centrodivPrincipal.remove();
    

    document.getElementById(div1).style.animation = "moveUp 0.5s ease-in-out forwards";
    document.getElementById(div2).style.animation = "moveDown 0.5s ease-in-out forwards";

    setTimeout(nextPage, 1000);
}

function nextPage() {
    location.href="./pokedexLista.html"
}