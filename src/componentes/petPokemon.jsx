import axios from "axios"
import { useState, useEffect } from 'react'

function Pet(){
    const [pokemon, setPokemon] = useState({})
    useEffect(() => {
        const getData = async () => {
            try{
                const response3 = await axios.get("https://pokeapi.co/api/v2/pokemon/charizard");
                setPokemon(response3.data);
            }
            catch(e){
                console.error("erro ao carregar api", e)
            }
        }
        getData();
    },[])

    return (
        <div>
          <h1>Nome: {pokemon.name}</h1>
          <img src={pokemon.sprites.front_default}></img>
          <h1>Tipos: {pokemon.types[0].type.name}, {pokemon.types[1].type.name}</h1>
        </div>
    )
}

export default petPokemon