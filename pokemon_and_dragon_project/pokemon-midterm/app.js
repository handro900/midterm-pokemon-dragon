import express from 'express';
import axios from 'axios';
const app = express();
const port = 3000;
app.use(express.static('public'));
app.get('/pokemons', async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
        const response = await axios.get(url);
        const pokemons = response.data.results;
        const pokemonDetails = await Promise.all(
            pokemons.map(async (pokemon) => {
                const details = await axios.get(pokemon.url);
                return {
                    name: pokemon.name,
                    image: details.data.sprites.front_default
                };
            })
        );
        res.json(pokemonDetails);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while fetching data from the Pokémon API');
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
