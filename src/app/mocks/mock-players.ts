import { GameStyle } from '../models/game-style';
import { Player } from '../models/player';

const RandomStyle: GameStyle = new GameStyle(0, 'random', 0);
const IterationOneStyle: GameStyle = new GameStyle(1, 'iteration1', 1);
const IterationTwoStyle: GameStyle = new GameStyle(1, 'iteration2', 2);
const IterationThreeStyle: GameStyle = new GameStyle(1, 'iteration3', 3);

export const PLAYERS: Player[] = [
  new Player(0, 'You', true),
  new Player(1, 'Randall', false, RandomStyle),
  new Player(2, 'Snoopy', false, IterationOneStyle),
  new Player(3, 'Mark', false, IterationTwoStyle),
  new Player(3, 'Any', false, IterationThreeStyle)
];
