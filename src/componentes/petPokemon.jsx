import { useState, useEffect } from 'react'

  function Pokemon(){
  const [pokemon, setPokemon] = useState({})

  useEffect( () => {
    const getData = async () =>{
      try{
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/charizard");
        setPokemon(response.data);
        console.log("resposta do get:" + response.data);
        setLoading(false);
      }
      catch(e){
        console.error( "Erro ao carregar API", e );
        setLoading(false);
        setError(true);
      }
    } 
    getData();
  },[])

  return(
    <div>
        <h1>Nome: {pokemon.name}</h1>
        <img src={pokemon.sprites.front_default}></img>
        <h1>Tipos: {pokemon.types[0].type.name}, {pokemon.types[1].type.name}</h1>
    </div>
  )
}

export default petPokemon