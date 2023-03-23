
import './index.css';
import PhaseRouter, { PhaseRoute } from './util/PhaseRouter'
import Commands from './component/Commands';
import { Phase } from 'src/server/types/Phase';
import NamePage from './page/Naming';
import QuestionPage from './page/Question';
import GameStateContextProvider from './util/GameStateContext';

function App() {
  return (
    <GameStateContextProvider>
      <div className='p-4'>
        <Commands />
        <PhaseRouter>
          <PhaseRoute value={Phase.lobby}>
            <>
              <div>lobby</div>
              <NamePage />
            </>
          </PhaseRoute>
          <PhaseRoute value={Phase.question}>
            <QuestionPage />
          </PhaseRoute>
          <PhaseRoute value={Phase.answer}>
            <div>answer</div>
          </PhaseRoute>
          <PhaseRoute value={Phase.scores}>
            <div>scores</div>
          </PhaseRoute>
          <PhaseRoute value={Phase.podium}>
            <div>podium</div>
          </PhaseRoute>
        </PhaseRouter>
      </div>
    </GameStateContextProvider>
  );
}

export default App;
