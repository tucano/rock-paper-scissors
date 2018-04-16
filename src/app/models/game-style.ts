import { Hand, EmptyHand, Rock, Paper, Scissors, ValidHands } from './hand';

export class GameStyle {
  public id: number;
  public name: string;
  public iterations: number;

  constructor(id: number, name: string, iterations: number = 0) {
    this.id = id;
    this.name = name;
    this.iterations = iterations;
  }

  public draw(lastHand: Hand = EmptyHand) {
    // ITERATIONS 0 = RANDOM o EMPTY
    if (this.iterations === 0 || lastHand.empty()) { return this.getRandomHand(ValidHands); }
    // ITERATIONS > 0
    // in pratica vado a pescare una mano che vince contro
    // la mano precedente dell'avversario
    let hand: Hand = this.getRandomHand(lastHand.getWinners());
    for ( let i = 1; i < this.iterations; i++ ) {
      const enemyHand: Hand = this.getRandomHand(hand.getWinners());
      hand = this.getRandomHand(enemyHand.getWinners());
    }
    return hand;
  }

  private getRandomHand(hands: Hand[]): Hand {
    if (hands.length === 1) {
      return hands[0];
    } else {
      const rand = Math.floor(Math.random() * hands.length) + 1;
      return hands.find((i) => (i.id === rand));
    }
  }
}
