import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import MovieBox from './componentes/listMovie'

function App() {
  const [error, setError] = useState(false)     //Variavel com controle de estado para o erros
  const [loading, setLoading] = useState(true)  //Variavel com controle de estado para o Carregamento
  const [filme, setFilme] = useState({})

  const[text, setText] = useState( localStorage.getItem('easy-input') || '')
  useEffect(() =>  {localStorage.setItem('easy-input', text);},[text])

  useEffect(() => {                             //inicio do useEffect
    const getData = async () => {               //inicio da função getData
      const responseFilme = 
        await axios.get(`https://www.omdbapi.com/?s=${filme}tt3896198&apikey=93554fd1`)
        setFilme(responseFilme)
      try {                                     //definição da estrutura try/catch
        
        setLoading(false)                       //altera a variavel de estado loadind para falso
      } catch (error) {                         //em caso de erro em qualquer linha acima executa a sequencia do catch
        setLoading(false)                       //altera a variavel de estado loadind para falso
        setError(true)                          //altera a variavel de estado loadind para true
        console.log("Error: ", error)           //apresenta o erro no console
      }

    }
    getData()                                   //chama a função getData
  }, [])                                        //finaliza o useEffect com dependencia vazia (executa ao recarregar a pagina)

  if (loading) {                                // caso loading true retorna essa div para a pagina
    return (<div>Loading</div>)
  }
  if (error) {                                  // caso error true retorna essa div para a pagina
    return (<div>Ocorreu um erro inesperado</div>)
  }
  return (                                      //se passar pelos ifs anteriores retorna essa pagina
    <>
      <section id="center">                     {/* mantive o retorno do padrão da pagina gerado pelo vite*/}
      <div>
        <MovieBox />
      </div>
      <div>
        <label>Digite seu nome:</label>
      <input 
      type="text"
      value={text}
      onChange = {(evento) => setText(evento.target.value) }
      placeholder = 'Digite algo para salvar...'
      />

      <button onClick={() =>{}}> enviar </button>
      </div>
      </section>
      <div className="ticks"></div>
    </>
  )
}

export default App                             //retorna minha pagina ou componente
