import { useEffect, useState } from 'react'

function charDBZ() {
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(false)
   const [personagem, setPersonagem] = useState({})

  useEffect( () => {
    const getData = async () =>{
      try{
        const response = await axios.get("https://dragonball-api.com/api/characters/2");
        setPersonagem(response.data);
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
          <h1>{personagem.name}</h1>
          <img src={personagem.image} width="250" height="400" alt=""/>
          <h1>{personagem.race}</h1>
        </div>
  )
}

export default charDBZ