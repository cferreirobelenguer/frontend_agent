
import './App.css';
import Dictaphone from './components/Distaphone';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../src/components/Header'

//it shows random subtitle in props
const subtitulosIntro=["Ahorra tiempo en los procesos", "Noa es un software de RR.HH. todo en uno para pymes.", "Puedes realizar consultas de tus bases de datos de manera rápida y eficaz"]
const añadirSubtitulos=()=>{
  var posicion=Math.round(Math.random()*subtitulosIntro.length);
  return subtitulosIntro[posicion]
}

function App() {
  return (
    <div className="App">
      <Header/>
      <Dictaphone subtitulo={añadirSubtitulos()}/>
    </div>
  );
}

export default App;
