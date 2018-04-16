import { Hand, ValidHands, EmptyHand } from './hand';

export class Player {
  public id: number;
  public name: string;
  public human: boolean;
  public score: number;
  public currentHand: Hand;
  public previousHand: Hand;
  public handsUsage: { [index: number]: number } = {};

  constructor(id: number, name: string, human: boolean) {
    this.id = id;
    this.name = name;
    this.human = human;
    this.score = 0;
    this.currentHand = EmptyHand;
    this.previousHand = EmptyHand;

    for (let hand of ValidHands) {
      this.handsUsage[hand.name] = 0;
    }
  }

  ready() {
    return this.currentHand !== EmptyHand;
  }

  setHand(hand: Hand) {
    this.previousHand = this.currentHand;
    this.currentHand = hand;
  }

  makeMove(enemy: Player) {
    if (this.human) {
      throw new Error(`Can't use makeMove for a Human player`);
    }
  }
}
