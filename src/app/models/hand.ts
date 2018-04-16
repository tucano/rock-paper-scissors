export class Hand {
  public id: number;
  public name: string;
  public imgPath: string;
  public beatList: { [index: number]: string } = {};

  constructor(id: number, name: string, beatList: { [index: string]: string }, imgPath: string) {
    this.id = id;
    this.name = name;
    this.beatList = beatList;
    this.imgPath = imgPath;
  }

  public beats(hand: Hand): boolean {
    return this.beatList.hasOwnProperty(hand.name);
  }

  public beatString(hand: Hand): string {
    if (this.beats(hand)) {
      return `${this.name} ${this.beatList[hand.name]} ${hand.name}`;
    }
    return '';
  }
}

export const EmptyHand: Hand = new Hand(0, 'Empty hand', {}, '');

export const Rock: Hand = new Hand(1, 'Rock',
  {
    'Scissors' : 'crushes',
    'Empty hand' : 'smashes'
  },
  'assets/img/rock-icon-grey.png'
);

export const Paper: Hand = new Hand(2, 'Paper',
  {
    'Rock' : 'wraps',
    'Empty hand' : 'cuts into'
  },
  'assets/img/paper-icon-grey.png'
);

export const Scissors: Hand = new Hand(3, 'Scissors',
  {
    'Paper' : 'cuts',
    'Empty hand' : 'cuts off'
  },
  'assets/img/scissors-icon-grey.png'
);
