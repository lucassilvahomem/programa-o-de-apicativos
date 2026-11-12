import axios from "axios"
import { useState, useEffect } from 'react'

function DBZ(){
    const [personagem, setPersonagem] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    useEffect(() => {
        const getData = async () => {
            try{
                const response2 = await axios.get("https://dragonball-api.com/api/characters/2");
                setPersonagem(response2.data);
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
          <h1>{personagem.name}</h1>
          <img src={personagem.image} width="250" height="400" alt=""/>
          <h1>{personagem.race}</h1>
        </div>
    )
}

export default DBZ