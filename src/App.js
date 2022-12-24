
import './App.css';
import Player from './Components/Player';
import { PlayerProvider } from './Context/PlayerContext';
import Allmusic from './dados/Allmusic';

function App() {
  
 const index = Math.floor((Math.random() * Allmusic.length) + 1);
    return (
    <div className="App">
      <PlayerProvider value={{index}} >
        <Player/>
      </PlayerProvider>
    </div>
  );
}

export default App;
