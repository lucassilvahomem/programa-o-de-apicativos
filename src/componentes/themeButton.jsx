import { useEffect, useState } from 'react'

function Theme(){
    const [error, setError] = useState(false)     //Variavel com controle de estado para o erros
    const [loading, setLoading] = useState(true)  //Variavel com controle de estado para o Carregamento
    const [temaEscuro, setTemaEscuro] = useState(false);

    try {                                     //definição da estrutura try/catch
        
        setLoading(false)                       //altera a variavel de estado loadind para falso
      } catch (error) {                         //em caso de erro em qualquer linha acima executa a sequencia do catch
        setLoading(false)                       //altera a variavel de estado loadind para falso
        setError(true)                          //altera a variavel de estado loadind para true
        console.log("Error: ", error)           //apresenta o erro no console
      }
    
    if (loading) {                                // caso loading true retorna essa div para a pagina
        return (<div>Loading</div>)
      }
      if (error) {                                  // caso error true retorna essa div para a pagina
        return (<div>Ocorreu um erro inesperado</div>)
      }
    return(
        <main>
        <h1>Minha aplicação</h1>
        <main className={temaEscuro ? 'tema-escuro' : 'tema-claro'}>
        <h1>Configurações de aparência</h1>
        <p>Escolha o tema da sua interface.</p>

        <button onClick={() => setTemaEscuro(!temaEscuro)}>
          Alternar tema
        </button>
        </main>
      </main>
    )
}

export default Theme