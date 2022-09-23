import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Locations from './locations/locations';

function App() {
  return (
    <div className="App">
      <header className="headerLoc">
        Location Manager
      </header>
      <div className='boundary'></div>
      <Locations />
    </div>
  );
}

export default App;
