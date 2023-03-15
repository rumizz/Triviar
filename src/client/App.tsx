
import './index.css';
import { GameState } from '../server/types/GameState';
import StateRouter, { StateRoute } from './StateRouter'
import Commands from './component/Commands';

function App() {
  return (
    <div>
      <Commands />
      <StateRouter>
        <StateRoute value={GameState.lobby}>
          <div>lobby</div>
        </StateRoute>
        <StateRoute value={GameState.question}>
          <div>question</div>
        </StateRoute>
        <StateRoute value={GameState.answer}>
          <div>answer</div>
        </StateRoute>
        <StateRoute value={GameState.scores}>
          <div>scores</div>
        </StateRoute>
        <StateRoute value={GameState.podium}>
          <div>podium</div>
        </StateRoute>
      </StateRouter>
    </div>
  );
}

export default App;
