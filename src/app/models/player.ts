import { Hand, ValidHands, EmptyHand } from './hand';
import { GameStyle } from './game-style';

export class Player {
  public id: number;
  public name: string;
  public human: boolean;
  public score: number;
  public currentHand: Hand;
  public previousHand: Hand;
  public handsUsage: { [index: number]: number } = {};

  private gameStyle: GameStyle;

  constructor(id: number, name: string, human: boolean, gameStyle: GameStyle = null) {
    if (!human && !gameStyle) {
      throw new Error(`Can't init a Computer player without a gameStyle`);
    }
    this.id = id;
    this.name = name;
    this.human = human;
    this.score = 0;
    this.currentHand = EmptyHand;
    this.previousHand = EmptyHand;
    this.gameStyle = gameStyle;

    for (const hand of ValidHands) {
      this.handsUsage[hand.name] = 0;
    }
  }

  ready() {
    return this.currentHand !== EmptyHand;
  }

  setHand(hand: Hand) {
    this.previousHand = this.currentHand;
    this.currentHand = hand;
    this.handsUsage[hand.name]++;
  }

  makeMove(enemy: Player) {
    if (this.human) {
      throw new Error(`Can't use makeMove for a Human player`);
    }
    // se ho vinto pesco a caso
    if (this.currentHand.beats(enemy.previousHand)) {
      this.setHand(this.gameStyle.draw());
    } else {
      this.setHand(this.gameStyle.draw(enemy.previousHand));
    }
  }
}
