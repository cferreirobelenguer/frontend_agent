
import './App.css';
import Dictaphone from './components/Distaphone';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../src/assets/images/logo.gif'

const Header=()=>{

  return(
  <div className='contenidoNavegacion'>
  
  <nav className="navbar navbar-expand-lg navbar-light ">
    <div className="logo">
      <img src={logo} width="160" height="160" className="img-fluid" alt="logo"/>
    </div>
    
    <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#funciones">Funciones</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#precios">Precios</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#porque">Por qué Noa</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#contacto">Contacto</a>
          </li>
            </ul>
          </div>
        </div>
    </nav>
  </div>
  );
}
function App() {
  return (
    <div className="App">
      <Header/>
      <Dictaphone/>
    </div>
  );
}

export default App;
