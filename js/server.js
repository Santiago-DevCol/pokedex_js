const express = require('express')
const cors = require("cors")
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())

const path = require("path");
const data = require(path.join(__dirname, "data.json"));

// Clase PokemonCard
class PokemonCard {
    constructor(data) {
      this.name = data.nombre;
      this.number = data.número;
      this.type = data.tipo;
      this.abilities = data.abilities;
      this.weaknesses = data.debilidad;
      this.thumbnail = data["Imagen en miniatura"];
      this.detailPageURL = data.detailPageURL;
    }

    getInfo(){
        return {
            name: this.name,
            number: this.number,
            type: this.type,
            abilities: this.abilities,
            weaknesses: this.weaknesses,
            thumbnail: this.thumbnail,
            detailPageURL: this.detailPageURL,
          };
    }
}
app.get("/",(req, res) => {
    res.send('api iniciada');
});

//end point para traer datos JSON
app.get("/datos", (req,res) => {
    const PokemonCards = data.map((data) => new PokemonCard(data))
    const pokemonInfo =PokemonCards.map((pokemon) => pokemon.getInfo())
    res.json(pokemonInfo)
});

app.listen(port, () => {
    console.log(`server escuchando en el puerto ${port}`);
});

