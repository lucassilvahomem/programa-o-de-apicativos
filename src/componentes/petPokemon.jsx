import axios from "axios"
import { useState, useEffect } from 'react'

function Pet(){
    const [pokemon, setPokemon] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        const getData = async () => {
            try{
                const response3 = await axios.get("https://pokeapi.co/api/v2/pokemon/charizard");
                setPokemon(response3.data);
            }
            catch(e){
                console.error("erro ao carregar api", e)
                setError(true)
            }finally{
                setLoading(false)
            }
        }
        getData();
    },[])

    if (loading) {                                // caso loading true retorna essa div para a pagina
        return (<div>Loading</div>)
    }
    if (error) {                                  // caso error true retorna essa div para a pagina
        return (<div>Ocorreu um erro inesperado</div>)
    }

    return (
        <div>
          <h1>Nome: {pokemon.name}</h1>
          <img src={pokemon.sprites.front_default}></img>
          <h1>Tipos: {pokemon.types[0].type.name}, {pokemon.types[1].type.name}</h1>
        </div>
    )
}

export default Pet