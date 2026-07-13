import { useState, useEffect } from 'react'
import axios from 'axios'

function Indicadores() {
  const [indicadores, setIndicadores] = useState(null)

  useEffect(() => {
    axios.get('https://mindicador.cl/api')
      .then(respuesta => setIndicadores(respuesta.data))
      .catch(error => console.log(error))
  }, [])

  if (!indicadores) return <div className="card-dato">Cargando...</div>

  return (
    <div className="card-dato">
      <h2>Indicadores Económicos</h2>
      <p>UF: ${indicadores.uf.valor}</p>
      <p>UTM: ${indicadores.utm.valor}</p>
      <p>Dólar: ${indicadores.dolar.valor}</p>
      <p>Euro: ${indicadores.euro.valor}</p>
    </div>
  )
}

export default Indicadores