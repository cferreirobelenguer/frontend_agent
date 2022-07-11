
import './App.css';
import Dictaphone from './components/Distaphone';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../src/components/Header'

function App() {
  return (
    <div className="App">
      <Header/>
      <Dictaphone/>
    </div>
  );
}

export default App;
