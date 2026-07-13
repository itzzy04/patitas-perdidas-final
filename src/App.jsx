import Clima from './components/Clima'
import Indicadores from './components/Indicadores'
import Formulario from './components/Formulario'
import Bitacora from './components/Bitacora'
import './App.css'

function App() {
  return (
    <div className="app">

      <section className="franja-superior">
        <div className="contenido-superior">

          <header className="header">
            <div className="header-datos">
              <Clima />
              <Indicadores />
            </div>

            <div className="header-centro">
              <img
                src="/logo.png"
                alt="Patitas Perdidas"
                className="logo"
              />
            </div>
          </header>

          <main className="contenido">
            <section className="seccion-formulario">
              <Formulario />
            </section>

            <section className="seccion-bitacora">
              <Bitacora />
            </section>
          </main>

        </div>
      </section>

    </div>
  )
}

export default App