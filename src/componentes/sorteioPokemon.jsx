import { useState } from "react";
import './sorteioPokemon.css'

function Sorteio() {
  const [pokemon, setPokemon] = useState(null);
  const [evolucoes, setEvolucoes] = useState([]);
  const [mostrarEvolucoes, setMostrarEvolucoes] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  
  function selecionarPokemon(pokemonSelecionado) {
    console.log("Pokémon selecionado:", pokemonSelecionado.name);
    setPokemon(pokemonSelecionado);

    // Fecha a lista de evoluções
    setMostrarEvolucoes(false);
  }

  async function buscarEvolucoes(urlEspecie) {
  // Busca os dados da espécie
  const respostaEspecie = await fetch(urlEspecie);
  const dadosEspecie = await respostaEspecie.json();

  // Busca a cadeia de evoluções
  const respostaEvolucao = await fetch(
    dadosEspecie.evolution_chain.url
  );

  const dadosEvolucao = await respostaEvolucao.json();

  // Percorre toda a cadeia de evoluções
  const nomes = [];

  function percorrerCadeia(cadeia) {
    nomes.push(cadeia.species.name);

    cadeia.evolves_to.forEach((evolucao) => {
      percorrerCadeia(evolucao);
    });
  }
  
  percorrerCadeia(dadosEvolucao.chain);

  // Busca os dados e imagens de cada Pokémon
  const listaEvolucoes = await Promise.all(
    nomes.map(async (nome) => {
      const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nome}`
      );

      return await resposta.json();
    })
  );

  setEvolucoes(listaEvolucoes);
}

  async function sortearPokemon() {
    setCarregando(true);
    setErro("");

    try {
      // Sorteia um número entre 1 e 1025
      const numeroAleatorio = Math.floor(Math.random() * 1025) + 1;

      // Busca os dados na PokeAPI
      const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`
      );

      if (!resposta.ok) {
        throw new Error("Não foi possível buscar o Pokémon.");
      }

      const dados = await resposta.json();

      setPokemon(dados);
      setMostrarEvolucoes(false);
      setEvolucoes([]);

    await buscarEvolucoes(dados.species.url);
    } catch (error) {
      setErro("Erro ao buscar Pokémon. Tente novamente!");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="sorteador-container">
      <h1>🎮 Sorteador de Pokémon</h1>

      <p>Clique no botão e descubra seu Pokémon aleatório!</p>

      <button onClick={sortearPokemon} disabled={carregando}>
        {carregando ? "Sorteando..." : "Sortear Pokémon"}
      </button>

      {erro && <p className="erro">{erro}</p>}

      {pokemon && (
        <div className="pokemon-card">
          <h2>
            {pokemon.name.toUpperCase()}
          </h2>

          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />

          <p>
            <strong>Número:</strong> #{pokemon.id}
          </p>

          <p>
            <strong>Tipo:</strong>{" "}
            {pokemon.types
              .map((tipo) => tipo.type.name)
              .join(", ")}
          </p>

          <p>
            <strong>Altura:</strong> {pokemon.height / 10} m
          </p>

          <p>
            <strong>Peso:</strong> {pokemon.weight / 10} kg
          </p>
          {evolucoes.length > 1 && (
    <button
    className="botao-evolucoes"
    onClick={() =>
      setMostrarEvolucoes(!mostrarEvolucoes)
    }
    >
    {mostrarEvolucoes
      ? "Esconder evoluções"
      : "Ver evoluções"}
    </button>
    )}
    
    {mostrarEvolucoes && (
    <div className="lista-evolucoes">
    <h3>Família evolutiva</h3>

    {evolucoes.map((evo) => (
      <button
        type="button"
        className="evolucao-item"
        key={evo.id}
        onClick={() => selecionarPokemon(evo)}
      >
        <img
          src={evo.sprites.front_default}
          alt={evo.name}
        />

        <p>{evo.name.toUpperCase()}</p>
      </button>
     ))}
    </div>
     )}
        </div>
      )}
    </div>
  );
}

export default Sorteio;