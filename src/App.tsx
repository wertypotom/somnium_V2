import { useState } from 'react';
import './App.css';
import ConsentScreen from './components/ConsentScreen';
import GameOne from './components/GameOne';
import GameTwo from './components/GameTwo';
import GameThree from './components/GameThree';
import GameFour from './components/GameFour';
import GameFive from './components/GameFive';
import FinalScreen from './components/FinalScreen';
import Modal from './components/Modal';

export type GameStage =
  | 'consent'
  | 'game1'
  | 'modal1'
  | 'game2'
  | 'modal2'
  | 'game3'
  | 'modal3'
  | 'game4'
  | 'modal4'
  | 'game5'
  | 'final';

function App() {
  const [stage, setStage] = useState<GameStage>('consent');

  const nextStage = () => {
    const stages: GameStage[] = [
      'consent',
      'game1',
      'modal1',
      'game2',
      'modal2',
      'game3',
      'modal3',
      'game4',
      'modal4',
      'game5',
      'final',
    ];
    const currentIndex = stages.indexOf(stage);
    if (currentIndex < stages.length - 1) {
      setStage(stages[currentIndex + 1]);
    }
  };

  const renderStage = () => {
    switch (stage) {
      case 'consent':
        return <ConsentScreen onConsent={nextStage} />;
      case 'game1':
        return <GameOne onComplete={nextStage} />;
      case 'modal1':
        return (
          <Modal
            message='А ты молодец, справилась с первым уровнем. Идем дальше...'
            onClose={nextStage}
          />
        );
      case 'game2':
        return <GameTwo onComplete={nextStage} />;
      case 'modal2':
        return (
          <Modal
            message='А ты внимательная, моя мадама. Продолжаем... )'
            onClose={nextStage}
          />
        );
      case 'game3':
        return <GameThree onComplete={nextStage} />;
      case 'modal3':
        return <Modal message='Умничка, умничка )' onClose={nextStage} />;
      case 'game4':
        return <GameFour onComplete={nextStage} />;
      case 'modal4':
        return (
          <Modal
            message='Умничка! Теперь последнее испытание...'
            onClose={nextStage}
          />
        );
      case 'game5':
        return <GameFive onComplete={nextStage} />;
      case 'final':
        return <FinalScreen />;
      default:
        return null;
    }
  };

  return <div className='min-h-screen'>{renderStage()}</div>;
}

export default App;
