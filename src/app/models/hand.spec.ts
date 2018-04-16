import { Hand, EmptyHand, Rock, Paper, Scissors, ValidHands } from './hand';

describe('Generic Hand', () => {
  let hand: Hand;
  const name = 'pippo';
  const id = 99;
  const img = 'test/img.png';
  const beatList: { [index: number]: string } = {};

  beforeEach(() => {
    hand = new Hand(id, name, beatList, img);
  });

  afterEach(() => {
    hand = null;
  });

  it('should have an id', () => {
    expect(hand.id).toBe(99);
  });

  it('should have a name', () => {
    expect(hand.name).toEqual('pippo');
  });

  it('should have a beatList', () => {
    expect(hand.beatList).toEqual(beatList);
  });

  it('should have an image path', () => {
    expect(hand.imgPath).toEqual('test/img.png');
  });

  it('should have a beats(hand) method', () => {
    expect(hand.beats(hand)).toBeFalsy();
  });

  it('should have a beatString() method', () => {
    expect(hand.beatString(hand)).toEqual('');
  });
});

describe('Empty hand', () => {
  it('should return draw vs Self', () => {
    expect(EmptyHand.beats(EmptyHand)).toBeFalsy();
  });

  it('should not beat anything', () => {
    expect(EmptyHand.beats(Rock)).toBeFalsy();
    expect(EmptyHand.beats(Paper)).toBeFalsy();
    expect(EmptyHand.beats(Scissors)).toBeFalsy();
  });
});

describe('Rock', () => {
  it('should return false vs Self', () => {
    expect(Rock.beats(Rock)).toBeFalsy();
  });

  it ('should loose againt Paper', () => {
    expect(Rock.beats(Paper)).toBeFalsy();
  });

  it('should beat Scissors', () => {
    expect(Rock.beats(Scissors)).toBeTruthy();
  });

  it('should beat EmptyHand', () => {
    expect(Rock.beats(EmptyHand)).toBeTruthy();
  });

  it('should return a beatString', () => {
    expect(Rock.beatString(Scissors)).toEqual('Rock crushes Scissors');
  });

  it('should have an image path', () => {
    expect(Rock.imgPath).toEqual('assets/img/rock-icon-grey.png');
  });
});

describe('Paper', () => {
  it('should return false vs Self', () => {
    expect(Paper.beats(Paper)).toBeFalsy();
  });

  it ('should loose againt Scissors', () => {
    expect(Paper.beats(Scissors)).toBeFalsy();
  });

  it('should beat Rock', () => {
    expect(Paper.beats(Rock)).toBeTruthy();
  });

  it('should beat EmptyHand', () => {
    expect(Paper.beats(EmptyHand)).toBeTruthy();
  });

  it('should return a beatString', () => {
    expect(Paper.beatString(Rock)).toEqual('Paper wraps Rock');
  });

  it('should have an image path', () => {
    expect(Paper.imgPath).toEqual('assets/img/paper-icon-grey.png');
  });
});

describe('Scissors', () => {
  it('should return false vs Self', () => {
    expect(Scissors.beats(Scissors)).toBeFalsy();
  });

  it ('should loose againt Rock', () => {
    expect(Scissors.beats(Rock)).toBeFalsy();
  });

  it('should beat Paper', () => {
    expect(Scissors.beats(Paper)).toBeTruthy();
  });

  it('should beat EmptyHand', () => {
    expect(Scissors.beats(EmptyHand)).toBeTruthy();
  });

  it('should return a beatString', () => {
    expect(Scissors.beatString(Paper)).toEqual('Scissors cuts Paper');
  });

  it('should have an image path', () => {
    expect(Scissors.imgPath).toEqual('assets/img/scissors-icon-grey.png');
  });
});

describe('ValidHands', () => {
  it('should return an array of Hand', () => {
    expect(ValidHands).toEqual([Rock, Paper, Scissors]);
  });
});
