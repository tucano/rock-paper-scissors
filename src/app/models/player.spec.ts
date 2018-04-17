import { Player } from './player';
import { EmptyHand, Rock, Paper, Scissors, ValidHands } from './hand';
import { GameStyle } from './game-style';

describe('Human Player', () => {
  let player: Player;
  const id = 0;
  const name = 'pippo';

  beforeEach(() => {
    player = new Player(id, name, true);
  });

  afterEach(() => {
    player = null;
  });

  it('should have an id', () => {
    expect(player.id).toBe(id);
  });

  it('should have a name', () => {
    expect(player.name).toBe(name);
  });

  it('should have a score equal to 0', () => {
    expect(player.score).toEqual(0);
  });

  it('should have a currentHand set to Empty Hand', () => {
    expect(player.currentHand).toEqual(EmptyHand);
  });

  it('should have a previousHand set to Empty Hand', () => {
    expect(player.previousHand).toEqual(EmptyHand);
  });

  it('should have an handsUsage list', () => {
    expect(player.handsUsage['Rock']).toEqual(0);
  });

  it('should not be ready', () => {
    expect(player.ready()).toBeFalsy();
  });

  it('should setHand store currentHand', () => {
    player.setHand(Rock);
    expect(player.currentHand).toEqual(Rock);
  });

  it('should setHand store previousHand', () => {
    player.setHand(Paper);
    player.setHand(Rock);
    expect(player.currentHand).toEqual(Rock);
    expect(player.previousHand).toEqual(Paper);
  });

  it('should setHand update handsUsage', () => {
    player.setHand(Rock);
    expect(player.handsUsage['Rock']).toEqual(1);
  });

  it('should be Human', () => {
    expect(player.human).toBeTruthy();
  });

  it('should throw error if I call makeMove', () => {
    const enemy = new Player(99, 'test', true);
    expect(() => (player.makeMove(enemy)))
    .toThrowError(`Can't use makeMove for a Human player`);
  });

  it('should return info', () => {
    expect(player.info()).toBe('pippo - human');
  });
});

describe('Computer Player', () => {
  let player: Player;
  let gameStyle: GameStyle;
  const id = 0;
  const name = 'pippo';

  beforeEach(() => {
    gameStyle = new GameStyle(0, 'random');
    player = new Player(id, name, false, gameStyle);
  });

  afterEach(() => {
    player = null;
  });

  it('should throw exception if init without gameStyle', () => {
    expect(() => (new Player(99, name, false)))
    .toThrowError((`Can't init a Computer player without a gameStyle`));
  });

  it('should set currentHand if I call draw', () => {
    const enemy = new Player(99, 'test', true);
    player.makeMove(enemy);
    expect(ValidHands).toContain(player.currentHand);
  });

  it('should return info', () => {
    expect(player.info()).toBe('pippo - random');
  });
});

describe('Computer Player: iteration1', () => {
  let player: Player;
  let gameStyle: GameStyle;
  const id = 0;
  const name = 'pippo';

  beforeEach(() => {
    gameStyle = new GameStyle(0, 'iteration1', 1);
    player = new Player(id, name, false, gameStyle);
  });

  afterEach(() => {
    player = null;
  });

  it('should set currentHand if I call makeMove with a previousHand', () => {
    const enemy = new Player(99, 'test', true);
    enemy.previousHand = Rock;
    player.currentHand =  Scissors;
    player.makeMove(enemy);
    expect(player.currentHand).toBe(Paper);
  });
});

