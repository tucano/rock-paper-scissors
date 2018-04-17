import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../models/player';
import { ValidHands, Hand } from '../../models/hand';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  lastGameResult = 'Ready to play?';
  handsMsg = 'PLAYER ONE CHOOSE YOUR WEAPON!';
  computerVsComputer = false;
  numberOfSimulations = 1;
  gameCountDown = 3;
  gameReady = false;
  counterReady = false;
  gameMessage = 'VS';
  players: Player[];
  playerOne: Player;
  playerTwo: Player;
  hands: Hand[];

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getPlayers();
    this.hands = ValidHands;
  }

  getPlayers(): void {
    this.playerService.getPlayers()
      .subscribe( players => {
        this.players = players;
        this.initPlayers();
      });
  }

  runSimulations() {
    let x = 0;
    const intervalId = setInterval(() => {
      this.playerOne.makeMove(this.playerTwo);
      this.playerTwo.makeMove(this.playerOne);
      this.runGame();
      if (++x === this.numberOfSimulations) {
        clearInterval(intervalId);
      }
    }, 200);
  }

  clickHand(n: number) {
    this.gameReady = false;
    this.counterReady = true;

    if (this.playerOne.human) {
      this.playerOne.setHand(this.getHand(n));
      this.playerTwo.makeMove(this.playerOne);
    } else if (this.playerTwo.human) {
      this.playerTwo.setHand(this.getHand(n));
      this.playerOne.makeMove(this.playerTwo);
    }

    // Timer
    let x = 0;
    this.gameMessage = `${this.gameCountDown}`;
    const intervalId = setInterval(() => {
      x++;
      this.gameMessage = `${this.gameCountDown - x}`;
      // this.gameMessage
      if (x === this.gameCountDown) {
        this.gameMessage = 'VS';
        clearInterval(intervalId);
        this.runGame();
      }
    }, 500);
  }

  runGame() {
    let gameResult = '';
    if (this.playerOne.currentHand === this.playerTwo.currentHand) {
      this.lastGameResult = `DRAW`;
    } else if (this.playerOne.currentHand.beats(this.playerTwo.currentHand)) {
      gameResult = this.gameResultMsg(this.playerOne, this.playerTwo);
      this.lastGameResult = `Player One WINS: ${gameResult}`;
      this.playerService.updateScore(this.playerOne, 1);
    } else {
      gameResult = this.gameResultMsg(this.playerTwo, this.playerOne);
      this.lastGameResult = `Player Two WINS: ${gameResult}`;
      this.playerService.updateScore(this.playerTwo, 1);
    }
    this.gameReady = true;
  }

  playersChange() {
    this.gameReady = false;
    this.counterReady = false;
    this.lastGameResult = 'Ready to play?';
    this.computerVsComputer = (!this.playerOne.human && !this.playerTwo.human);
    if (this.playerOne.human) {
      this.handsMsg = 'PLAYER ONE CHOOSE YOUR WEAPON!';
    } else if (this.playerTwo.human) {
      this.handsMsg = 'PLAYER TWO CHOOSE YOUR WEAPON!';
    }
  }

  isInUse(player: Player) {
    return(this.playerOne === player || this.playerTwo === player);
  }

  private initPlayers() {
    this.playerOne = this.players[0];
    this.playerTwo = this.players[1];
  }

  private gameResultMsg(winner: Player, looser: Player): string {
    return winner.currentHand.beatString(looser.currentHand);
  }

  private getHand(n: number): Hand {
    return ValidHands.filter(x => x.id === n)[0];
  }
}
