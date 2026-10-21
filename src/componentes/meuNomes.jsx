import { useState, useEffect } from 'react'

function Nomes(){
    const [nome, setNome] = useState({})

    useEffect( () => {
      const getData = async () =>{
        try{
          const response = await axios.get("https://6a79e554674f43f4db11ebc8.mockapi.io/api/person");
          setNome(response.data[9].nome);
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
        <h1>{nome}</h1>
    </div>
  )
}

export default meuNomes