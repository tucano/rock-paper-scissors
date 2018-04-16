import { Player } from './player';
import { EmptyHand, Rock, Paper } from './hand';

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
    expect(player.handsUsage).toEqual({'Rock': 0, 'Paper': 0, 'Scissors': 0});
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

  it('should be Human', () => {
    expect(player.human).toBeTruthy();
  });

  it('should throw error if I call makeMove', () => {
    const enemy = new Player(99, 'test', true);
    expect(() => (player.makeMove(enemy)))
    .toThrowError(`Can't use makeMove for a Human player`);
  });
});
