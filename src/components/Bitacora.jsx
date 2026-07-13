import { useState, useEffect } from 'react'

function Bitacora() {
  const [bitacoras, setBitacoras] = useState([])
  const [nickname, setNickname] = useState('')
  const [comentario, setComentario] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [errores, setErrores] = useState({})

  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem('bitacoras')) || []
    setBitacoras(guardadas)
  }, [])

  function guardarEnStorage(lista) {
    localStorage.setItem('bitacoras', JSON.stringify(lista))
  }

  function validar() {
    const nuevosErrores = {}
    if (nickname.trim() === '') nuevosErrores.nickname = 'El nickname es obligatorio.'
    if (comentario.trim() === '') nuevosErrores.comentario = 'El comentario es obligatorio.'
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  function agregar() {
    if (!validar()) return

    const nueva = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString(),
      nickname,
      comentario
    }

    const nuevaLista = [...bitacoras, nueva]
    setBitacoras(nuevaLista)
    guardarEnStorage(nuevaLista)
    alert("¡Bitácora agregada exitosamente!")
    setNickname('')
    setComentario('')
    setErrores({})
  }

  function eliminar(id) {
    const nuevaLista = bitacoras.filter(b => b.id !== id)
    setBitacoras(nuevaLista)
    guardarEnStorage(nuevaLista)
    alert("¡Bitácora eliminada exitosamente!")
  }

  function iniciarEdicion(bitacora) {
    setEditandoId(bitacora.id)
    setNickname(bitacora.nickname)
    setComentario(bitacora.comentario)
  }

  function guardarEdicion() {
    if (!validar()) return

    const nuevaLista = bitacoras.map(b =>
      b.id === editandoId
        ? { ...b, nickname, comentario }
        : b
    )

    setBitacoras(nuevaLista)
    guardarEnStorage(nuevaLista)
    alert("¡Bitácora actualizada exitosamente!")
    setEditandoId(null)
    setNickname('')
    setComentario('')
    setErrores({})
  }

  return (
    <div className='bitacora'>
      <h2>Bitácora de visitas</h2>

      <div className='campo'>
        <label>Nickname</label>
        <input
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="Tu nickname"
        />
        {errores.nickname && <span className='error'>{errores.nickname}</span>}
      </div>

      <div className='campo'>
        <label>Comentario</label>
        <input
          type="text"
          value={comentario}
          onChange={e => setComentario(e.target.value)}
          placeholder="Tu comentario"
        />
        {errores.comentario && <span className='error'>{errores.comentario}</span>}
      </div>

      <button className='btn' onClick={editandoId ? guardarEdicion : agregar}>
        {editandoId ? 'Guardar cambios' : 'Agregar bitácora'}
      </button>

      <h3>Registros guardados</h3>
      {bitacoras.length === 0 && <p>No hay bitácoras aún.</p>}
      {bitacoras.map(b => (
        <div key={b.id} className='bitacora-item'>
          <p><strong>Fecha:</strong> {b.fecha}</p>
          <p><strong>Nickname:</strong> {b.nickname}</p>
          <p><strong>Comentario:</strong> {b.comentario}</p>
          <div className='bitacora-botones'>
            <button className='btn-editar' onClick={() => iniciarEdicion(b)}>Editar</button>
            <button className='btn-eliminar' onClick={() => eliminar(b.id)}>Eliminar</button>
          </div>
        </div>
        
      ))}
    </div>
  )
}

export default Bitacora