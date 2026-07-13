import { useState, useEffect } from 'react'

function Clima() {
  const [clima, setClima] = useState(null)

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-20.2208&longitude=-70.1431&current=temperature_2m,weathercode,windspeed_10m&timezone=America/Santiago')
      .then(respuesta => respuesta.json())
      .then(datos => setClima(datos.current))
      .catch(error => console.log(error))
  }, [])

  if (!clima) return <div className="card-dato">Cargando...</div>

  return (
    <div className='card-dato'>
      <h2>Clima en Iquique</h2>
      <p>Temperatura: {clima.temperature_2m}°C</p>
      <p>Viento: {clima.windspeed_10m} km/h</p>
    </div>
  )
}

export default Clima