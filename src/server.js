const express = require('express')
const cors = require("cors")
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin : '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(express.json())

const path = require("path");
const data = require(path.join(__dirname, "../js/data.json"));
const protocolo = 'https://www.pokemon.com'
// Clase PokemonCard
class PokemonCard {
    constructor(data) {
        this.name = data.name;
        this.number = data.number;
        this.type = data.type;
        this.abilities = data.abilities;
        this.weaknesses = data.weakness;
        this.height = data.height;
        this.thumbnail = data["ThumbnailImage"];
        this.detailPageURL = protocolo + data.detailPageURL;
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
            height: this.height,
          };
    }
}
app.get("/",(req, res) => {
    res.send('api iniciada');
});

//end point para traer datos JSON
app.get("/pokemones/datos", (req,res) => {

    const page = parseInt(req.query.page)  || 1;
    const porPagina = parseInt(req.query.porPagina) || 10;

    let filterData = data;
    if (req.query.search) {
        const searchValue = req.query.search.toLowerCase();
        filterData = data.filter(pokemon => pokemon.name.toLowerCase().includes(searchValue));
    }

    const startIndex = (page - 1) * porPagina;
    const endIndex = startIndex + porPagina;

    const paginaData = filterData.slice(startIndex,endIndex);

    const PokemonCards = paginaData.map((data) => new PokemonCard(data))
    const pokemonInfo =PokemonCards.map((pokemon) => pokemon.getInfo())
    res.json(pokemonInfo)
});

app.listen(port, () => {
    console.log(`server escuchando en el puerto ${port}`);
});

