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

  clickHand(n: number) {
    if (this.playerOne.human) {
      this.playerOne.setHand(this.getHand(n));
      this.playerTwo.makeMove(this.playerOne);
    } else if (this.playerTwo.human) {
      this.playerTwo.setHand(this.getHand(n));
      this.playerOne.makeMove(this.playerTwo);
    }

    this.runGame();
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
  }

  playersChange() {
    this.computerVsComputer = (!this.playerOne.human && !this.playerTwo.human);
    if (this.playerOne.human) {
      this.handsMsg = 'PLAYER ONE CHOOSE YOUR WEAPON!';
    } else if (this.playerTwo.human) {
      this.handsMsg = 'PLAYER TWO CHOOSE YOUR WEAPON!';
    }
  }

  gameReady(): boolean {
    return(this.playerOne.ready() && this.playerTwo.ready());
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
