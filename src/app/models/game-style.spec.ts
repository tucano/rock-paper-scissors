import { GameStyle } from './game-style';
import { EmptyHand, ValidHands, Rock, Paper, Scissors } from './hand';

describe('GameStyle: Random', () => {
  let gameStyle: GameStyle;
  const id = 99;
  const name = 'random';

  beforeEach(() => {
    gameStyle = new GameStyle(id, name);
  });

  afterEach(() => {
    gameStyle = null;
  });

  it('should have an id', () => {
    expect(gameStyle.id).toBe(99);
  });

  it('should have a name', () => {
    expect(gameStyle.name).toBe('random');
  });

  it('should draw an Hand', () => {
    expect(ValidHands).toContain(gameStyle.draw());
  });

  it('should have a number of iterations', () => {
    expect(gameStyle.iterations).toBe(0);
  });

  it('On 10000 draw I must have around 0.33 ratio of Rocks (pseudonumbers check)', () => {
    let result = 0;
    const trials = 10000;
    for (let i = 0; i <= trials; i++) {
      if (gameStyle.draw() === Rock) {
        result++;
      }
    }
    expect(result / trials).toBeCloseTo(0.33, 1);
  });
});

describe('GameStyle: Iteration 1', () => {
  let gameStyle: GameStyle;
  const id = 99;
  const name = 'iteration1';

  beforeEach(() => {
    gameStyle = new GameStyle(id, name, 1);
  });

  afterEach(() => {
    gameStyle = null;
  });

  it('should have a return random if other player previousHand is EmptyHand', () => {
    expect(ValidHands).toContain(gameStyle.draw(EmptyHand));
  });

  it('draw must return Scissors if previuos enemy hand was Paper', () => {
    expect(gameStyle.draw(Paper)).toBe(Scissors);
  });

  it('draw must return Paper if previuos enemy hand was Rock', () => {
    expect(gameStyle.draw(Rock)).toBe(Paper);
  });

  it('draw must return Rock if previuos enemy hand was Scissors', () => {
    expect(gameStyle.draw(Scissors)).toBe(Rock);
  });
});

describe('GameStyle: Iteration 2', () => {
  let gameStyle: GameStyle;
  const id = 99;
  const name = 'iteration2';

  beforeEach(() => {
    gameStyle = new GameStyle(id, name, 2);
  });

  afterEach(() => {
    gameStyle = null;
  });

  it('should have a chooseHand method that return random if otherPlayerLastHand is EmptyHand', () => {
    expect([Rock, Paper, Scissors]).toContain(gameStyle.draw(EmptyHand));
  });

  // Il nemico ha giocato Paper e si aspetta che io giochi Scissors
  // quindi giochera Rock. Quindi gioco Paper
  it('draw must return Paper if previuos enemy hand was Paper', () => {
    expect(gameStyle.draw(Paper)).toBe(Paper);
  });

  // Il nemico ha giocato Rock e si aspetta che io giochi Paper
  // quindi giochera Scissors. Quindi gioco Rock
  it('draw must return Rock if previuos enemy hand was Rock', () => {
    expect(gameStyle.draw(Rock)).toBe(Rock);
  });

  // Il nemico ha giocato Scissors e si aspetta che io giochi Rock
  // quindi giochera Paper. Quindi gioco Scissors
  it('draw must return Scissors if previuos enemy hand was Scissors', () => {
    expect(gameStyle.draw(Scissors)).toBe(Scissors);
  });
});

describe('GameStyle: Iteration 3', () => {
  let gameStyle: GameStyle;
  const id = 99;
  const name = 'iteration3';

  beforeEach(() => {
    gameStyle = new GameStyle(id, name, 3);
  });

  afterEach(() => {
    gameStyle = null;
  });

  it('should have a draw method that return random if otherPlayerLastHand is EmptyHand', () => {
    expect([Rock, Paper, Scissors]).toContain(gameStyle.draw(EmptyHand));
  });

  // Il nemico ha giocato Paper e si aspetta che io giochi Scissors
  // quindi giocherà Rock. Quindi io gioco Paper
  // quindi lui gioca Scissors quindi io gioco Rock
  it('draw must return Rock if previuos enemy hand was Paper', () => {
    expect(gameStyle.draw(Paper)).toBe(Rock);
  });

  // Il nemico ha giocato Rock e si aspetta che io giochi Paper
  // quindi giochera Scissors. Quindi gioco Rock
  // quindi lui gioca Paper quindi io gioco Scissors
  it('draw must return Scissors if previuos enemy hand was Rock', () => {
    expect(gameStyle.draw(Rock)).toBe(Scissors);
  });

  // Il nemico ha giocato Scissors e si aspetta che io giochi Rock
  // quindi giochera Paper. Quindi gioco Scissors
  // quindi lui gioca Rock. Quindi gioco Paper
  it('draw must return Paper if previuos enemy hand was Scissors', () => {
    expect(gameStyle.draw(Scissors)).toBe(Paper);
  });
});
