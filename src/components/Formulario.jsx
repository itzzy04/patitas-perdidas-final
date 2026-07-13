import { useState } from 'react'

function Formulario() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [errores, setErrores] = useState({})

  function validarNombre(valor) {
    for (let i = 0; i < valor.length; i++) {
      if (!isNaN(valor[i]) && valor[i] !== ' ') {
        return 'El nombre solo puede contener letras.'
      }
    }
    if (valor.trim() === '') return 'El nombre es obligatorio.'
    return ''
  }

  function validarEmail(valor) {
    const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (valor.trim() === '') return 'El email es obligatorio.'
    if (!formato.test(valor)) return 'Ingresa un email válido.'
    return ''
  }

  function manejarEnvio() {
    const errorNombre = validarNombre(nombre)
    const errorEmail = validarEmail(email)

    setErrores({ nombre: errorNombre, email: errorEmail })

    if (!errorNombre && !errorEmail) {
      alert('¡Registro exitoso!')
      setNombre('')
      setEmail('')
      setErrores({})
    }
  }

  return (
    <div className="formulario">
      <h2>Regístrate aquí</h2>

      <div className='campo'>
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Tu nombre"
        />
        {errores.nombre && <span className='error'>{errores.nombre}</span>}
      </div>

      <div className="campo">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="tunombre@email.com"
        />
        {errores.email && <span className='error'>{errores.email}</span>}
      </div>

      <button className="btn" onClick={manejarEnvio}>Enviar</button>
    </div>
  )
}

export default Formulario